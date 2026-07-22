import Link from "next/link";
import { Mountain } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { siteConfig } from "@/lib/config";

const links = [
  { href: "/rutas", label: "Rutas y rodadas" },
  { href: "/rallies", label: "Rally ADV" },
  { href: "/tienda", label: "Tienda" },
  { href: "/guias", label: "Guías adventure" },
  { href: "/links", label: "Pit Stop (todos los links)" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-card-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2 font-bold tracking-[0.12em]">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
              <Mountain className="h-4 w-4" />
            </span>
            {siteConfig.name}
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Comunidad de adventure motorcycle en México. Off-road, maxitrail,
            Rally ADV y rodadas con la tribu que vive la moto más allá del
            asfalto.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-sand">
            Explorar
          </h2>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-muted transition hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-sand">
            Síguenos
          </h2>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-card-border p-2.5 text-muted transition hover:border-accent hover:text-accent"
              aria-label="Instagram MOTORRAX"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-card-border p-2.5 text-muted transition hover:border-accent hover:text-accent"
              aria-label="Facebook MOTORRAX"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-card-border p-2.5 text-muted transition hover:border-accent hover:text-accent"
              aria-label="YouTube MOTORRAX"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            {siteConfig.contact.venue}
            <br />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-card-border px-4 py-5 text-center text-xs text-steel">
        © {new Date().getFullYear()} {siteConfig.name}. Adventure motorcycle
        community · Powered by NorthBikers data.
      </div>
    </footer>
  );
}
