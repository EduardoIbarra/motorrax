"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Eye, MousePointer } from "lucide-react";

export default function AnalyticsPage() {
  const topPages = [
    { title: "Landing BMW R 1300 GS Especial", path: "/landings/r1300gs", views: "18,600", conversionRate: "4.2%" },
    { title: "BMW Finder Quiz Interactivo", path: "/herramientas/finder", views: "14,200", conversionRate: "8.5%" },
    { title: "Simulador de Financiamiento", path: "/herramientas/calculadoras", views: "9,800", conversionRate: "5.1%" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Tráfico & Conversiones</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Analítica Digital</h1>
          <p className="text-xs text-slate-500 mt-1">Páginas más visitadas, tasas de conversión y rendimiento del embudo digital.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider">
          Páginas de Mayor Conversión
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {topPages.map((p, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{p.title}</span>
                <span className="font-mono text-[10px] text-slate-400">{p.path}</span>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Vistas</span>
                  <span className="font-bold text-slate-900">{p.views}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[10px] block font-bold">Tasa Conversión</span>
                  <span className="font-bold text-emerald-600">{p.conversionRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
