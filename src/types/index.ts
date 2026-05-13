export type SignalSource = "ada_derana" | "usgs" | "fx_rate";

export type SignalCategory =
  | "news"
  | "earthquake"
  | "weather"
  | "finance"
  | "politics"
  | "crime"
  | "sport";

export type District =
  | "colombo" | "gampaha" | "kalutara"
  | "kandy" | "matale" | "nuwara_eliya"
  | "galle" | "matara" | "hambantota"
  | "jaffna" | "kilinochchi" | "mannar" | "mullaitivu" | "vavuniya"
  | "batticaloa" | "ampara" | "trincomalee"
  | "kurunegala" | "puttalam"
  | "anuradhapura" | "polonnaruwa"
  | "badulla" | "monaragala"
  | "ratnapura" | "kegalle";

export interface Signal {
  id: string;
  created_at: string;
  source: SignalSource;
  category: SignalCategory;
  district: District | null;
  headline: string;
  summary: string | null;
  url: string | null;
  magnitude: number | null;
  metadata: Record<string, unknown>;
}
