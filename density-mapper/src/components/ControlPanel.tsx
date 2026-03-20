"use client";

import type { ControllerState, ZoneMetrics, EconomicsMetrics } from "@/types";
import { SLIDER_CONFIGS, getSliderGroups } from "@/data/controllers";

const configByKey = Object.fromEntries(SLIDER_CONFIGS.map((c) => [c.key, c]));

export default function ControlPanel({
  state,
  zone,
  economics,
  onUpdate,
}: {
  state: ControllerState;
  zone: ZoneMetrics;
  economics: EconomicsMetrics;
  onUpdate: (k: keyof ControllerState, v: number) => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-slate-50 p-4">
      <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-slate-800">Zone performance</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-slate-600">Orders/courier/hr</dt><dd className="font-mono">{zone.ordersPerCourierPerHour.toFixed(1)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Effective batch size</dt><dd className="font-mono">{zone.effectiveBatchSize.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Avg cycle time (min)</dt><dd className="font-mono">{zone.avgCycleTimeMinutes.toFixed(1)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Demand density</dt><dd className="font-mono">{zone.demandDensity.toFixed(0)}</dd></div>
        </dl>
      </div>
      <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
        <h3 className="mb-2 font-semibold text-slate-800">Economics</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between"><dt className="text-slate-600">Cost/order</dt><dd className="font-mono">${economics.costPerOrder.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Contribution/order</dt><dd className="font-mono">${economics.contributionPerOrder.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Refund cost/order</dt><dd className="font-mono">${economics.refundCostPerOrder.toFixed(2)}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-600">Net contribution/order</dt><dd className="font-mono">${economics.netContributionPerOrder.toFixed(2)}</dd></div>
        </dl>
      </div>
      <div className="space-y-6">
        {getSliderGroups().map(({ heading, keys }) => (
          <div key={heading}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">{heading}</h3>
            <div className="space-y-4">
              {keys.map((key) => {
                const config = configByKey[key];
                if (!config) return null;
                const value = state[config.key];
                const fmt = config.format ?? ((v: number) => String(v));
                return (
                  <label key={key} className="block">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium text-slate-800">{config.label}</span>
                      <span className="font-mono text-slate-600">{fmt(value)}</span>
                    </div>
                    <input
                      type="range"
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      value={value}
                      onChange={(e) => onUpdate(config.key, parseFloat(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <p className="mt-1 text-xs text-slate-500">{config.caption}</p>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
