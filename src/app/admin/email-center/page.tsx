"use client";

import React from "react";
import { Mail, Send, Eye, MousePointer, Plus } from "lucide-react";

export default function EmailCenterPage() {
  const templates = [
    { name: "Bienvenida & Confirmación de Cotización", subject: "Tu Cotización BMW Motorrad Monterrey está Lista", openRate: "78.4%", ctr: "42.1%" },
    { name: "Confirmación de Cita para Prueba de Manejo", subject: "Tu Cita de Prueba de Manejo con Eduardo Ibarra", openRate: "89.2%", ctr: "64.0%" },
    { name: "Seguimiento a Solicitud de Trade-In", subject: "Avalúo Estimado para tu Motocicleta Actual", openRate: "65.0%", ctr: "31.5%" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Comunicaciones Resend</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Email Center & Plantillas</h1>
          <p className="text-xs text-slate-500 mt-1">Plantillas transaccionales y de seguimiento automatizado integradas con Resend.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-sky-600" />
              <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
            </div>
            <p className="text-xs text-slate-500 italic">"{t.subject}"</p>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Open Rate</span>
                <span className="font-bold text-emerald-600">{t.openRate}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">CTR</span>
                <span className="font-bold text-sky-600">{t.ctr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
