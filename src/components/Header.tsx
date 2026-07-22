"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/rutas", label: "Rutas" },
  { href: "/rallies", label: "Rally ADV" },
  { href: "/tienda", label: "Tienda" },
  { href: "/guias", label: "Guías ADV" },
  { href: "/links", label: "Pit Stop" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-card-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-lg shadow-accent/30 transition group-hover:bg-accent-hover">
            <Mountain className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg tracking-[0.12em]">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:bg-card hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/rutas"
            className="ml-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent-hover"
          >
            Ver rodadas
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-card-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Móvil">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-muted hover:bg-card hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
