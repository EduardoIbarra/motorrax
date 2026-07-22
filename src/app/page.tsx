import Image from "next/image";
import Link from "next/link";
import { Compass, Mountain, Users, Shield, Bike, Flag } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { RouteCard } from "@/components/RouteCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  getFeaturedRoutes,
  getLatestRoutes,
  getProducts,
  getSponsors,
} from "@/lib/data";
import { siteConfig } from "@/lib/config";
import { storageUrl } from "@/lib/utils";

export const revalidate = 300;

export default async function HomePage() {
  const [featured, latest, products, sponsors] = await Promise.all([
    getFeaturedRoutes(6),
    getLatestRoutes(6),
    getProducts(4),
    getSponsors(),
  ]);

  // Prefer rallies/featured for hero backdrop
  const heroRoute = featured[0] || latest[0];
  const heroImage = storageUrl(heroRoute?.banner);

  const showcase =
    featured.length >= 3
      ? featured.slice(0, 6)
      : [...featured, ...latest]
          .filter(
            (r, i, arr) => arr.findIndex((x) => x.id === r.id) === i,
          )
          .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative hero-grain min-h-[88vh] overflow-hidden">
        <Image
          src={heroImage}
          alt="Adventure motorcycle off-road en México — MOTORRAX"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Mountain className="h-3.5 w-3.5" />
            Adventure motorcycle · México
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            La tribu del{" "}
            <span className="text-accent">off-road</span>
            <br />y el maxitrail
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {siteConfig.tagline} Rodadas, Rally ADV, guías BMW GS y la
            comunidad que sale del asfalto cada fin de semana — de Monterrey a
            Baja, Chiapas y Sierra Gorda.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/rutas"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-accent/30 transition hover:bg-accent-hover"
            >
              Explorar rutas
            </Link>
            <Link
              href="/rallies"
              className="rounded-full border border-card-border bg-card/60 px-6 py-3 text-sm font-bold uppercase tracking-wide backdrop-blur transition hover:border-accent"
            >
              Rally ADV 2026
            </Link>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-card-border px-5 py-3 text-sm font-medium text-muted transition hover:text-foreground"
            >
              <YoutubeIcon className="h-4 w-4 text-red-500" />
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-card-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {[
            {
              icon: Compass,
              title: "Rutas reales",
              text: "Rodadas off-road y mixtas con venue, distancia y recomendaciones de la comunidad.",
            },
            {
              icon: Flag,
              title: "Rally ADV",
              text: "Eventos multi-día por México: Nuevo León, Baja, Querétaro, Chiapas y más.",
            },
            {
              icon: Users,
              title: "Comunidad",
              text: "Contenido, tips de maxitrail y la tribu MOTORRAX en Instagram, Facebook y YouTube.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-card-border bg-background/50 p-6"
            >
              <item.icon className="mb-3 h-8 w-8 text-accent" />
              <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Routes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Sal al terreno"
          title="Próximas rodadas y rallies"
          description="Rutas adventure sincronizadas desde la base NorthBikers / MOTORRAX."
          href="/rutas"
          linkLabel="Todas las rutas"
        />
        {showcase.length === 0 ? (
          <p className="text-muted">No hay rutas publicadas por ahora.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((route, i) => (
              <RouteCard key={route.id} route={route} priority={i < 3} />
            ))}
          </div>
        )}
      </section>

      {/* About strip */}
      <section className="border-y border-card-border bg-gradient-to-br from-card to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Quiénes somos
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              De la GS al single track
            </h2>
            <p className="mb-4 text-muted leading-relaxed">
              MOTORRAX nació del adventure motorcycle: maxitrail BMW, rodadas
              Euromotors MTY, track days y el Rally ADV por la Sierra Gorda y
              más allá. En Instagram y Facebook compartimos técnica, rutas y la
              vida de la tribu; en YouTube, guías reales para levantar una
              maxitrail, equipar tu moto y explorar México off-road.
            </p>
            <p className="mb-6 text-muted leading-relaxed">
              Conectados al ecosistema NorthBikers, publicamos eventos, merch de
              rallies y la agenda de la comunidad adventure en un solo lugar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/nosotros"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
              >
                Conoce MOTORRAX
              </Link>
              <Link
                href="/guias"
                className="rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold hover:border-accent"
              >
                Guías ADV
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Bike, label: "Maxitrail & ADV", sub: "BMW GS y más" },
              { icon: Shield, label: "Técnica segura", sub: "Tips de rodada" },
              { icon: Mountain, label: "Off-road MX", sub: "NL · Baja · QRO" },
              { icon: Users, label: "Comunidad", sub: "Tribu MOTORRAX" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-card-border bg-background p-5"
              >
                <card.icon className="mb-3 h-7 w-7 text-sand" />
                <p className="font-bold">{card.label}</p>
                <p className="text-sm text-muted">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      {products.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Gear de la tribu"
            title="Tienda y merch de rallies"
            description="Gorras, jerseys y edición limitada de eventos ADV."
            href="/tienda"
            linkLabel="Ir a la tienda"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Social CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-card-border bg-card px-6 py-12 text-center sm:px-12">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Únete a la tribu
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted">
            Contenido adventure diario en redes: rutas, installs, track days y
            el detrás de cámaras del Rally ADV.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <SocialPill
              href={siteConfig.social.instagram}
              icon={InstagramIcon}
              label="@_motorrax"
            />
            <SocialPill
              href={siteConfig.social.facebook}
              icon={FacebookIcon}
              label="Facebook"
            />
            <SocialPill
              href={siteConfig.social.youtube}
              icon={YoutubeIcon}
              label="YouTube"
            />
          </div>
        </div>
      </section>

      {/* Sponsors */}
      {sponsors.length > 0 && (
        <section className="border-t border-card-border bg-card/30 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-steel">
              Aliados de la aventura
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {sponsors.map((s) => (
                <li key={s.id}>
                  {s.web || s.instagram ? (
                    <a
                      href={s.web || s.instagram || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold tracking-wide text-muted transition hover:text-accent"
                    >
                      {s.name}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold tracking-wide text-muted">
                      {s.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function SocialPill({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-card-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}
