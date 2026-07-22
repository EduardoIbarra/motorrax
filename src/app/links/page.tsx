import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mountain, Share2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import {
  getLinksByGroup,
  pitStopConfig,
  type LinkItem,
} from "@/lib/link-hub";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: `${pitStopConfig.name} — todos mis links`,
  description: `${pitStopConfig.bio} Instagram, YouTube, Facebook, rutas, Rally ADV y deals. Visita ${pitStopConfig.shortUrl}`,
  path: "/links",
});

export default function PitStopPage() {
  const groups = getLinksByGroup();

  return (
    <div className="relative min-h-full overflow-hidden bg-background">
      {/* Adventure backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-16 top-40 h-64 w-64 rounded-full bg-trail/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-sand/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-md flex-col px-4 pb-12 pt-10 sm:px-5">
        {/* Brand header */}
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-card-border bg-card shadow-xl shadow-accent/10">
            <Image
              src={pitStopConfig.avatar}
              alt={pitStopConfig.headline}
              width={80}
              height={80}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <p className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            <Share2 className="h-3 w-3" />
            {pitStopConfig.name}
          </p>

          <h1 className="text-3xl font-extrabold tracking-[0.12em]">
            {pitStopConfig.headline}
          </h1>
          <p className="mt-1 text-sm font-medium text-sand">
            {pitStopConfig.tagline}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {pitStopConfig.bio}
          </p>

          {/* Quick social row */}
          <div className="mt-5 flex items-center gap-2">
            <SocialRound
              href={siteConfig.social.instagram}
              label="Instagram"
              icon={<InstagramIcon className="h-4 w-4" />}
            />
            <SocialRound
              href={siteConfig.social.youtube}
              label="YouTube"
              icon={<YoutubeIcon className="h-4 w-4" />}
            />
            <SocialRound
              href={siteConfig.social.facebook}
              label="Facebook"
              icon={<FacebookIcon className="h-4 w-4" />}
            />
          </div>
        </header>

        {/* Link groups */}
        <div className="flex flex-col gap-7">
          {groups.map(({ group, label, items }) => (
            <section key={group} aria-labelledby={`group-${group}`}>
              <h2
                id={`group-${group}`}
                className="mb-2.5 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel"
              >
                {label}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.id}>
                    <LinkButton item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-12 flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-steel">
            En videos di:{" "}
            <span className="font-semibold text-muted">
              {pitStopConfig.shortUrl}
            </span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-accent"
          >
            <Mountain className="h-3.5 w-3.5" />
            motorrax.com
          </Link>
        </footer>
      </div>
    </div>
  );
}

function LinkButton({ item }: { item: LinkItem }) {
  const external = item.href.startsWith("http");
  const className = cn(
    "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition",
    item.featured
      ? "border-accent/50 bg-accent text-white shadow-lg shadow-accent/25 hover:bg-accent-hover"
      : "border-card-border bg-card/90 backdrop-blur hover:border-accent/50 hover:bg-card",
  );

  const inner = (
    <>
      {item.badge && (
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg",
            item.featured ? "bg-white/15" : "bg-background",
          )}
          aria-hidden
        >
          {item.badge}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-bold leading-tight",
            item.featured ? "text-white" : "text-foreground",
          )}
        >
          {item.title}
        </span>
        {item.subtitle && (
          <span
            className={cn(
              "mt-0.5 block truncate text-xs",
              item.featured ? "text-white/80" : "text-muted",
            )}
          >
            {item.subtitle}
          </span>
        )}
      </span>
      {external && !item.sameTab && (
        <ExternalLink
          className={cn(
            "h-4 w-4 shrink-0 opacity-50 transition group-hover:opacity-100",
            item.featured && "text-white",
          )}
        />
      )}
    </>
  );

  if (item.sameTab || !external) {
    return (
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
}

function SocialRound({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-muted transition hover:border-accent hover:text-accent"
    >
      {icon}
    </a>
  );
}
