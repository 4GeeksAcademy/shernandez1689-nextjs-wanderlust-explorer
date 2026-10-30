"use client";

import EmptyState from "@/components/EmptyState";
import ExperienceGrid from "@/components/ExperienceGrid";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import { useExperiences } from "@/hooks/useExperiences";
import { useFavorites } from "@/hooks/useFavorites";
import { useFilters } from "@/hooks/useFilters";

export default function ExperienceExplorer() {
  const { filters, setSearch, setCategory, setDestination, clearFilters, hasActiveFilters } =
    useFilters();
  const results = useExperiences(filters);
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <SearchBar value={filters.search} onChange={setSearch} />
        <FilterBar
          category={filters.category}
          destination={filters.destination}
          onCategoryChange={setCategory}
          onDestinationChange={setDestination}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        {results.length === 1 ? "1 experiencia" : `${results.length} experiencias`}
      </p>

      {results.length > 0 ? (
        <ExperienceGrid
          experiences={results}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyState
          title="No se encontraron resultados"
          description="Prueba con otro término de búsqueda o quita alguno de los filtros activos."
          action={
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Ver todas las experiencias
            </button>
          }
        />
      )}
    </div>
  );
}

export function ExperienceExplorerFallback() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="h-12 rounded-full bg-sand" />
      <div className="h-10 w-2/3 rounded-full bg-sand" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-sand" />
        ))}
      </div>
    </div>
  );
}
