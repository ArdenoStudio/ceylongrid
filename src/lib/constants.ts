import type { District, SignalCategory, SignalSource } from "@/types";

export const DISTRICTS: District[] = [
  "colombo", "gampaha", "kalutara",
  "kandy", "matale", "nuwara_eliya",
  "galle", "matara", "hambantota",
  "jaffna", "kilinochchi", "mannar", "mullaitivu", "vavuniya",
  "batticaloa", "ampara", "trincomalee",
  "kurunegala", "puttalam",
  "anuradhapura", "polonnaruwa",
  "badulla", "monaragala",
  "ratnapura", "kegalle",
];

export const PROVINCES: Record<string, District[]> = {
  Western:       ["colombo", "gampaha", "kalutara"],
  Central:       ["kandy", "matale", "nuwara_eliya"],
  Southern:      ["galle", "matara", "hambantota"],
  Northern:      ["jaffna", "kilinochchi", "mannar", "mullaitivu", "vavuniya"],
  Eastern:       ["batticaloa", "ampara", "trincomalee"],
  "North Western": ["kurunegala", "puttalam"],
  "North Central": ["anuradhapura", "polonnaruwa"],
  Uva:           ["badulla", "monaragala"],
  Sabaragamuwa:  ["ratnapura", "kegalle"],
};

export const SOURCE_LABELS: Record<SignalSource, string> = {
  ada_derana: "Ada Derana",
  usgs:       "USGS",
  fx_rate:    "FX Rate",
};

export const CATEGORY_LABELS: Record<SignalCategory, string> = {
  news:       "News",
  earthquake: "Earthquake",
  weather:    "Weather",
  finance:    "Finance",
  politics:   "Politics",
  crime:      "Crime",
  sport:      "Sport",
};

export const CATEGORY_COLORS: Record<SignalCategory, string> = {
  news:       "#3b82f6",
  earthquake: "#ef4444",
  weather:    "#8b5cf6",
  finance:    "#f59e0b",
  politics:   "#ec4899",
  crime:      "#f97316",
  sport:      "#10b981",
};
