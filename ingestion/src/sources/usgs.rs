use crate::db::insert_signal;
use crate::models::{NewSignal, SignalCategory, SignalSource};
use sqlx::PgPool;
use tracing::{info, warn};

// M2.5+ in past day, bounding box covers South Asia + Indian Ocean
const FEED_URL: &str =
    "https://earthquake.usgs.gov/fdsnws/event/1/query\
    ?format=geojson&minmagnitude=2.5\
    &minlatitude=5&maxlatitude=40&minlongitude=60&maxlongitude=100\
    &orderby=time&limit=50";

pub async fn poll(pool: &PgPool) {
    match fetch().await {
        Ok(signals) => {
            info!("usgs: {} events", signals.len());
            for s in signals {
                if let Err(e) = insert_signal(pool, &s).await {
                    warn!("usgs insert: {e}");
                }
            }
        }
        Err(e) => warn!("usgs fetch: {e}"),
    }
}

async fn fetch() -> anyhow::Result<Vec<NewSignal>> {
    let json: serde_json::Value = reqwest::get(FEED_URL).await?.json().await?;
    let mut signals = Vec::new();

    if let Some(features) = json["features"].as_array() {
        for f in features {
            let props = &f["properties"];
            let mag   = props["mag"].as_f64().unwrap_or(0.0);
            let place = props["place"].as_str().unwrap_or("Unknown location");
            let url   = props["url"].as_str().map(String::from);

            signals.push(NewSignal {
                source:    SignalSource::Usgs,
                category:  SignalCategory::Earthquake,
                district:  None,
                headline:  format!("M{mag:.1} earthquake — {place}"),
                summary:   None,
                url,
                magnitude: Some(mag),
                metadata:  serde_json::json!({
                    "coords": f["geometry"]["coordinates"],
                }),
            });
        }
    }

    Ok(signals)
}
