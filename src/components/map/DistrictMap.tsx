"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import type { StyleFunction } from "leaflet";
import type { District } from "@/types";
import "leaflet/dist/leaflet.css";

// GADM NAME_1 -> our District slug (only non-obvious ones need mapping)
const GADM_TO_DISTRICT: Record<string, District> = {
  nuwaraeliya: "nuwara_eliya",
};

function gadmToSlug(name1: string): District {
  const key = name1.toLowerCase().replace(/\s+/g, "");
  return (GADM_TO_DISTRICT[key] ?? key) as District;
}

interface DistrictMapProps {
  // district slug -> hex color for that district
  activeDistricts?: Partial<Record<District, string>>;
}

export default function DistrictMap({ activeDistricts = {} }: DistrictMapProps) {
  const [geodata, setGeodata] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    fetch("/geojson/sri-lanka-districts.json")
      .then((r) => r.json())
      .then(setGeodata)
      .catch(console.error);
  }, []);

  const styleFeature: StyleFunction = (feature) => {
    const name1 = feature?.properties?.NAME_1 as string | undefined;
    const slug = name1 ? gadmToSlug(name1) : undefined;
    const color = slug ? activeDistricts[slug] : undefined;

    return {
      fillColor: color ?? "#1a2235",
      fillOpacity: color ? 0.65 : 0.45,
      color: "#1e2d45",
      weight: 0.5,
      stroke: true,
    };
  };

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      minZoom={7}
      maxZoom={13}
      className="size-full"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      {geodata && (
        <GeoJSON
          key={JSON.stringify(activeDistricts)}
          data={geodata}
          style={styleFeature}
        />
      )}
    </MapContainer>
  );
}
