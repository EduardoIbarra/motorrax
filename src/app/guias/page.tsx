import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Mountain, Bike, Smartphone } from "lucide-react";
import { YoutubeIcon } from "@/components/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Guías adventure motorcycle",
  description:
    "Guías MOTORRAX para maxitrail y adventure bike: levantar una GS, equipar tu moto, off-road en México y tech para la ADV.",
  path: "/guias",
});

const guides = [
  {
    icon: Bike,
    title: "Cómo levantar una maxitrail pesada",
    body: "Técnica de cuerpo y palanca para levantar una BMW R 1250 GS Adventure (y otras ADV) sin lesionarte. Uno de los temas más pedidos en Facebook y YouTube de MOTORRAX.",
    tag: "Técnica",
  },
  {
    icon: Mountain,
    title: "Off-road en Nuevo León",
    body: "Rutas clásicas de la tribu: Ciénega del Toro, Rayones, Potrero Redondo, Paredón, mina de mármol y rodadas desde Euromotors MTY. Preparación de tanque, agua y equipo.",
    tag: "Rutas",
  },
  {
    icon: Smartphone,
    title: "Apple CarPlay y Android Auto en moto",
    body: "Instalaciones tipo Carpuride para transformar tu BMW (u otra ADV) en smart bike. Tips de montaje en minutos y códigos de descuento de la comunidad.",
    tag: "Tech",
  },
  {
    icon: Wrench,
    title: "Checklist pre-rodada ADV",
    body: "Tanque lleno, electrolitos, sin maletas rígidas en off-road pesado, equipo de protección completo y hora de regreso realista. Lo que repetimos en cada rodada Euromotors.",
    tag: "Seguridad",
  },
];

export default function GuiasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Escuela de la tribu"
        title="Guías adventure"
        description="Contenido inspirado en el canal y redes de MOTORRAX: maxitrail, off-road y la vida ADV en México."
      />

      <div className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-card-border bg-card p-5">
        <YoutubeIcon className="h-8 w-8 text-red-500" />
        <div className="flex-1">
          <p className="font-bold">Más guías en video</p>
          <p className="text-sm text-muted">
            Tutoriales y exploraciones en YouTube @_motorrax
          </p>
        </div>
        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
        >
          Ir a YouTube
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {guides.map((g) => (
          <article
            key={g.title}
            className="rounded-2xl border border-card-border bg-card p-6 transition hover:border-sand/40"
          >
            <span className="mb-3 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
              {g.tag}
            </span>
            <g.icon className="mb-3 h-8 w-8 text-sand" />
            <h2 className="mb-2 text-xl font-bold">{g.title}</h2>
            <p className="text-sm leading-relaxed text-muted">{g.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="mb-4 text-muted">
          ¿Buscas la próxima salida? El calendario de rodadas está al día.
        </p>
        <Link
          href="/rutas"
          className="inline-flex rounded-full border border-card-border px-6 py-3 text-sm font-bold hover:border-accent"
        >
          Ver rutas →
        </Link>
      </div>
    </div>
  );
}
