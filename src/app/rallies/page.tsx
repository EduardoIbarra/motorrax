import type { Metadata } from "next";
import { RouteCard } from "@/components/RouteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getRallies, getTours } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Rally ADV — eventos adventure multi-día",
  description:
    "Rally ADV MOTORRAX: Baja, Nuevo León, Querétaro, Chiapas, Jalisco, Michoacán y más. Eventos adventure motorcycle en México.",
  path: "/rallies",
});

export default async function RalliesPage() {
  const [rallies, tours] = await Promise.all([getRallies(24), getTours()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Serie nacional"
        title="Rally ADV"
        description="Eventos multi-día de adventure motorcycle. La tribu MOTORRAX se lanza a Sierra Gorda, Baja, Chiapas y el corazón de México."
      />

      {tours.length > 0 && (
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl border border-accent/30 bg-accent-soft p-6"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Tour MOTORRAX
              </p>
              <h2 className="mb-2 text-xl font-bold">{tour.name}</h2>
              {tour.description && (
                <p className="text-sm leading-relaxed text-muted">
                  {tour.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {rallies.length === 0 ? (
        <p className="text-muted">
          Pronto publicaremos el calendario de Rally ADV. Síguenos en redes.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rallies.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      )}
    </div>
  );
}
