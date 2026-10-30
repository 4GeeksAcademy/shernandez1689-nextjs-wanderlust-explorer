"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ExperienceFilters } from "@/types/experience";

const FILTER_KEYS = ["search", "category", "destination"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

/**
 * Lee los filtros activos desde los query params de la URL y expone
 * funciones para actualizarlos sin recargar la página.
 */
export function useFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters: ExperienceFilters = useMemo(
    () => ({
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      destination: searchParams.get("destination") ?? "",
    }),
    [searchParams],
  );

  const setFilter = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setSearch = useCallback((value: string) => setFilter("search", value), [setFilter]);
  const setCategory = useCallback((value: string) => setFilter("category", value), [setFilter]);
  const setDestination = useCallback(
    (value: string) => setFilter("destination", value),
    [setFilter],
  );

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const hasActiveFilters = FILTER_KEYS.some((key) => filters[key] !== "");

  return {
    filters,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
    hasActiveFilters,
  };
}
