import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { CATEGORY_LABELS, COUNTRIES } from "@/lib/experiences";
import { CATEGORIES } from "@/types/experience";

const FEATURED_DESTINATIONS = ["Croatia", "Japan", "Thailand", "Peru", "Iceland", "Morocco"];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="https://picsum.photos/seed/wanderlust-hero/1800/1000"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 text-white sm:px-6 sm:py-32 lg:py-40">
          <p className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            {experiences.length} experiencias · {COUNTRIES.length} países
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Descubre experiencias que no caben en una guía de viaje
          </h1>
          <p className="max-w-xl text-lg text-white/85">
            Desde tours gastronómicos en Bangkok hasta rutas de vela por el Adriático. Busca,
            filtra y guarda tus favoritas para tu próxima aventura.
          </p>
          <Link
            href="/experiences"
            className="rounded-full bg-coral px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            Explorar experiencias →
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold">Explora por categoría</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href={`/experiences?category=${category.toLowerCase()}`}
                  className="flex h-full flex-col gap-1 rounded-2xl bg-white p-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="font-semibold">{CATEGORY_LABELS[category]}</span>
                  <span className="text-sm text-muted">
                    {experiences.filter((e) => e.category === category).length} experiencias
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-semibold">Destinos populares</h2>
          <ul className="flex flex-wrap gap-2">
            {FEATURED_DESTINATIONS.map((country) => (
              <li key={country}>
                <Link
                  href={`/experiences?destination=${country}`}
                  className="block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
                >
                  {country}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/experiences?search=vela&category=adventure&destination=Croatia"
                className="block rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                Vela en Croacia ⛵
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
