"use client";

import { CATEGORY_LABELS, COUNTRIES } from "@/lib/experiences";
import { CATEGORIES } from "@/types/experience";

interface FilterBarProps {
  /** Categoría en minúsculas, o "" para todas */
  category: string;
  /** País, o "" para todos */
  destination: string;
  onCategoryChange: (category: string) => void;
  onDestinationChange: (destination: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const chipBase =
  "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors";
const chipActive = "border-primary bg-primary text-white";
const chipIdle = "border-line bg-white text-foreground/80 hover:border-primary/40";

export default function FilterBar({
  category,
  destination,
  onCategoryChange,
  onDestinationChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  const selectedCategory = category.toLowerCase();
  // Acepta "croatia" o "Croatia" en la URL
  const selectedCountry =
    COUNTRIES.find((country) => country.toLowerCase() === destination.toLowerCase()) ?? "";

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <fieldset className="min-w-0">
        <legend className="sr-only">Categoría</legend>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          <button
            type="button"
            aria-pressed={selectedCategory === ""}
            onClick={() => onCategoryChange("")}
            className={`${chipBase} ${selectedCategory === "" ? chipActive : chipIdle}`}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => {
            const value = cat.toLowerCase();
            const active = selectedCategory === value;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(active ? "" : value)}
                className={`${chipBase} ${active ? chipActive : chipIdle}`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <label htmlFor="destination-filter" className="sr-only">
          Destino
        </label>
        <select
          id="destination-filter"
          value={selectedCountry}
          onChange={(event) => onDestinationChange(event.target.value)}
          className="h-10 flex-1 rounded-full border border-line bg-white px-4 text-sm shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-56 lg:flex-none"
        >
          <option value="">Todos los destinos</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="whitespace-nowrap text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
