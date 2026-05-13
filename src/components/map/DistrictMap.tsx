"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import type { StyleFunction } from "leaflet";
import type { District } from "@/types";
import { CATEGORY_COLORS } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

interface DistrictMapProps {
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

  const styleDistrict: StyleFunction = (feature) => {
    const raw = feature?.properties?.NAME_2 as string | undefined;
    const slug = raw?.toLowerCase().replace(/\s+/g, "_") as District | undefined;
    const categoryColor = slug ? activeDistricts[slug] : undefined;

    return {
      fillColor: categoryColor ?? "#1a2235",
      fillOpacity: categoryColor ? 0.65 : 0.5,
      color: "#1e2d45",
      weight: 1,
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
      attributionControl={true}
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
          style={styleDistrict}
        />
      )}
    </MapContainer>
  );
}
