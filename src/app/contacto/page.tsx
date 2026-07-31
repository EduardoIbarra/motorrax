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
import { ContactFormClient } from "./ContactFormClient";

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

      <ContactFormClient />
    </div>
  );
}
