"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Explorar" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Brand() {
  return (
    <Link href="/" className="font-display text-xl font-semibold tracking-tight text-primary">
      Wanderlust<span className="text-coral">.</span>
    </Link>
  );
}

const headerClass =
  "sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75";
const containerClass =
  "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6";

export default function Navbar() {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();

  return (
    <header className={headerClass}>
      <nav className={containerClass} aria-label="Principal">
        <Brand />
        <ul className="flex w-full gap-1 overflow-x-auto sm:w-auto">
          {NAV_LINKS.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href} className="flex-1 sm:flex-none">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-foreground/80 hover:bg-sand hover:text-foreground"
                  }`}
                >
                  {label}
                  {href === "/favorites" && favoriteIds.length > 0 && (
                    <span
                      className={`rounded-full px-1.5 text-xs tabular-nums ${
                        active ? "bg-white/20" : "bg-coral text-white"
                      }`}
                    >
                      {favoriteIds.length}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

/** Se muestra mientras usePathname no puede resolverse (p. ej. en el prerender). */
export function NavbarFallback() {
  return (
    <header className={headerClass}>
      <div className={containerClass}>
        <Brand />
        <div className="h-8 w-full sm:w-80" />
      </div>
    </header>
  );
}
