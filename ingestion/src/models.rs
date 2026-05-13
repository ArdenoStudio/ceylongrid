use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, sqlx::Type)]
#[sqlx(type_name = "signal_source", rename_all = "snake_case")]
pub enum SignalSource {
    AdaDerana,
    Usgs,
    FxRate,
}

#[derive(Debug, Clone, sqlx::Type)]
#[sqlx(type_name = "signal_category", rename_all = "snake_case")]
pub enum SignalCategory {
    News,
    Earthquake,
    Weather,
    Finance,
    Politics,
    Crime,
    Sport,
}

#[derive(Debug, Clone)]
pub struct NewSignal {
    pub source: SignalSource,
    pub category: SignalCategory,
    pub district: Option<String>,
    pub headline: String,
    pub summary: Option<String>,
    pub url: Option<String>,
    pub magnitude: Option<f64>,
    pub metadata: serde_json::Value,
}
