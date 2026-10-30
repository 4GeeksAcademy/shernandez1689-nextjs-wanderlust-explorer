import type { Metadata } from "next";
import { Suspense } from "react";
import ExperienceExplorer, { ExperienceExplorerFallback } from "@/components/ExperienceExplorer";

export const metadata: Metadata = {
  title: "Explorar experiencias",
};

export default function ExperiencesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Explora experiencias
        </h1>
        <p className="text-muted">
          Busca por título y combina categoría y destino. Comparte la URL para enviar esta misma
          vista.
        </p>
      </header>

      {/* useSearchParams necesita un límite de Suspense para el prerender */}
      <Suspense fallback={<ExperienceExplorerFallback />}>
        <ExperienceExplorer />
      </Suspense>
    </div>
  );
}
