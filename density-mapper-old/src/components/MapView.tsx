"use client";

import { useEffect, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";
import type { Restaurant } from "@/types";

const MAP_CENTER: [number, number] = [-118.2437, 34.0522];
const MAP_ZOOM = 12.2;

const TYPE_COLORS: Record<string, string> = {
  internal: "#22c55e",
  partner: "#3b82f6",
  selection: "#ef4444",
};

interface MapViewProps {
  restaurants: Restaurant[];
  demandDensity: number;
}

export default function MapView({ restaurants, demandDensity }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      setMapError("Mapbox token missing. Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to .env.local");
      return;
    }
    setMapError(null);
    import("mapbox-gl").then((mapboxgl) => {
      mapboxgl.default.accessToken = accessToken;
      const map = new mapboxgl.default.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
      });
      mapRef.current = map;
      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      map.on("load", () => {
        const geojson = {
          type: "FeatureCollection" as const,
          features: restaurants.map((r) => ({
            type: "Feature" as const,
            geometry: { type: "Point" as const, coordinates: [r.lng, r.lat] },
            properties: { id: r.id, type: r.type },
          })),
        };
        map.addSource("restaurants", { type: "geojson", data: geojson });
        map.addLayer({
          id: "restaurant-points",
          type: "circle",
          source: "restaurants",
          paint: {
            "circle-radius": 8,
            "circle-color": [
              "match",
              ["get", "type"],
              "internal",
              TYPE_COLORS.internal,
              "partner",
              TYPE_COLORS.partner,
              "selection",
              TYPE_COLORS.selection,
              "#94a3b8",
            ],
          },
        });

        const densityRadius = Math.min(120, 30 + demandDensity * 0.15);
        const densityOpacity = Math.min(0.25, 0.05 + demandDensity * 0.0005);
        if (!map.getSource("density-center")) {
          map.addSource("density-center", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: { type: "Point", coordinates: MAP_CENTER },
              properties: {},
            },
          });
          map.addLayer({
            id: "density-fill",
            type: "circle",
            source: "density-center",
            paint: {
              "circle-radius": densityRadius,
              "circle-blur": 0.6,
              "circle-color": "#f59e0b",
              "circle-opacity": densityOpacity,
            },
          });
        } else {
          map.setPaintProperty("density-fill", "circle-radius", densityRadius);
          map.setPaintProperty("density-fill", "circle-opacity", densityOpacity);
        }
      });
    }).catch((err) => {
      console.error("Mapbox load error:", err);
      setMapError("Failed to load map. Check browser console for details.");
    });
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getSource("restaurants")) return;
    const geojson = {
      type: "FeatureCollection" as const,
      features: restaurants.map((r) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [r.lng, r.lat] },
        properties: { id: r.id, type: r.type },
      })),
    };
    (map.getSource("restaurants") as mapboxgl.GeoJSONSource)?.setData(geojson);
  }, [restaurants]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getLayer("density-fill")) return;
    const densityRadius = Math.min(120, 30 + demandDensity * 0.15);
    const densityOpacity = Math.min(0.25, 0.05 + demandDensity * 0.0005);
    map.setPaintProperty("density-fill", "circle-radius", densityRadius);
    map.setPaintProperty("density-fill", "circle-opacity", densityOpacity);
  }, [demandDensity]);

  return (
    <div className="relative h-full w-full min-h-[300px]">
      <div ref={containerRef} className="absolute inset-0" />
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50/95 p-4 text-center text-sm text-amber-900">
          <div>
            <p className="font-medium">Map unavailable</p>
            <p className="mt-1">{mapError}</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 flex gap-4 rounded-lg bg-white/95 px-3 py-2 shadow-md">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#22c55e]" /> Internal
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#3b82f6]" /> Partner
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" /> Selection
        </span>
      </div>
    </div>
  );
}
