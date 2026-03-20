"use client";

import { useEffect, useRef, useState } from "react";
import type { Restaurant } from "@/types";
import type mapboxgl from "mapbox-gl";
import { HUBS } from "@/data/hubs";
import { RESTAURANT_GROUPS } from "@/data/restaurantGroups";

const CENTER: [number, number] = [-118.281, 34.0606];
const ZOOM = 12;
const COLORS = { internal: "#22c55e", partner: "#3b82f6", selection: "#ef4444" };

const CLUSTER_PRECISION = 3;

function getGroupLineFeatures(restaurants: Restaurant[]): { type: "Feature"; geometry: { type: "LineString"; coordinates: [number, number][] }; properties: { groupId: string } }[] {
  const byGroup = new Map<string, { lng: number; lat: number }[]>();
  for (const r of restaurants) {
    if (r.groupId && (r.type === "partner" || r.type === "selection")) {
      const list = byGroup.get(r.groupId) ?? [];
      list.push({ lng: r.lng, lat: r.lat });
      byGroup.set(r.groupId, list);
    }
  }
  const features: { type: "Feature"; geometry: { type: "LineString"; coordinates: [number, number][] }; properties: { groupId: string } }[] = [];
  for (const [groupId, points] of byGroup) {
    if (points.length < 2) continue;
    const centerLng = points.reduce((s, p) => s + p.lng, 0) / points.length;
    const centerLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
    points.sort((a, b) => Math.atan2(a.lat - centerLat, a.lng - centerLng) - Math.atan2(b.lat - centerLat, b.lng - centerLng));
    const coordinates = points.map((p) => [p.lng, p.lat] as [number, number]);
    coordinates.push(coordinates[0]);
    features.push({
      type: "Feature",
      properties: { groupId },
      geometry: { type: "LineString", coordinates },
    });
  }
  return features;
}

function getInternalClusters(restaurants: Restaurant[]): { lng: number; lat: number; count: number }[] {
  const internals = restaurants.filter((r) => r.type === "internal");
  const groups = new Map<string, { sumLng: number; sumLat: number; count: number }>();
  for (const r of internals) {
    const key = `${r.lat.toFixed(CLUSTER_PRECISION)}_${r.lng.toFixed(CLUSTER_PRECISION)}`;
    const existing = groups.get(key);
    if (existing) {
      existing.sumLng += r.lng;
      existing.sumLat += r.lat;
      existing.count += 1;
    } else {
      groups.set(key, { sumLng: r.lng, sumLat: r.lat, count: 1 });
    }
  }
  return Array.from(groups.values()).map((g) => ({
    lng: g.sumLng / g.count,
    lat: g.sumLat / g.count,
    count: g.count,
  }));
}

