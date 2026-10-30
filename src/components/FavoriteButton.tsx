"use client";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  /** Título de la experiencia, para el texto accesible */
  title: string;
  className?: string;
}

export default function FavoriteButton({
  isFavorite,
  onToggle,
  title,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Quitar "${title}" de favoritos` : `Añadir "${title}" a favoritos`}
      className={`grid size-10 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:scale-110 active:scale-95 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-5 transition-colors ${
          isFavorite ? "fill-coral stroke-coral" : "fill-transparent stroke-foreground"
        }`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.9 3.6 4.5 7 4.5c2 0 3.6 1.1 5 2.9 1.4-1.8 3-2.9 5-2.9 3.4 0 5.5 3.4 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" />
      </svg>
    </button>
  );
}
