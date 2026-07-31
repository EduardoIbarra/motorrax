"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Phone, X } from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

export const ConversionStickyBar = () => {
  const [closed, setClosed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (closed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-white py-2.5 px-4 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-3">
        {/* Information & Value Proposition */}
        <div className="flex items-center gap-2.5 text-xs min-w-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="truncate">
            <span className="font-bold text-white block text-xs sm:text-sm truncate">
              <span className="sm:hidden">BMW Monterrey • Respuesta &lt;15m</span>
              <span className="hidden sm:inline">Atención Prioritaria BMW Monterrey — Eduardo Ibarra</span>
            </span>
            <span className="text-[10px] text-slate-400 hidden md:inline">
              Respuesta en menos de 15 min • Pre-aprobación de crédito rápida
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="/#cotizar-lead-form"
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-sky-600/30 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cotizar <span className="hidden sm:inline">Inmediata</span></span>
          </a>
          <a
            href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20cotizar%20un%20BMW%20Motorrad%20en%20Monterrey"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            onClick={() => AnalyticsEvents.whatsappClick('sticky_bar')}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-700 hover:bg-slate-800 text-emerald-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            title="Cerrar"
            aria-label="Cerrar banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
