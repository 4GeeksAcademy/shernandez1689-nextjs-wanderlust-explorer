import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailFavoriteButton from "@/components/DetailFavoriteButton";
import { experiences } from "@/data/experiences";
import { CATEGORY_LABELS, formatPrice, getExperienceById } from "@/lib/experiences";

export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<"/experiences/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const experience = getExperienceById(id);
  return experience
    ? { title: experience.title, description: experience.description }
    : { title: "Experiencia no encontrada" };
}

export default async function ExperienceDetailPage(props: PageProps<"/experiences/[id]">) {
  const { id } = await props.params;
  const experience = getExperienceById(id);
  if (!experience) notFound();

  const { title, description, category, destination, price, rating, reviewCount, duration } =
    experience;

  const facts = [
    { label: "Destino", value: destination },
    { label: "Categoría", value: CATEGORY_LABELS[category] },
    { label: "Duración", value: duration },
    { label: "Valoración", value: `★ ${rating.toFixed(1)} · ${reviewCount} reseñas` },
  ];

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/experiences"
        className="w-fit text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        ← Volver al explorador
      </Link>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand">
          <Image
            src={experience.imageUrl}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Link
              href={`/experiences?category=${category.toLowerCase()}`}
              className="w-fit rounded-full bg-sand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              {CATEGORY_LABELS[category]}
            </Link>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">{description}</p>
          </div>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center justify-between gap-4 rounded-2xl bg-primary p-5 text-white">
            <p>
              <span className="block text-sm text-white/75">Desde</span>
              <span className="text-2xl font-semibold">{formatPrice(price)}</span>
              <span className="text-white/75"> por persona</span>
            </p>
            <DetailFavoriteButton id={experience.id} title={title} />
          </div>
        </div>
      </div>
    </article>
  );
}
