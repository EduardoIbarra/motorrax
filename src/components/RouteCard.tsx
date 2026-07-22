import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Flag } from "lucide-react";
import type { Route } from "@/types/database";
import { formatDate, storageUrl, stripHtml, truncate } from "@/lib/utils";

type Props = {
  route: Route;
  priority?: boolean;
};

export function RouteCard({ route, priority = false }: Props) {
  const image = storageUrl(route.banner);
  const summary = truncate(stripHtml(route.description), 120);
  const isRally = route.rally || /rally/i.test(route.title);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
      <Link href={`/rutas/${route.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={`Rodada adventure: ${route.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        {isRally && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            <Flag className="h-3 w-3" />
            Rally ADV
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight">
          <Link
            href={`/rutas/${route.id}`}
            className="transition hover:text-accent"
          >
            {route.title}
          </Link>
        </h3>

        {summary && (
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
            {summary}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-3 text-xs text-steel">
          {route.start_timestamp && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              {formatDate(route.start_timestamp)}
            </span>
          )}
          {route.venue && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-trail" />
              {route.venue}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
