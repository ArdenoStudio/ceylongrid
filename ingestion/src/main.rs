use anyhow::Result;
use tokio_cron_scheduler::{Job, JobScheduler};
use tracing::info;

mod db;
mod models;
mod sources;

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv().ok();
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in .env");

    let pool = db::connect(&database_url).await?;
    info!("CeylonGrid ingestion service starting");

    let sched = JobScheduler::new().await?;

    // Ada Derana RSS — every 2 minutes
    let p = pool.clone();
    sched.add(Job::new_async("0 */2 * * * *", move |_, _| {
        let p = p.clone();
        Box::pin(async move { sources::ada_derana::poll(&p).await; })
    })?).await?;

    // USGS earthquakes — every 5 minutes
    let p = pool.clone();
    sched.add(Job::new_async("0 */5 * * * *", move |_, _| {
        let p = p.clone();
        Box::pin(async move { sources::usgs::poll(&p).await; })
    })?).await?;

    // LKR/USD exchange rate — every 30 minutes
    let p = pool.clone();
    sched.add(Job::new_async("0 */30 * * * *", move |_, _| {
        let p = p.clone();
        Box::pin(async move { sources::fx_rate::poll(&p).await; })
    })?).await?;

    sched.start().await?;
    info!("Scheduler running — press Ctrl+C to stop");

    tokio::signal::ctrl_c().await?;
    info!("Shutting down");
    Ok(())
}
