import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { CATEGORY_LABELS, formatPrice } from "@/lib/experiences";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  const { id, title, category, destination, price, rating, reviewCount, duration, imageUrl } =
    experience;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">
          {CATEGORY_LABELS[category]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{destination}</p>
        <h3 className="font-display text-lg font-semibold leading-snug">
          {/* El ::after hace que toda la tarjeta sea clicable */}
          <Link
            href={`/experiences/${id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2 text-sm">
          <p className="text-muted">
            <span className="font-semibold text-foreground">★ {rating.toFixed(1)}</span> (
            {reviewCount}) · {duration}
          </p>
          <p className="whitespace-nowrap">
            <span className="text-base font-semibold">{formatPrice(price)}</span>
            <span className="text-muted"> /pers.</span>
          </p>
        </div>
      </div>

      {/* Va después del enlace para quedar por encima de su ::after */}
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(id)}
        title={title}
        className="absolute right-3 top-3 z-10"
      />
    </article>
  );
}
