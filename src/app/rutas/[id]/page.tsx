import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  ExternalLink,
  Flag,
} from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import { JsonLd } from "@/components/JsonLd";
import { getRouteById, getLatestRoutes } from "@/lib/data";
import { buildMetadata, eventJsonLd } from "@/lib/seo";
import {
  formatDate,
  storageUrl,
  stripHtml,
  truncate,
} from "@/lib/utils";
import { RouteCard } from "@/components/RouteCard";

export const revalidate = 300;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const route = await getRouteById(Number(id));
  if (!route) {
    return buildMetadata({ title: "Ruta no encontrada", noIndex: true });
  }
  const description =
    truncate(stripHtml(route.description || route.long_description), 160) ||
    `Rodada adventure motorcycle: ${route.title}. ${route.venue || "México"}.`;
  return buildMetadata({
    title: route.title,
    description,
    path: `/rutas/${route.id}`,
    image: storageUrl(route.banner),
    type: "article",
  });
}

export default async function RouteDetailPage({ params }: Props) {
  const { id } = await params;
  const routeId = Number(id);
  if (Number.isNaN(routeId)) notFound();

  const route = await getRouteById(routeId);
  if (!route || route.deleted_at) notFound();

  const related = (await getLatestRoutes(4)).filter((r) => r.id !== route.id);
  const image = storageUrl(route.banner);
  const isRally = route.rally || /rally/i.test(route.title);
  const body = route.long_description || route.description || "";
  const hasHtml = /<[^>]+>/.test(body);
  const videoId =
    route.video_id && route.video_id !== "false" ? route.video_id : null;

  return (
    <>
      <JsonLd
        data={eventJsonLd({
          ...route,
          banner: image,
        })}
      />

      <article>
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden sm:h-[50vh]">
          <Image
            src={image}
            alt={route.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <div className="-mt-20 relative">
            <Link
              href="/rutas"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas las rutas
            </Link>

            {isRally && (
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                <Flag className="h-3.5 w-3.5" />
                Rally ADV
              </p>
            )}

            <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {route.title}
            </h1>

            <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted">
              {route.start_timestamp && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-accent" />
                  {formatDate(route.start_timestamp)}
                </span>
              )}
              {route.venue && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-trail" />
                  {route.venue}
                </span>
              )}
              {route.total_km != null && (
                <span className="rounded-full border border-card-border px-2.5 py-0.5 text-xs">
                  {route.total_km} km
                  {route.dirt_km != null ? ` · ${route.dirt_km} km off-road` : ""}
                </span>
              )}
            </div>

            {body && (
              <div className="prose-route mb-10 rounded-2xl border border-card-border bg-card p-6 sm:p-8">
                {hasHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: body }} />
                ) : (
                  <p className="whitespace-pre-wrap text-muted leading-relaxed">
                    {body}
                  </p>
                )}
              </div>
            )}

            {videoId && (
              <div className="mb-10 overflow-hidden rounded-2xl border border-card-border">
                <div className="flex items-center gap-2 border-b border-card-border bg-card px-4 py-3 text-sm font-semibold">
                  <YoutubeIcon className="h-4 w-4 text-red-500" />
                  Video de la ruta
                </div>
                <div className="relative aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`Video: ${route.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            )}

            {route.website_url && (
              <a
                href={route.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
              >
                Sitio del evento
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-card-border bg-card/30 py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-6 text-2xl font-bold">Más rodadas</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.slice(0, 3).map((r) => (
                  <RouteCard key={r.id} route={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
