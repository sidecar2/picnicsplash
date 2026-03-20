"use client";

import { useMemo, useState, Suspense } from "react";
import { DEFAULT_STATE } from "@/data/controllers";
import { MOCK_RESTAURANTS } from "@/data/restaurants";
import { computeZoneMetrics, computeEconomicsMetrics } from "@/lib/metrics";
import type { ControllerState } from "@/types";
import ControlPanel from "@/components/ControlPanel";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center bg-slate-200 text-slate-600">
      Loading map…
    </div>
  ),
});

function HomeContent() {
  const [state, setState] = useState<ControllerState>(DEFAULT_STATE);
  const zone = useMemo(() => computeZoneMetrics(state), [state]);
  const economics = useMemo(() => computeEconomicsMetrics(state), [state]);
  const handleUpdate = (key: keyof ControllerState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <header className="shrink-0 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Picnic Route Sandbox</h1>
        <p className="text-sm text-slate-600">
          Courier throughput + unit economics simulator (prototype)
        </p>
      </header>
      <div className="flex flex-1 min-h-0">
        <section className="w-[70%] shrink-0 overflow-hidden">
          <MapView restaurants={MOCK_RESTAURANTS} demandDensity={zone.demandDensity} />
        </section>
        <aside className="w-[30%] shrink-0 border-l border-slate-200">
          <ControlPanel
            state={state}
            zone={zone}
            economics={economics}
            onUpdate={handleUpdate}
          />
        </aside>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <Suspense
        fallback={
          <div className="flex flex-1 items-center justify-center p-8">
            <p className="text-slate-600">Loading…</p>
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}
