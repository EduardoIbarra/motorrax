"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { PieChart, Download, FileSpreadsheet, FileText } from "lucide-react";

export default function ReportsPage() {
  const reportsList = [
    { title: "Reporte Mensual de Ventas e Ingresos (Julio 2026)", period: "01/07/2026 - 31/07/2026", type: "Ventas" },
    { title: "Reporte de Eficiencia de Equipo de Ventas", period: "Últimos 30 Días", type: "Vendedores" },
    { title: "Reporte de Retorno de Inversión (ROAS) de Campañas", period: "Q3 2026", type: "Marketing" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Informes de Negocio</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Reportes Ejecutivos</h1>
          <p className="text-xs text-slate-500 mt-1">Generación e impresión de reportes contables, comerciales y de marketing en PDF y Excel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportsList.map((rep, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 bg-slate-100 font-mono text-[10px] rounded font-bold text-slate-600 uppercase">
                {rep.type}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{rep.title}</h3>
              <span className="text-xs text-slate-400 block font-medium">{rep.period}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="py-2 bg-slate-900 text-white font-bold text-[10px] uppercase rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                PDF
              </button>
              <button className="py-2 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Excel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
