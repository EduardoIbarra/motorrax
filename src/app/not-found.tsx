import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mb-3 text-3xl font-bold">Ruta no encontrada</h1>
      <p className="mb-8 text-muted">
        Esta pista se perdió en el single track. Vuelve al campamento base.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-hover"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
