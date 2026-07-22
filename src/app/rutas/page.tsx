import type { Metadata } from "next";
import { RouteCard } from "@/components/RouteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getRoutes } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Rutas y rodadas adventure",
  description:
    "Calendario de rodadas off-road y adventure motorcycle en México. Rutas MOTORRAX: Monterrey, Nuevo León, Euromotors y más.",
  path: "/rutas",
});

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RutasPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const routes = await getRoutes({ limit: 48, search: q });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Calendario ADV"
        title="Rutas y rodadas"
        description="Explora rodadas off-road, mixtas y eventos de la comunidad adventure. Datos en vivo desde Supabase / NorthBikers."
      />

      <form className="mb-10" action="/rutas" method="get" role="search">
        <label htmlFor="q" className="sr-only">
          Buscar rutas
        </label>
        <div className="flex max-w-xl gap-2">
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Buscar por título, venue o descripción…"
            className="w-full rounded-full border border-card-border bg-card px-5 py-3 text-sm outline-none ring-accent placeholder:text-steel focus:ring-2"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-hover"
          >
            Buscar
          </button>
        </div>
      </form>

      {routes.length === 0 ? (
        <p className="rounded-2xl border border-card-border bg-card p-8 text-center text-muted">
          No encontramos rutas{q ? ` para “${q}”` : ""}. Prueba otra búsqueda.
        </p>
      ) : (
        <>
          <p className="mb-6 text-sm text-steel">
            {routes.length} ruta{routes.length === 1 ? "" : "s"}
            {q ? ` · filtro: “${q}”` : ""}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
