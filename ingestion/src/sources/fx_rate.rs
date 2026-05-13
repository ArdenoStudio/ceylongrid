use crate::db::insert_signal;
use crate::models::{NewSignal, SignalCategory, SignalSource};
use sqlx::PgPool;
use tracing::{info, warn};

// Same free API Octane uses — no auth required
const API_URL: &str = "https://open.er-api.com/v6/latest/USD";

pub async fn poll(pool: &PgPool) {
    match fetch().await {
        Ok((rate, base)) => {
            info!("fx_rate: 1 {base} = {rate:.2} LKR");
            let signal = NewSignal {
                source:    SignalSource::FxRate,
                category:  SignalCategory::Finance,
                district:  None,
                headline:  format!("LKR/USD: 1 USD = {rate:.2} LKR"),
                summary:   None,
                url:       None,
                magnitude: None,
                metadata:  serde_json::json!({ "base": base, "lkr": rate }),
            };
            if let Err(e) = insert_signal(pool, &signal).await {
                warn!("fx_rate insert: {e}");
            }
        }
        Err(e) => warn!("fx_rate fetch: {e}"),
    }
}

async fn fetch() -> anyhow::Result<(f64, String)> {
    let json: serde_json::Value = reqwest::get(API_URL).await?.json().await?;
    let base = json["base_code"].as_str().unwrap_or("USD").to_string();
    let lkr  = json["rates"]["LKR"]
        .as_f64()
        .ok_or_else(|| anyhow::anyhow!("LKR rate missing"))?;
    Ok((lkr, base))
}
