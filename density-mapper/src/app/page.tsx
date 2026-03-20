"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { DEFAULT_STATE } from "@/data/controllers";
import { MOCK_RESTAURANTS } from "@/data/restaurants";
import { RESTAURANT_GROUPS } from "@/data/restaurantGroups";
import { computeZoneMetrics, computeEconomicsMetrics } from "@/lib/metrics";
import type { ControllerState } from "@/types";
import ControlPanel from "@/components/ControlPanel";
import SidebarRestaurants from "@/components/SidebarRestaurants";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center bg-slate-200 text-slate-600">
      Loading map…
    </div>
  ),
});

export default function Home() {
  const [state, setState] = useState<ControllerState>(DEFAULT_STATE);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [sidebarView, setSidebarView] = useState<"restaurants" | "routes">("routes");
  const zone = useMemo(() => computeZoneMetrics(state), [state]);
  const economics = useMemo(() => computeEconomicsMetrics(state), [state]);

  return (
    <div className="flex h-screen flex-col">
      <header className="shrink-0 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Picnic Hubs DTLA</h1>
        <p className="text-sm text-slate-600">Courier throughput + unit economics simulator (prototype)</p>
      </header>
      <div className="flex flex-1 min-h-0">
        <section className="w-[70%] shrink-0 overflow-hidden min-h-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-xs font-medium text-slate-500">Group by day:</span>
            <button
              type="button"
              onClick={() => setSelectedGroupId(null)}
              className={`rounded px-2.5 py-1 text-sm font-medium transition ${selectedGroupId === null ? "bg-slate-700 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"}`}
            >
              All
            </button>
            {RESTAURANT_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGroupId(g.id)}
                className={`rounded px-2.5 py-1 text-sm font-medium transition ${selectedGroupId === g.id ? "bg-slate-700 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"}`}
              >
                {g.name}
              </button>
            ))}
          </div>
          <div className="flex-1 min-h-0 relative">
            <MapView restaurants={MOCK_RESTAURANTS} demandDensity={zone.demandDensity} selectedGroupId={selectedGroupId} />
          </div>
        </section>
        <aside className="flex w-[30%] shrink-0 flex-col border-l border-slate-200 overflow-hidden">
          {selectedGroupId != null && (
            <div className="flex shrink-0 border-b border-slate-200 bg-white p-2">
              <div className="flex rounded-lg bg-slate-100 p-0.5">
                <button
                  type="button"
                  onClick={() => setSidebarView("restaurants")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${sidebarView === "restaurants" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                >
                  Restaurants
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarView("routes")}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${sidebarView === "routes" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                >
                  Routes
                </button>
              </div>
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-hidden">
            {selectedGroupId != null && sidebarView === "restaurants" ? (
              <SidebarRestaurants selectedGroupId={selectedGroupId} restaurants={MOCK_RESTAURANTS} />
            ) : (
              <ControlPanel state={state} zone={zone} economics={economics} onUpdate={(k, v) => setState((prev) => ({ ...prev, [k]: v }))} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
