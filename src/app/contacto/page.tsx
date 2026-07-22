import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacta a MOTORRAX — comunidad adventure motorcycle en Monterrey, México. Colaboraciones, sponsors y rodadas.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Hablemos"
        title="Contacto"
        description="Colaboraciones, sponsors, prensa o sumarte al grupo."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex items-start gap-3 rounded-2xl border border-card-border bg-card p-6 transition hover:border-accent"
        >
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="font-bold">Email</p>
            <p className="text-sm text-muted">{siteConfig.contact.email}</p>
          </div>
        </a>
        <div className="flex items-start gap-3 rounded-2xl border border-card-border bg-card p-6">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-trail" />
          <div>
            <p className="font-bold">Base</p>
            <p className="text-sm text-muted">{siteConfig.contact.venue}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-lg font-bold">Redes</h2>
      <ul className="space-y-3">
        {[
          {
            href: siteConfig.social.instagram,
            icon: InstagramIcon,
            label: "Instagram @_motorrax",
          },
          {
            href: siteConfig.social.facebook,
            icon: FacebookIcon,
            label: "Facebook /motorrax",
          },
          {
            href: siteConfig.social.youtube,
            icon: YoutubeIcon,
            label: "YouTube @_motorrax",
          },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted transition hover:text-accent"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <form
        className="mt-12 space-y-4 rounded-2xl border border-card-border bg-card p-6 sm:p-8"
        action={`mailto:${siteConfig.contact.email}`}
        method="get"
      >
        <h2 className="text-lg font-bold">Mensaje rápido</h2>
        <p className="text-sm text-muted">
          Abre tu cliente de correo con el asunto listo. También puedes escribir
          directo a las redes.
        </p>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium">
            Asunto
          </label>
          <input
            id="subject"
            name="subject"
            defaultValue="Hola MOTORRAX"
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="body" className="mb-1 block text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="body"
            name="body"
            rows={5}
            placeholder="Cuéntanos sobre tu proyecto, rodada o colaboración…"
            className="w-full rounded-xl border border-card-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-hover"
        >
          Enviar por email
        </button>
      </form>
    </div>
  );
}
