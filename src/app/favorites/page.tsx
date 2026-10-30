"use client";

import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import ExperienceGrid from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favorites = experiences.filter((experience) => favoriteIds.includes(experience.id));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Tus favoritos
        </h1>
        <p className="text-muted">
          {favorites.length === 0
            ? "Todavía no has guardado ninguna experiencia."
            : `Has guardado ${favorites.length} ${favorites.length === 1 ? "experiencia" : "experiencias"}.`}
        </p>
      </header>

      {favorites.length > 0 ? (
        <ExperienceGrid
          experiences={favorites}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyState
          title="Tu lista está vacía"
          description="Pulsa el corazón de cualquier experiencia para guardarla aquí."
          action={
            <Link
              href="/experiences"
              className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Explorar experiencias
            </Link>
          }
        />
      )}
    </div>
  );
}
