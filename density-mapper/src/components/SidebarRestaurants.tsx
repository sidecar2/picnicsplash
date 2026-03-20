"use client";

import type { Restaurant } from "@/types";
import { RESTAURANT_GROUPS } from "@/data/restaurantGroups";
import RestaurantCard from "./RestaurantCard";

export default function SidebarRestaurants({
  selectedGroupId,
  restaurants,
}: {
  selectedGroupId: string | null;
  restaurants: Restaurant[];
}) {
  const group = selectedGroupId ? RESTAURANT_GROUPS.find((g) => g.id === selectedGroupId) : null;
  const inGroup = selectedGroupId
    ? restaurants.filter((r) => (r.type === "partner" || r.type === "selection") && r.groupId === selectedGroupId)
    : [];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-slate-50 p-4">
      {!selectedGroupId ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          Select a day above to see restaurants in that group.
        </div>
      ) : (
        <>
          <h3 className="mb-2 font-semibold text-slate-800">
            {group?.name ?? selectedGroupId} — {inGroup.length} restaurants
          </h3>
          <div className="space-y-3">
            {inGroup.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