export default function MapView({
  restaurants,
  demandDensity,
  selectedGroupId,
}: {
  restaurants: Restaurant[];
  demandDensity: number;
  selectedGroupId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token || token.startsWith("your_") || token === "pk.dummy") {
      setError("Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.local with a valid Mapbox token.");
      return;
    }
    let cleanup: (() => void) | undefined;
    const container = containerRef.current!;
    import("mapbox-gl").then((mapboxgl) => {
      mapboxgl.default.accessToken = token;
      const map = new mapboxgl.default.Map({
        container,
        style: "mapbox://styles/mapbox/light-v11",
        center: CENTER,
        zoom: ZOOM,
      });
      mapRef.current = map;
      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");
      map.on("load", () => {
        setConnected(true);
        map.resize();
        const internalClusters = getInternalClusters(restaurants);
        const partnerAndSelection = restaurants.filter((r) => r.type !== "internal");
        map.addSource("internalClusters", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: internalClusters.map((c) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [c.lng, c.lat] },
              properties: { count: c.count },
            })),
          },
        });
        map.addLayer({
          id: "internal-circles",
          type: "circle",
          source: "internalClusters",
          paint: {
            "circle-radius": 22,
            "circle-color": COLORS.internal,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });
        map.addLayer({
          id: "internal-labels",
          type: "symbol",
          source: "internalClusters",
          layout: {
            "text-field": ["get", "count"],
            "text-size": 14,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          },
          paint: {
            "text-color": "#ffffff",
          },
        });
        map.addSource("restaurants", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: partnerAndSelection.map((r) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [r.lng, r.lat] },
              properties: {
                type: r.type,
                groupId: r.groupId ?? "",
                name: r.name,
                id: r.id,
                basePrepMeanMinutes: r.basePrepMeanMinutes,
                basePrepStdMinutes: r.basePrepStdMinutes,
                commission: r.commission,
                capacityLimits: r.capacityLimits,
              },
            })),
          },
        });
        const groupLineFeatures = getGroupLineFeatures(restaurants);
        if (groupLineFeatures.length > 0) {
          map.addSource("groupLines", {
            type: "geojson",
            data: { type: "FeatureCollection", features: groupLineFeatures },
          });
          map.addLayer({
            id: "group-lines",
            type: "line",
            source: "groupLines",
            paint: {
              "line-color": "#475569",
              "line-width": 2,
            },
          });
        }
        map.addLayer({
          id: "points",
          type: "circle",
          source: "restaurants",
          paint: {
            "circle-radius": 8,
            "circle-color": ["match", ["get", "type"], "partner", COLORS.partner, "selection", COLORS.selection, "#94a3b8"],
          },
        });
        const popup = new mapboxgl.default.Popup({ closeButton: true, closeOnClick: false, className: "restaurant-popup" });
        let pinnedFeature: { lng: number; lat: number; props: Record<string, unknown> } | null = null;
        function getCardHtml(props: Record<string, unknown>): string {
          const name = (props.name as string) ?? "Restaurant";
          const type = (props.type as string) ?? "";
          const meanVal = props.basePrepMeanMinutes != null ? Number(props.basePrepMeanMinutes) : NaN;
          const stdVal = props.basePrepStdMinutes != null ? Number(props.basePrepStdMinutes) : NaN;
          const mean = Number.isFinite(meanVal) ? meanVal.toFixed(1) : "—";
          const std = Number.isFinite(stdVal) ? stdVal.toFixed(1) : "—";
          const commissionVal = props.commission != null ? Number(props.commission) : NaN;
          const commission = Number.isFinite(commissionVal) ? `${commissionVal}%` : "—";
          const capacityVal = props.capacityLimits != null ? Number(props.capacityLimits) : NaN;
          const capacity = Number.isFinite(capacityVal) ? `${capacityVal}/hr` : "—";
          const typeLabel = type === "partner" ? "Paid Partner" : type === "selection" ? "Unpaid partner" : type;
          const typeColor = type === "partner" ? COLORS.partner : type === "selection" ? COLORS.selection : "#94a3b8";
          return `
            <div style="min-width:180px;padding:12px;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);font-family:system-ui,sans-serif;">
              <div style="font-weight:600;color:#0f172a;font-size:14px;">${escapeHtml(name)}</div>
              <div style="margin-top:6px;display:flex;align-items:center;gap:8px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${typeColor}"></span>
                <span style="font-size:12px;color:#64748b">${escapeHtml(typeLabel)}</span>
              </div>
              <dl style="margin-top:8px;font-size:12px;color:#64748b;">
                <div style="display:flex;justify-content:space-between;gap:12px;"><dt>Prep mean</dt><dd style="font-variant-numeric:tabular-nums">${mean} min</dd></div>
                <div style="display:flex;justify-content:space-between;gap:12px;"><dt>Prep std</dt><dd style="font-variant-numeric:tabular-nums">${std} min</dd></div>
                <div style="display:flex;justify-content:space-between;gap:12px;"><dt>Commission</dt><dd style="font-variant-numeric:tabular-nums">${commission}</dd></div>
                <div style="display:flex;justify-content:space-between;gap:12px;"><dt>Capacity limits</dt><dd style="font-variant-numeric:tabular-nums">${capacity}</dd></div>
              </dl>
            </div>
          `;
        }
        function escapeHtml(s: string): string {
          const div = document.createElement("div");
          div.textContent = s;
          return div.innerHTML;
        }
        map.on("mouseenter", "points", (e) => {
          map.getCanvas().style.cursor = "pointer";
          if (e.features?.[0]) {
            const f = e.features[0];
            const coords = (f.geometry as { type: string; coordinates: [number, number] }).coordinates.slice();
            const props = (f.properties ?? {}) as Record<string, unknown>;
            popup.setLngLat(coords).setHTML(getCardHtml(props)).addTo(map);
          }
        });
        map.on("mouseleave", "points", () => {
          map.getCanvas().style.cursor = "";
          if (!pinnedFeature) popup.remove();
        });
        let clickWasOnPoint = false;
        map.on("click", "points", (e) => {
          clickWasOnPoint = true;
          if (e.features?.[0]) {
            const f = e.features[0];
            const coords = (f.geometry as { type: string; coordinates: [number, number] }).coordinates.slice();
            const props = (f.properties ?? {}) as Record<string, unknown>;
            pinnedFeature = { lng: coords[0], lat: coords[1], props };
            popup.setLngLat(coords).setHTML(getCardHtml(props)).addTo(map);
          }
        });
        map.on("click", () => {
          if (clickWasOnPoint) {
            clickWasOnPoint = false;
            return;
          }
          clickWasOnPoint = false;
          if (pinnedFeature) {
            pinnedFeature = null;
            popup.remove();
          }
        });
        popup.on("close", () => { pinnedFeature = null; });
        map.addSource("hubs", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: HUBS.map((h) => ({
              type: "Feature",
              geometry: { type: "Point", coordinates: [h.lng, h.lat] },
              properties: { label: h.label },
            })),
          },
        });
        map.addLayer({
          id: "hub-circles",
          type: "circle",
          source: "hubs",
          paint: {
            "circle-radius": 18,
            "circle-color": "#1f2937",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });
        map.addLayer({
          id: "hub-labels",
          type: "symbol",
          source: "hubs",
          layout: {
            "text-field": ["get", "label"],
            "text-size": 13,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          },
          paint: {
            "text-color": "#ffffff",
          },
        });
        map.addSource("density", {
          type: "geojson",
          data: { type: "Feature", geometry: { type: "Point", coordinates: CENTER }, properties: {} },
        });
        map.addLayer({
          id: "density-fill",
          type: "circle",
          source: "density",
          paint: {
            "circle-radius": Math.min(120, 30 + demandDensity * 0.15),
            "circle-blur": 0.6,
            "circle-color": "#f59e0b",
            "circle-opacity": Math.min(0.25, 0.05 + demandDensity * 0.0005),
          },
        });
        requestAnimationFrame(() => map.resize());
        setTimeout(() => map.resize(), 100);
        setTimeout(() => map.resize(), 500);
      });
      const resize = () => mapRef.current?.resize();
      requestAnimationFrame(resize);
      setTimeout(resize, 100);
      window.addEventListener("resize", resize);
      cleanup = () => window.removeEventListener("resize", resize);
    }).catch((e) => {
      console.error("Mapbox load error:", e);
      setError("Mapbox failed to load. Check token and console.");
    });
    return () => {
      cleanup?.();
      mapRef.current?.remove();
      mapRef.current = null;
      setConnected(false);
    };
  }, []);

  useEffect(() => {
    if (error || !containerRef.current) return;
  }, [demandDensity, error]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer("points")) return;
    if (selectedGroupId) {
      const inGroup = restaurants.filter((r) => r.groupId === selectedGroupId && (r.type === "partner" || r.type === "selection"));
      if (inGroup.length > 0) {
        const lngs = inGroup.map((r) => r.lng);
        const lats = inGroup.map((r) => r.lat);
        const padding = 80;
        map.fitBounds(
          [
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ],
          { padding: { top: padding, bottom: padding, left: padding, right: padding }, maxZoom: 15, duration: 500 }
        );
      }
      map.setPaintProperty("points", "circle-radius", ["case", ["==", ["get", "groupId"], selectedGroupId], 14, 8]);
      map.setPaintProperty("points", "circle-opacity", ["case", ["==", ["get", "groupId"], selectedGroupId], 1, 0.35]);
      if (map.getLayer("group-lines")) {
        map.setFilter("group-lines", ["==", ["get", "groupId"], selectedGroupId]);
        map.setPaintProperty("group-lines", "line-width", 3);
        map.setPaintProperty("group-lines", "line-color", "#1e293b");
      }
    } else {
      map.setPaintProperty("points", "circle-radius", 8);
      map.setPaintProperty("points", "circle-opacity", 1);
      if (map.getLayer("group-lines")) {
        map.setFilter("group-lines", ["has", "groupId"]);
        map.setPaintProperty("group-lines", "line-width", 2);
        map.setPaintProperty("group-lines", "line-color", "#475569");
      }
    }
  }, [selectedGroupId, restaurants, connected]);

  return (
    <div className="relative h-full w-full min-h-[400px]" style={{ minHeight: "400px" }}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ width: "100%", height: "100%" }} />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-50 p-4 text-center text-sm text-amber-900">
          {error}
        </div>
      )}
      <div className="absolute top-4 left-4 flex flex-col gap-2 rounded-lg bg-white/95 px-3 py-2 shadow text-sm">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" /> Internal</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]" /> Paid Partner</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" /> Unpaid partner</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#1f2937]" /> Hubs</span>
        {connected && (
          <span className="pt-2 mt-2 border-t border-slate-200 text-slate-500">Mapbox ✓</span>
        )}
      </div>
    </div>
  );
}
