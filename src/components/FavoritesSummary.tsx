"use client";

import Link from "next/link";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import { CATEGORY_LABELS, formatPrice, getCountry } from "@/lib/experiences";
import { CATEGORIES } from "@/types/experience";

export default function FavoritesSummary() {
  const { favoriteIds } = useFavorites();
  const favorites = experiences.filter((experience) => favoriteIds.includes(experience.id));
  const countries = new Set(favorites.map((experience) => getCountry(experience.destination)));
  const totalPrice = favorites.reduce((sum, experience) => sum + experience.price, 0);

  const stats = [
    { label: "Favoritos guardados", value: favorites.length },
    { label: "Países", value: countries.size },
    { label: "Presupuesto estimado", value: formatPrice(totalPrice) },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold">Resumen de viaje</h2>
        <Link
          href="/favorites"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Ver favoritos →
        </Link>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-2xl bg-sand/60 p-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-display text-3xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      {favorites.length > 0 && (
        <ul className="flex flex-wrap gap-2 text-sm">
          {CATEGORIES.map((category) => {
            const count = favorites.filter((e) => e.category === category).length;
            return count > 0 ? (
              <li key={category} className="rounded-full border border-line px-3 py-1">
                {CATEGORY_LABELS[category]}: <span className="font-semibold">{count}</span>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </section>
  );
}
