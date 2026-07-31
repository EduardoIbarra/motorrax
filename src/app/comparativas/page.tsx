import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BMW_COMPARISONS_DATA } from "@/lib/data/bmw-comparisons";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Comparativas BMW Motorrad vs Competencia 2026 | Monterrey",
  description: "Comparaciones técnicas detalladas entre motocicletas BMW Motorrad y competidores (Honda, Ducati, Yamaha). Potencia, suspensión, precios y veredictos en Monterrey.",
  keywords: [
    "BMW R1300GS vs Africa Twin",
    "BMW F900GS vs Tenere 700",
    "BMW M1000XR vs Streetfighter V4",
    "Comparativa motos Monterrey",
    "Precios BMW Motorrad Monterrey",
  ],
  alternates: {
    canonical: "https://motorrax.com/comparativas",
  },
};

export default function ComparisonsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      <div className="border-b border-slate-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Análisis & Comparativas Técnicas</span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-1">Comparativas BMW Motorrad</h1>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl font-light">
          Evaluaciones imparciales frente a la competencia y entre modelos BMW. Descubre fichas técnicas, potencias, peso y la recomendación ideal para tu estilo de manejo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BMW_COMPARISONS_DATA.map((comp) => (
          <div
            key={comp.slug}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 font-bold text-[10px] uppercase rounded">
                  {comp.category}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {comp.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">{comp.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block">{comp.modelA.name}</span>
                  <span className="text-slate-500 text-[11px] block">{comp.modelA.power} • {comp.modelA.weight}</span>
                  <PriceDisplay amount={comp.modelA.priceMxn} className="text-sm font-bold text-slate-900 mt-1" showDisclaimerNote={false} />
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-800 block">{comp.modelB.name}</span>
                  <span className="text-slate-500 text-[11px] block">{comp.modelB.power} • {comp.modelB.weight}</span>
                  <PriceDisplay amount={comp.modelB.priceMxn} className="text-sm font-bold text-slate-800 mt-1" showDisclaimerNote={false} />
                </div>
              </div>
            </div>

            <Link
              href={`/comparativas/${comp.slug}`}
              className="w-full text-center py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Ver Comparativa Completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
