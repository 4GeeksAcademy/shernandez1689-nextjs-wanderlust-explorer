import ExperienceCard from "@/components/ExperienceCard";
import type { Experience } from "@/types/experience";

interface ExperienceGridProps {
  experiences: Experience[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ExperienceGrid({
  experiences,
  favoriteIds,
  onToggleFavorite,
}: ExperienceGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {experiences.map((experience) => (
        <li key={experience.id} className="flex">
          <ExperienceCard
            experience={experience}
            isFavorite={favoriteIds.includes(experience.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
