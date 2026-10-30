export const CATEGORIES = [
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Experience {
  id: string;
  title: string;
  description: string;
  category: Category;
  /** Ciudad + país, p. ej. "Split, Croatia" */
  destination: string;
  /** Precio por persona en EUR */
  price: number;
  /** Valoración de 0 a 5 */
  rating: number;
  reviewCount: number;
  duration: string;
  imageUrl: string;
}

export interface ExperienceFilters {
  search: string;
  /** Categoría en minúsculas tal como aparece en la URL, o "" para todas */
  category: string;
  /** País de destino, o "" para todos */
  destination: string;
}
