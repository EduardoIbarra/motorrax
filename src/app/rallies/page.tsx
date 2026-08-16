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
  const [rallies, tours] = await Promise.all([getRallies(50), getTours()]);
  const now = new Date();

  // Split rallies into upcoming/active vs past
  const upcomingRallies: typeof rallies = [];
  const pastRallies: typeof rallies = [];

  for (const rally of rallies) {
    const endDate = rally.end_timestamp ? new Date(rally.end_timestamp) : null;
    const startDate = rally.start_timestamp ? new Date(rally.start_timestamp) : null;
    
    // Consider upcoming/active if end_timestamp >= now, or start_timestamp >= now, or no timestamps specified
    if (!startDate && !endDate) {
      upcomingRallies.push(rally);
    } else if (endDate && endDate >= now) {
      upcomingRallies.push(rally);
    } else if (startDate && startDate >= now) {
      upcomingRallies.push(rally);
    } else {
      pastRallies.push(rally);
    }
  }

  // Sort upcoming in ascending chronological order (earliest first)
  upcomingRallies.sort((a, b) => {
    const dateA = a.start_timestamp ? new Date(a.start_timestamp).getTime() : 0;
    const dateB = b.start_timestamp ? new Date(b.start_timestamp).getTime() : 0;
    return dateA - dateB;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Serie nacional"
        title="Rally ADV"
        description="Eventos multi-día de adventure motorcycle. El grupo MOTORRAX se lanza a Sierra Gorda, Baja, Chiapas y el corazón de México."
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

      {/* Upcoming / Active Rallies Section */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between border-b border-card-border pb-3">
          <h2 className="text-xl font-extrabold tracking-tight">
            Próximos Rallies y Eventos Activos
          </h2>
          <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            {upcomingRallies.length} activo{upcomingRallies.length === 1 ? "" : "s"}
          </span>
        </div>

        {upcomingRallies.length === 0 ? (
          <div className="rounded-2xl border border-card-border bg-card p-8 text-center text-muted">
            Pronto publicaremos las fechas de los próximos Rally ADV. Síguenos en redes.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingRallies.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </section>

      {/* Past Rallies Section */}
      {pastRallies.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between border-b border-card-border pb-3">
            <h2 className="text-xl font-bold tracking-tight text-muted">
              Ediciones Anteriores
            </h2>
            <span className="rounded-full border border-card-border bg-card px-3 py-1 text-xs font-semibold text-steel">
              {pastRallies.length} concluido{pastRallies.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="grid gap-6 opacity-85 sm:grid-cols-2 lg:grid-cols-3">
            {pastRallies.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
