"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";

export interface HeroModelItem {
  name: string;
  slug: string;
  heroImage: string;
  category: string;
  msrpMxn: number;
}

interface HeroCarouselProps {
  carouselModels: HeroModelItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ carouselModels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 5 seconds unless paused on hover
  useEffect(() => {
    if (isPaused || carouselModels.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselModels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, carouselModels.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselModels.length) % carouselModels.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselModels.length);
  };

  if (carouselModels.length === 0) return null;

  const currentModel = carouselModels[currentIndex];

  return (
    <section
      className="relative min-h-[85vh] bg-slate-950 flex items-center justify-center overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Carousel Images covering the entire Hero Section */}
      {carouselModels.map((model, idx) => (
        <div
          key={model.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={model.heroImage}
            alt={model.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        </div>
      ))}

      {/* Main Hero Content Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-sky-400" />
          BMW Motorrad Monterrey • Eduardo Ibarra
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Adquiere tu <span className="text-sky-400">BMW Motorrad 2026</span> en Monterrey con Atención Ejecutiva
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Cotiza en línea la nueva <strong>R 1300 GS, F 900 GS, M 1000 XR o S 1000 XR</strong>. Planes de financiamiento BMW Financial Services, recibimos tu motocicleta a cuenta y garantizamos entrega prioritaria en San Pedro y Monterrey.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#cotizar-lead-form"
            className="w-full sm:w-auto px-8 py-4 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/30"
          >
            Solicitar Cotización Inmediata
          </a>
          <Link
            href="/herramientas/finder"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all"
          >
            Encontrar mi BMW Ideal (Quiz)
          </Link>
        </div>

        {/* Active Model Indicator Pill Bar */}
        <div className="pt-4 flex justify-center">
          <Link
            href={`/modelos/${currentModel.slug}`}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-slate-900 transition-all shadow-2xl group/pill"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400 uppercase text-[10px]">Destacado:</span>
            <span className="font-extrabold text-white text-sm">{currentModel.name}</span>
            <span className="px-2 py-0.5 bg-sky-600/80 text-sky-100 rounded text-[10px] font-black uppercase">
              {currentModel.category}
            </span>
            <ArrowRight className="w-4 h-4 text-sky-400 group-hover/pill:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto border-t border-white/10 pt-8 text-white">
          <div>
            <span className="text-3xl font-black text-sky-400 block">3 Años</span>
            <span className="text-xs text-slate-400 uppercase font-semibold">Garantía Oficial BMW</span>
          </div>
          <div>
            <span className="text-3xl font-black text-white block">&lt; 15 min</span>
            <span className="text-xs text-slate-400 uppercase font-semibold">Respuesta de Cotización</span>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-sky-600 transition-all opacity-80 hover:opacity-100"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-sky-600 transition-all opacity-80 hover:opacity-100"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {carouselModels.map((m, idx) => (
          <button
            key={m.slug}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-8 h-2.5 bg-sky-500"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Ir al modelo ${m.name}`}
            title={m.name}
          />
        ))}
      </div>
    </section>
  );
};
