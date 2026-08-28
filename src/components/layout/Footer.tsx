"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";
import { siteConfig } from "@/lib/config";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/SocialIcons";
import { Phone, MapPin, ShieldCheck, Sparkles } from "lucide-react";

export const Footer = () => {
  // Dynamically pull top featured models for footer SEO links
  const topModels = BMW_MODELS_DATA.slice(0, 6);
  const [hasInventory, setHasInventory] = useState(false);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasInventory === "boolean") {
          setHasInventory(data.hasInventory);
        }
      })
      .catch((err) =>
        console.error("Error checking inventory in footer:", err),
      );
  }, []);

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Local SEO Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/motorrax_logo_white.png"
                alt="MOTORRAX BMW Motorrad Monterrey logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p
              className="text-xs leading-relaxed text-slate-400 font-light"
              itemProp="description"
            >
              Plataforma digital ejecutiva para cotización, financiamiento BMW
              Select y adquisición de motocicletas BMW Motorrad 2026 en
              Monterrey y San Pedro Garza García con Eduardo Ibarra.
            </p>

            {/* Social Trust Links */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Comunidad & Redes Sociales
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-800 transition-colors"
                  title="Instagram @_motorrax"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 hover:bg-rose-600/20 text-slate-400 hover:text-rose-500 rounded-xl border border-slate-800 transition-colors"
                  title="YouTube @_motorrax"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 rounded-xl border border-slate-800 transition-colors"
                  title="Facebook MOTORRAX"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>San Pedro Garza García & Monterrey, NL</span>
              </div>
              <a
                href="https://wa.me/528125827777?text=Hola%20Eduardo,%20te%20contacta%20desde%20el%20sitio%20web"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp: (81) 2582-7777</span>
              </a>
            </div>
          </div>

          {/* Dynamic Models Links (SEO Keyword Anchor Text) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>Catálogo BMW 2026</span>
              <span className="text-[9px] bg-sky-900 text-sky-300 px-1.5 py-0.5 rounded font-mono">
                28+
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              {topModels.map((model) => (
                <li key={model.slug}>
                  <Link
                    href={`/modelos/${model.slug}`}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                    title={`Ver ficha técnica y precio de ${model.name} 2026`}
                  >
                    <span className="group-hover:text-sky-400 transition-colors">
                      {model.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono group-hover:text-slate-300">
                      ${Math.round(model.msrpMxn / 1000)}k MXN
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/modelos"
                  className="text-sky-400 hover:text-sky-300 font-bold transition-colors text-[11px] block"
                >
                  Ver Catálogo Completo →
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Herramientas & Asesoría
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/herramientas/finder"
                  className="hover:text-white transition-colors"
                  title="Quiz interactivo recomendador de motocicletas BMW"
                >
                  BMW Finder Interactive (IA)
                </Link>
              </li>
              <li>
                <Link
                  href="/herramientas/calculadoras"
                  className="hover:text-white transition-colors"
                  title="Simulador de enganche y mensualidad BMW Select"
                >
                  Simulador de Financiamiento
                </Link>
              </li>
              <li>
                <Link
                  href="/comparativas"
                  className="hover:text-white transition-colors"
                  title="Comparativas frente a frente BMW vs Competencia"
                >
                  Comparativas de Modelos
                </Link>
              </li>
              <li>
                <Link
                  href="/carpuride"
                  className="hover:text-white transition-colors"
                  title="Guía Carpuride W502BS, W602BS y W702BS para BMW Motorrad"
                >
                  Carpuride para BMW Motorrad
                </Link>
              </li>
              <li>
                <Link
                  href="/bmw-motorrad/nuevo-leon"
                  className="hover:text-white transition-colors"
                  title="Comprar y cotizar BMW Motorrad en Nuevo León"
                >
                  BMW Motorrad Nuevo León
                </Link>
              </li>
              <li>
                <Link
                  href="/bmw-motorrad/coahuila"
                  className="hover:text-white transition-colors"
                  title="Comprar y cotizar BMW Motorrad desde Coahuila"
                >
                  BMW Motorrad Coahuila
                </Link>
              </li>
              {hasInventory && (
                <li>
                  <Link
                    href="/inventario"
                    className="hover:text-white transition-colors"
                    title="Inventario disponible con entrega inmediata en Monterrey"
                  >
                    Inventario Entrega Inmediata
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/conoce-eduardo"
                  className="hover:text-white transition-colors"
                  title="Perfil profesional y contacto de Eduardo Ibarra"
                >
                  Eduardo Ibarra (Asesor)
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-900">
                <Link
                  href="/admin/login"
                  className="hover:text-white transition-colors font-mono text-[11px] text-slate-400 flex items-center gap-1"
                >
                  <span>Portal Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Notice & Assurance */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Garantía & Aviso Legal
            </h4>
            <div className="space-y-3 text-[11px] text-slate-400 font-light leading-relaxed">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>3 Años de Garantía Oficial</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Todas las unidades 2026 incluyen 3 años de garantía oficial de
                  fábrica sin límite de kilometraje y asistencia vial.
                </p>
              </div>
              <p className="text-[10px] text-slate-400">
                *Precios de lista sugeridos en pesos mexicanos (MXN) sujetos a
                cambios y disponibilidad de inventario en Monterrey.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} MOTORRAX • BMW Motorrad Monterrey.
            Todos los derechos reservados.
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-[11px] text-slate-400">
            <span>San Pedro Garza García, N.L.</span>
            <span>•</span>
            <span className="text-sky-400 font-semibold">
              Atención con Eduardo Ibarra
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
