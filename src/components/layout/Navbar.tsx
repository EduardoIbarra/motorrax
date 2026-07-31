"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Calculator,
  Compass,
  FileText,
  UserCheck,
  PackageCheck,
  ShieldCheck,
  Lock,
} from "lucide-react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modelosDropdown, setModelosDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [hasInventory, setHasInventory] = useState(false);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasInventory === "boolean") {
          setHasInventory(data.hasInventory);
        }
      })
      .catch((err) => console.error("Error checking inventory status:", err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar (SEO & Trust + Admin Quick Access) */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">MOTORRAX • BMW Motorrad Monterrey & San Pedro</span>
            <span className="hidden md:inline text-slate-400">| Asesoría Ejecutiva con Eduardo Ibarra</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://wa.me/528125827777?text=Hola%20Eduardo,%20me%20interesa%20un%20BMW%20Motorrad"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors text-emerald-400 font-semibold"
              title="Enviar WhatsApp a Eduardo Ibarra"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: (81) 2582-7777</span>
            </a>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors text-slate-400 flex items-center gap-1 border-l border-slate-800 pl-3"
              title="Acceso Administrador"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <div className="flex items-center gap-1 text-slate-400 border-l border-slate-800 pl-3">
              <button
                onClick={() => setLang("es")}
                className={`px-1 rounded ${lang === "es" ? "text-white font-bold" : "hover:text-white"}`}
                aria-label="Idioma Español"
              >
                ES
              </button>
              <span>/</span>
              <button
                onClick={() => setLang("en")}
                className={`px-1 rounded ${lang === "en" ? "text-white font-bold" : "hover:text-white"}`}
                aria-label="English Language"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group py-1" title="MOTORRAX - BMW Motorrad Monterrey">
          <div className="relative h-12 w-44 sm:w-52 flex items-center">
            <Image
              src="/images/motorrax_logo_black.png"
              alt="MOTORRAX BMW Motorrad Monterrey logo"
              width={220}
              height={55}
              className="object-contain h-12 w-auto group-hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Clean Dropdown Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700" aria-label="Navegación principal">
          <Link href="/" className="hover:text-sky-600 transition-colors" title="Página Principal MOTORRAX">
            Inicio
          </Link>

          {/* Dropdown: Modelos */}
          <div
            className="relative"
            onMouseEnter={() => setModelosDropdown(true)}
            onMouseLeave={() => setModelosDropdown(false)}
          >
            <button
              className="flex items-center gap-1 py-2 hover:text-sky-600 transition-colors focus:outline-none"
              aria-expanded={modelosDropdown}
            >
              <span>Modelos 2026</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${modelosDropdown ? "rotate-180 text-sky-600" : ""}`} />
            </button>

            {modelosDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-1 z-50 animate-in fade-in duration-150">
                <Link
                  href="/modelos/r1300gs"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    GS
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">BMW R 1300 GS</div>
                    <div className="text-[10px] text-slate-400">Adventure Flagship 2026</div>
                  </div>
                </Link>

                <Link
                  href="/modelos/f900gs"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    F
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">BMW F 900 GS</div>
                    <div className="text-[10px] text-slate-400">Enduro & Trail Ligero</div>
                  </div>
                </Link>

                <Link
                  href="/modelos/m1000xr"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs group-hover:bg-rose-600 group-hover:text-white transition-colors">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">BMW M 1000 XR</div>
                    <div className="text-[10px] text-slate-400">High-Performance Crossover</div>
                  </div>
                </Link>

                <Link
                  href="/modelos/s1000xr"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    XR
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">BMW S 1000 XR</div>
                    <div className="text-[10px] text-slate-400">Sport Touring Tetracilíndrico</div>
                  </div>
                </Link>

                <div className="border-t border-slate-100 pt-2 mt-1">
                  <Link
                    href="/modelos"
                    className="block text-center py-2 text-xs font-bold text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
                  >
                    Ver Catálogo Completo →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Herramientas */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdown(true)}
            onMouseLeave={() => setToolsDropdown(false)}
          >
            <button
              className="flex items-center gap-1 py-2 hover:text-sky-600 transition-colors focus:outline-none"
              aria-expanded={toolsDropdown}
            >
              <span>Herramientas</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdown ? "rotate-180 text-sky-600" : ""}`} />
            </button>

            {toolsDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 space-y-1 z-50 animate-in fade-in duration-150">
                <Link
                  href="/herramientas/finder"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Compass className="w-4 h-4 text-sky-600" />
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                      <span>BMW Finder Quiz</span>
                      <span className="text-[9px] bg-sky-100 text-sky-700 font-bold px-1.5 py-0.5 rounded">IA</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Encuentra tu moto ideal en 1 min</div>
                  </div>
                </Link>

                <Link
                  href="/herramientas/calculadoras"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Simulador de Financiamiento</div>
                    <div className="text-[10px] text-slate-400">Calcula tu enganche y mensualidad</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/comparativas" className="hover:text-sky-600 transition-colors" title="Comparativas de Motocicletas BMW">
            Comparativas
          </Link>

          {hasInventory && (
            <Link href="/inventario" className="hover:text-sky-600 transition-colors flex items-center gap-1.5" title="Inventario disponible con entrega inmediata en Monterrey">
              <span>Inventario</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                Entrega Inmediata
              </span>
            </Link>
          )}

          <Link href="/conoce-eduardo" className="hover:text-sky-600 transition-colors" title="Perfil y atención ejecutiva de Eduardo Ibarra">
            Eduardo Ibarra
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20cotizar%20un%20BMW%20Motorrad%20en%20Monterrey"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <a
            href="/#cotizar-lead-form"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-sky-600 rounded-xl hover:bg-sky-700 transition-all shadow-md shadow-sky-600/25 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solicitar Cotización</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          aria-label="Abrir menú de navegación"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 font-semibold text-slate-800 animate-in slide-in-from-top-2 duration-150">
          <Link href="/" className="block py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
            Inicio
          </Link>
          <div className="border-t border-slate-100 pt-2 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Modelos BMW 2026</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/modelos/r1300gs" className="p-2 bg-slate-50 rounded-lg hover:bg-sky-50 font-bold text-slate-900" onClick={() => setMobileOpen(false)}>
                R 1300 GS
              </Link>
              <Link href="/modelos/f900gs" className="p-2 bg-slate-50 rounded-lg hover:bg-sky-50 font-bold text-slate-900" onClick={() => setMobileOpen(false)}>
                F 900 GS
              </Link>
              <Link href="/modelos/m1000xr" className="p-2 bg-slate-50 rounded-lg hover:bg-sky-50 font-bold text-slate-900" onClick={() => setMobileOpen(false)}>
                M 1000 XR
              </Link>
              <Link href="/modelos/s1000xr" className="p-2 bg-slate-50 rounded-lg hover:bg-sky-50 font-bold text-slate-900" onClick={() => setMobileOpen(false)}>
                S 1000 XR
              </Link>
            </div>
          </div>
          {hasInventory && (
            <Link href="/inventario" className="flex items-center justify-between py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
              <span>Inventario Monterrey</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Disponible</span>
            </Link>
          )}
          <Link href="/comparativas" className="block py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
            Comparativas
          </Link>
          <Link href="/herramientas/finder" className="block py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
            BMW Finder (IA)
          </Link>
          <Link href="/herramientas/calculadoras" className="block py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
            Calculadoras Financieras
          </Link>
          <Link href="/conoce-eduardo" className="block py-2 text-slate-900 hover:text-sky-600" onClick={() => setMobileOpen(false)}>
            Eduardo Ibarra
          </Link>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="/#cotizar-lead-form"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md shadow-sky-600/30"
            >
              Solicitar Cotización Inmediata
            </a>
            <a
              href="https://wa.me/528125827777"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center shadow-md flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Eduardo Ibarra
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

