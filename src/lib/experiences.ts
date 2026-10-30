import { experiences } from "@/data/experiences";
import type {
  Category,
  Experience,
  ExperienceFilters,
} from "@/types/experience";

export const CATEGORY_LABELS: Record<Category, string> = {
  Adventure: "Aventura",
  Culture: "Cultura",
  Food: "Gastronomía",
  Wellness: "Bienestar",
  Nature: "Naturaleza",
};

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((experience) => experience.id === id);
}

/** "Split, Croatia" -> "Croatia" */
export function getCountry(destination: string): string {
  return destination.split(",").at(-1)?.trim() ?? destination;
}

export const COUNTRIES: string[] = [
  ...new Set(experiences.map((experience) => getCountry(experience.destination))),
].sort((a, b) => a.localeCompare(b));

/** Escapa los caracteres especiales para que "(" o "?" no rompan la regex. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function filterExperiences(
  list: Experience[],
  { search, category, destination }: ExperienceFilters,
): Experience[] {
  const term = search.trim();
  const titlePattern = term ? new RegExp(escapeRegExp(term), "i") : null;

  return list.filter((experience) => {
    if (titlePattern && !titlePattern.test(experience.title)) return false;
    if (category && experience.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (
      destination &&
      getCountry(experience.destination).toLowerCase() !== destination.toLowerCase()
    ) {
      return false;
    }
    return true;
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
