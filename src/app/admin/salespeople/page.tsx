"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { UserCog, Trophy, Award, TrendingUp } from "lucide-react";

export default function SalespeoplePage() {
  const salespeople = [
    {
      name: "Eduardo Ibarra",
      role: "Sales Manager / Especialista Senior",
      leadsAssigned: 42,
      conversionRate: "38.1%",
      salesClosed: 16,
      revenueMxn: 8450000,
      commissionEarnedMxn: 253500,
    },
    {
      name: "Adrian Santos",
      role: "Asesor de Ventas BMW",
      leadsAssigned: 28,
      conversionRate: "25.0%",
      salesClosed: 7,
      revenueMxn: 3480000,
      commissionEarnedMxn: 104400,
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Fuerza de Ventas</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Equipo de Ventas & Leaderboard</h1>
          <p className="text-xs text-slate-500 mt-1">Métricas de desempeño comercial, tasa de conversión y ventas cerradas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {salespeople.map((sp, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{sp.name}</h3>
                <span className="text-xs text-slate-500">{sp.role}</span>
              </div>
              {idx === 0 && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase rounded-full flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  Top Performer
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Tasa de Conversión</span>
                <span className="text-lg font-black text-emerald-600 block">{sp.conversionRate}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Motos Entregadas</span>
                <span className="text-lg font-black text-slate-900 block">{sp.salesClosed} Unidades</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Ingreso Generado</span>
                <PriceDisplay amount={sp.revenueMxn} className="font-bold text-slate-900" showDisclaimerNote={false} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Comisión Acumulada</span>
                <PriceDisplay amount={sp.commissionEarnedMxn} className="font-bold text-emerald-600" showDisclaimerNote={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
