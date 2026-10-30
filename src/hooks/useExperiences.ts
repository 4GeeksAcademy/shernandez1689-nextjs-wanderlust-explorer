"use client";

import { useMemo } from "react";
import { experiences } from "@/data/experiences";
import { filterExperiences } from "@/lib/experiences";
import type { Experience, ExperienceFilters } from "@/types/experience";

/** Devuelve las experiencias que cumplen la búsqueda y los filtros dados. */
export function useExperiences(filters: ExperienceFilters): Experience[] {
  const { search, category, destination } = filters;

  return useMemo(
    () => filterExperiences(experiences, { search, category, destination }),
    [search, category, destination],
  );
}
