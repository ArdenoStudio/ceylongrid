use anyhow::Result;
use sqlx::{PgPool, postgres::PgPoolOptions};
use crate::models::NewSignal;

pub async fn connect(url: &str) -> Result<PgPool> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(url)
        .await?;
    Ok(pool)
}

pub async fn insert_signal(pool: &PgPool, s: &NewSignal) -> Result<()> {
    sqlx::query!(
        r#"
        INSERT INTO signals
          (source, category, district, headline, summary, url, magnitude, metadata)
        VALUES
          ($1::signal_source, $2::signal_category, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (source, url) DO NOTHING
        "#,
        s.source as _,
        s.category as _,
        s.district,
        s.headline,
        s.summary,
        s.url,
        s.magnitude,
        s.metadata,
    )
    .execute(pool)
    .await?;
    Ok(())
}
