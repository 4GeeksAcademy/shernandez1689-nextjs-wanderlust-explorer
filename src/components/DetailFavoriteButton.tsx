"use client";

import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

interface DetailFavoriteButtonProps {
  id: string;
  title: string;
}

export default function DetailFavoriteButton({ id, title }: DetailFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-white/80 sm:inline">
        {favorite ? "En favoritos" : "Guardar"}
      </span>
      <FavoriteButton isFavorite={favorite} onToggle={() => toggleFavorite(id)} title={title} />
    </div>
  );
}
