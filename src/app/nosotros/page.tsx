import type { Metadata } from "next";
import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Nosotros — el grupo adventure",
  description:
    "MOTORRAX es la comunidad de adventure motorcycle en México: maxitrail, off-road, Rally ADV y contenido real desde Monterrey hacia todo el país.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="La marca"
        title="Nosotros"
        description="Adventure motorcycle con alma de comunidad."
      />

      <div className="space-y-6 text-muted leading-relaxed">
        <p>
          <strong className="text-foreground">MOTORRAX</strong> es la cara
          adventure de un grupo que no se queda en el asfalto. Nacimos alrededor
          del maxitrail — BMW R 1250 GS y hermanas de categoría — con rodadas
          Euromotors Monterrey, track days, instalaciones tech (CarPlay /
          Android Auto) y el{" "}
          <strong className="text-foreground">Rally ADV</strong> por Sierra
          Gorda, Baja, Chiapas y más.
        </p>
        <p>
          En Instagram (
          <a
            href={siteConfig.social.instagram}
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @_motorrax
          </a>
          ) y Facebook compartimos el día a día de la moto adventure: técnica
          para levantar una maxitrail pesada, tips de off-road, gear y la energía
          de cada rodada. En YouTube encontrarás guías largas, exploraciones y el
          detrás de cámaras de la comunidad.
        </p>
        <p>
          Este sitio conecta con la infraestructura{" "}
          <strong className="text-foreground">NorthBikers</strong>: rutas,
          rallies, productos y la agenda en vivo para que organices tu fin de
          semana ADV con información real.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: siteConfig.social.instagram,
            icon: InstagramIcon,
            label: "Instagram",
            handle: "@_motorrax",
          },
          {
            href: siteConfig.social.facebook,
            icon: FacebookIcon,
            label: "Facebook",
            handle: "/motorrax",
          },
          {
            href: siteConfig.social.youtube,
            icon: YoutubeIcon,
            label: "YouTube",
            handle: "@_motorrax",
          },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start rounded-2xl border border-card-border bg-card p-5 transition hover:border-accent"
          >
            <s.icon className="mb-3 h-6 w-6 text-accent" />
            <span className="font-bold text-foreground">{s.label}</span>
            <span className="text-sm text-muted">{s.handle}</span>
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-card-border bg-card p-6">
        <h2 className="mb-2 text-xl font-bold text-foreground">
          ¿Listo para la siguiente rodada?
        </h2>
        <p className="mb-4 text-sm text-muted">
          Revisa el calendario de rutas o escríbenos.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rutas"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
          >
            Ver rutas
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold hover:border-accent"
          >
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
