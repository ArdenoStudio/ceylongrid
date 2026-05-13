# CeylonGrid

Sri Lanka's national intelligence dashboard. Real-time map, news wire, and economic pulse — all in one platform.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS v4 |
| Map | Leaflet + CARTO Dark Matter tiles |
| Database | Supabase (PostgreSQL + Realtime) |
| Ingestion | Rust (tokio, sqlx, tokio-cron-scheduler) |

## Structure

```
├── src/                  # Next.js app
│   ├── app/              # Routes: /grid /wire /pulse
│   ├── components/       # Map, Wire, Pulse, Layout
│   ├── lib/              # Supabase clients, constants
│   └── types/            # Shared TypeScript types
├── ingestion/            # Rust data ingestion service
│   └── src/sources/      # Ada Derana, USGS, FX rate
├── supabase/migrations/  # Database schema
└── public/geojson/       # Sri Lanka district GeoJSON
```

## Views

- **The Grid** — Sri Lanka map with district-level signal overlay
- **The Wire** — Chronological live feed of all signals with filters
- **The Pulse** — Aggregated dashboards (Phase 1)

## Data Sources (Phase 0)

| Source | Category | Interval |
|---|---|---|
| Ada Derana RSS | News | 2 min |
| USGS M2.5+ feed | Earthquake | 5 min |
| open.er-api.com | LKR/USD rate | 30 min |

## Getting Started

### Frontend

```bash
npm install
cp .env.example .env.local  # fill in Supabase keys
npm run dev
```

### Supabase

Apply the migration in `supabase/migrations/0001_init.sql` to your Supabase project.

### Ingestion (requires Rust)

```bash
cd ingestion
cp .env.example .env  # fill in DATABASE_URL
cargo run
```

## Roadmap

- **Phase 1** — CSE markets, CEB load shedding, grocery prices, fuel prices
- **Phase 2** — DMC disaster alerts, Epidemiology Unit dengue data, meteorology
- **Phase 3** — BIA flight tracker, Colombo Port AIS feed
- **Phase 4** — AI summarisation, daily brief, district drill-downs
- **Phase 5** — PWA, public beta launch
