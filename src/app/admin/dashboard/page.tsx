"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import {
  Users,
  Kanban,
  Calendar,
  CheckSquare,
  DollarSign,
  TrendingUp,
  Award,
  Bike,
  Megaphone,
  ArrowUpRight,
  Sparkles,
  Flame,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const metricCards = [
    {
      title: "Leads Totales (Este Mes)",
      value: "148",
      change: "+24% vs mes anterior",
      icon: Users,
      color: "text-sky-600 bg-sky-50",
    },
    {
      title: "Leads Calificados (Hot 🔥)",
      value: "42",
      change: "28.3% tasa de calificación",
      icon: Flame,
      color: "text-rose-600 bg-rose-50",
    },
    {
      title: "Pruebas de Manejo Hoy",
      value: "6",
      change: "4 confirmadas en showroom",
      icon: Calendar,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Ingresos por Ventas (Mes)",
      value: 8450000,
      isPrice: true,
      change: "16 motocicletas entregadas",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  const recentActivity = [
    {
      user: "Carlos Villarreal",
      action: "Cotizó BMW R 1300 GS Option 719",
      time: "Hace 12 min",
      type: "lead",
      source: "YouTube Review",
    },
    {
      user: "Eduardo Ibarra",
      action: "Avanzó oportunidad de Mauricio Sada a 'Prueba de Manejo'",
      time: "Hace 35 min",
      type: "pipeline",
      source: "CRM Kanban",
    },
    {
      user: "Roberto Garza Sada",
      action: "Completó Checklist Digital de Entrega de R 1300 GS",
      time: "Hace 2 horas",
      type: "delivery",
      source: "Post-Venta",
    },
    {
      user: "Bernardo Garza",
      action: "Solicitó Pre-Aprobación de Crédito BMW Select",
      time: "Hace 3 horas",
      type: "financing",
      source: "Landing F900GS",
    },
  ];

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Executive Control Center</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Dashboard General SaaS</h1>
          <p className="text-xs text-slate-500 mt-1">
            Resumen operativo en tiempo real de leads, pipeline de ventas, citas e ingresos de BMW Monterrey.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/crm"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Ver Pipeline Kanban
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{card.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {card.isPrice ? (
                <PriceDisplay amount={Number(card.value)} className="text-3xl font-black text-slate-900" showDisclaimerNote={false} />
              ) : (
                <span className="text-3xl font-black text-slate-900 block">{card.value}</span>
              )}

              <span className="text-[11px] font-semibold text-emerald-600 block">{card.change}</span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Pipeline Summary & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Embudo de Ventas & Oportunidades</h3>
              <p className="text-xs text-slate-500">Distribución de leads activos por etapa de conversión</p>
            </div>
            <Link href="/admin/crm" className="text-xs font-bold text-sky-600 hover:text-sky-700">
              Ir al Kanban →
            </Link>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>1. Nuevos Leads (34)</span>
                <span>$18,450,000 MXN</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>2. Calificados & Cita Agendada (18)</span>
                <span>$9,800,000 MXN</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[60%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>3. Prueba de Manejo Realizada (12)</span>
                <span>$6,450,000 MXN</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>4. Negociación & Cierre (8)</span>
                <span>$4,280,000 MXN</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[30%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Feed de Actividad en Vivo</h3>
            <p className="text-xs text-slate-500">Acciones del sitio web y vendedores</p>
          </div>

          <div className="space-y-4 text-xs">
            {recentActivity.map((act, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{act.user}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{act.time}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{act.action}</p>
                <span className="inline-block px-2 py-0.5 bg-slate-200 text-slate-700 font-mono text-[9px] rounded font-bold">
                  {act.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
