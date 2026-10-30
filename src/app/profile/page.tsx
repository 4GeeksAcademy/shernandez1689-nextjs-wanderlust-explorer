import type { Metadata } from "next";
import FavoritesSummary from "@/components/FavoritesSummary";

export const metadata: Metadata = {
  title: "Perfil",
};

const MOCK_USER = {
  name: "Alex Rivera",
  initials: "AR",
  email: "alex.rivera@example.com",
  location: "Madrid, Spain",
  memberSince: "marzo de 2024",
  bio: "Viajero lento, fan de los mercados locales y de cualquier plan que acabe en el mar.",
  interests: ["Gastronomía", "Naturaleza", "Vela", "Fotografía"],
};

export default function ProfilePage() {
  const { name, initials, email, location, memberSince, bio, interests } = MOCK_USER;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6">
      <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:flex-row sm:items-center sm:p-8">
        <div
          className="grid size-24 shrink-0 place-items-center rounded-full bg-primary font-display text-3xl font-semibold text-white"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight">{name}</h1>
          <p className="text-sm text-muted">
            {email} · {location} · Miembro desde {memberSince}
          </p>
          <p className="text-foreground/80">{bio}</p>
          <ul className="flex flex-wrap gap-2 pt-1">
            {interests.map((interest) => (
              <li key={interest} className="rounded-full bg-sand px-3 py-1 text-xs font-medium">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FavoritesSummary />
    </div>
  );
}
