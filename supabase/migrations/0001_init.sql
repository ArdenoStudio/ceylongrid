-- CeylonGrid — initial schema

CREATE TYPE signal_source AS ENUM (
  'ada_derana',
  'usgs',
  'fx_rate'
);

CREATE TYPE signal_category AS ENUM (
  'news',
  'earthquake',
  'weather',
  'finance',
  'politics',
  'crime',
  'sport'
);

CREATE TABLE signals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  source      signal_source NOT NULL,
  category    signal_category NOT NULL,
  district    TEXT,
  headline    TEXT NOT NULL,
  summary     TEXT,
  url         TEXT,
  magnitude   NUMERIC(4, 2),
  metadata    JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- prevent duplicate inserts for same source + url
  UNIQUE NULLS NOT DISTINCT (source, url)
);

CREATE INDEX signals_created_at_idx ON signals (created_at DESC);
CREATE INDEX signals_source_idx     ON signals (source);
CREATE INDEX signals_category_idx   ON signals (category);
CREATE INDEX signals_district_idx   ON signals (district);

-- Row-level security
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read"
  ON signals FOR SELECT USING (true);

CREATE POLICY "service write"
  ON signals FOR INSERT TO service_role WITH CHECK (true);

-- Seed rows so The Wire renders before ingestion runs
INSERT INTO signals (source, category, headline, summary, metadata) VALUES
  ('ada_derana', 'news',       'CeylonGrid is live — monitoring Sri Lanka in real time', 'National intelligence dashboard operational.', '{"seed":true}'),
  ('usgs',       'earthquake', 'Seismic monitoring active — South Asia / Indian Ocean region', 'USGS M2.5+ feed connected. No significant events at launch.', '{"seed":true}'),
  ('fx_rate',    'finance',    'LKR/USD exchange rate monitoring initialised', 'Live rates sourced from open.er-api.com every 30 minutes.', '{"seed":true}');
