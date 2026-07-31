"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock, MapPin, User, CheckCircle2 } from "lucide-react";

export default function CalendarPage() {
  const events = [
    {
      id: 1,
      title: "Prueba de Manejo R 1300 GS",
      client: "Carlos Villarreal",
      time: "11:00 AM - 12:00 PM",
      location: "BMW Motorrad Monterrey - Showroom San Pedro",
      status: "Confirmada",
    },
    {
      id: 2,
      title: "Prueba de Manejo M 1000 XR",
      client: "Mauricio Sada",
      time: "03:00 PM - 04:00 PM",
      location: "BMW Motorrad Monterrey - Showroom San Pedro",
      status: "Confirmada",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Agenda & Citas</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Calendario Unificado</h1>
          <p className="text-xs text-slate-500 mt-1">Citas de pruebas de manejo, visitas a showroom y eventos de clientes.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Citas de Hoy</h3>
        <div className="space-y-4">
          {events.map((e) => (
            <div key={e.id} className="p-4 bg-sky-50/50 rounded-xl border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm">{e.title}</span>
                <div className="flex items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {e.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {e.time}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-[10px] uppercase rounded-full self-start sm:self-center">
                {e.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
