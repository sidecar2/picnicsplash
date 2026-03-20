"use client";

import type { Restaurant } from "@/types";

const COLORS = { partner: "#3b82f6", selection: "#ef4444" };

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const typeLabel = restaurant.type === "partner" ? "Paid Partner" : restaurant.type === "selection" ? "Unpaid partner" : restaurant.type;
  const color = restaurant.type === "partner" ? COLORS.partner : COLORS.selection;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="font-semibold text-slate-900 text-sm">{restaurant.name}</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
        <span className="text-xs text-slate-600">{typeLabel}</span>
      </div>
      <dl className="mt-2 space-y-0.5 text-xs text-slate-500">
        <div className="flex justify-between gap-2">
          <dt>Prep mean</dt>
          <dd className="font-mono">{restaurant.basePrepMeanMinutes.toFixed(1)} min</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Prep std</dt>
          <dd className="font-mono">{restaurant.basePrepStdMinutes.toFixed(1)} min</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Commission</dt>
          <dd className="font-mono">{restaurant.commission}%</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt>Capacity limits</dt>
          <dd className="font-mono">{restaurant.capacityLimits}/hr</dd>
        </div>
      </dl>
    </div>
  );
}
