"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Video, TrendingUp, BarChart2, DollarSign, Eye, ArrowUpRight, Sparkles } from "lucide-react";

export default function ContentAttributionPage() {
  const contentPerformance = [
    {
      type: "YouTube Video",
      title: "Prueba a Fondo: BMW R 1300 GS vs Honda Africa Twin en Carretera a Rayones",
      videoId: "v_r1300gs_rayones",
      views: 45200,
      leads: 38,
      salesClosed: 7,
      revenueMxn: 3584000,
      commissionMxn: 107520,
    },
    {
      type: "YouTube Video",
      title: "¿Vale la pena la BMW M 1000 XR de 201 HP? Análisis Tecnico",
      videoId: "v_m1000xr_review",
      views: 28900,
      leads: 19,
      salesClosed: 3,
      revenueMxn: 1875000,
      commissionMxn: 56250,
    },
    {
      type: "Blog / Guia",
      title: "Guía Completa para Escoger tu primera Maxi-Trail BMW en Monterrey",
      videoId: "blog_guia_maxitrail",
      views: 12400,
      leads: 24,
      salesClosed: 4,
      revenueMxn: 1392000,
      commissionMxn: 41760,
    },
    {
      type: "Google Ads",
      title: "Campaña Search Keyword: 'BMW R1300GS Monterrey Precio'",
      videoId: "campaign_search_r1300gs",
      views: 18600,
      leads: 52,
      salesClosed: 9,
      revenueMxn: 4608000,
      commissionMxn: 138240,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Business Intelligence & Marketing</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Content Intelligence & Atribución de Ventas</h1>
        <p className="text-xs text-slate-500 mt-1">
          Mide el retorno de inversión (ROAS) e ingresos atribuidos a cada video de YouTube, artículo de blog y campaña publicitaria.
        </p>
      </div>

      {/* Top AI Insights Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          AI Content Recommendation Engine
        </div>
        <p className="text-sm font-light text-slate-200">
          "Los videos comparativos de YouTube de entre 8 y 12 minutos generan <span className="font-bold text-white">3.5x más ventas cerradas</span>. La BMW R 1300 GS representa el mayor ingreso proveniente de YouTube este trimestre."
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase block">Ingresos Atribuidos</span>
          <PriceDisplay amount={11459000} className="text-2xl font-black text-slate-900 mt-1" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase block">Total Leads Atribuidos</span>
          <span className="text-3xl font-black text-sky-600 mt-1 block">133 Leads</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase block">Ventas Cerradas</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">23 Motos</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase block">Comisión Generada</span>
          <PriceDisplay amount={343770} className="text-2xl font-black text-slate-900 mt-1" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider">
          Rendimiento por Pieza de Contenido / Canal
        </div>
        <div className="divide-y divide-slate-200 text-xs">
          {contentPerformance.map((item, idx) => (
            <div key={idx} className="p-6 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div className="md:col-span-2 space-y-1">
                <span className="px-2 py-0.5 bg-slate-100 font-mono text-[10px] rounded font-bold text-slate-600">
                  {item.type}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Vistas / Clics</span>
                <span className="font-bold text-slate-800">{item.views.toLocaleString()}</span>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Leads / Ventas</span>
                <span className="font-bold text-slate-800">
                  {item.leads} leads / <span className="text-emerald-600">{item.salesClosed} ventas</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Ingreso Generado</span>
                <PriceDisplay amount={item.revenueMxn} className="text-sm font-bold text-slate-900" showDisclaimerNote={false} />
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Comisión</span>
                <PriceDisplay amount={item.commissionMxn} className="text-sm font-bold text-emerald-600" showDisclaimerNote={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
