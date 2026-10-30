import Link from "next/link";
import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <EmptyState
        title="Página no encontrada"
        description="La experiencia o página que buscas no existe o ya no está disponible."
        action={
          <Link
            href="/experiences"
            className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Volver al explorador
          </Link>
        }
      />
    </div>
  );
}
