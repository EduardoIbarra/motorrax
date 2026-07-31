import React from "react";
import Link from "next/link";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function ModelsCatalogPage() {
  const categories = Array.from(new Set(BMW_MODELS_DATA.map((m) => m.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      {/* Catalog Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-black uppercase tracking-wider text-sky-600">Catálogo Oficial 2026</span>
        <h1 className="text-4xl font-extrabold text-slate-900">Gama Completa BMW Motorrad México</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-light leading-relaxed">
          Explora los 28+ modelos oficiales disponibles en Monterrey. Desde maxi-trails transcontinentales hasta superdeportivas M de circuito.
        </p>
      </div>

      {/* Models Grid by Category */}
      {categories.map((cat) => {
        const catModels = BMW_MODELS_DATA.filter((m) => m.category === cat);
        return (
          <div key={cat} className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-md">
                {cat}
              </span>
              <span className="text-xs text-slate-400 font-bold">{catModels.length} Modelos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catModels.map((model) => (
                <div
                  key={model.slug}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden bg-overlay-dark">
                      <img
                        src={model.heroImage}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md backdrop-blur-md">
                        {model.powerHp} HP • {model.engineCapacityCc} cc
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                          {model.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 font-light line-clamp-2">{model.tagline}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Potencia</span>
                          <span className="font-bold text-slate-900">{model.powerHp} HP</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Torque</span>
                          <span className="font-bold text-slate-900">{model.torqueNm} Nm</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Peso</span>
                          <span className="font-bold text-slate-900">{model.unladenWeightKg} kg</span>
                        </div>
                      </div>

                      <PriceDisplay amount={model.msrpMxn} prefix="Precio Sugerido" className="text-2xl font-black text-slate-900" showDisclaimerNote={false} />
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/modelos/${model.slug}`}
                      className="w-full text-center py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <span>Ver Ficha & Fotografías</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
