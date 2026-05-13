use crate::db::insert_signal;
use crate::models::{NewSignal, SignalCategory, SignalSource};
use sqlx::PgPool;
use tracing::{info, warn};

const FEED_URL: &str = "https://www.adaderana.lk/rss.php";

pub async fn poll(pool: &PgPool) {
    match fetch().await {
        Ok(signals) => {
            info!("ada_derana: {} items", signals.len());
            for s in signals {
                if let Err(e) = insert_signal(pool, &s).await {
                    warn!("ada_derana insert: {e}");
                }
            }
        }
        Err(e) => warn!("ada_derana fetch: {e}"),
    }
}

async fn fetch() -> anyhow::Result<Vec<NewSignal>> {
    let xml = reqwest::get(FEED_URL).await?.text().await?;
    let mut signals = Vec::new();
    let mut reader = quick_xml::Reader::from_str(&xml);
    let mut in_item = false;
    let mut title = String::new();
    let mut link = String::new();
    let mut tag = String::new();

    loop {
        match reader.read_event() {
            Ok(quick_xml::events::Event::Start(e)) => {
                tag = String::from_utf8_lossy(e.name().as_ref()).into_owned();
                if tag == "item" {
                    in_item = true;
                }
            }
            Ok(quick_xml::events::Event::Text(e)) if in_item => {
                let text = e.unescape()?.into_owned();
                match tag.as_str() {
                    "title" => title = text,
                    "link"  => link  = text,
                    _ => {}
                }
            }
            Ok(quick_xml::events::Event::End(e)) => {
                if String::from_utf8_lossy(e.name().as_ref()) == "item" {
                    if !title.is_empty() {
                        signals.push(NewSignal {
                            source:    SignalSource::AdaDerana,
                            category:  SignalCategory::News,
                            district:  None,
                            headline:  std::mem::take(&mut title),
                            summary:   None,
                            url:       if link.is_empty() { None } else { Some(std::mem::take(&mut link)) },
                            magnitude: None,
                            metadata:  serde_json::json!({}),
                        });
                    }
                    in_item = false;
                }
            }
            Ok(quick_xml::events::Event::Eof) => break,
            Err(e) => { warn!("ada_derana XML: {e}"); break; }
            _ => {}
        }
    }

    Ok(signals)
}
