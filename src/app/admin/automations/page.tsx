"use client";

import React from "react";
import { Workflow, Play, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AutomationsPage() {
  const workflows = [
    {
      name: "Automatización Lead Creado (Formulario Web / Quiz)",
      trigger: "Lead Creado en Sitio Web",
      actions: ["Asignar a Eduardo Ibarra", "Enviar Email Bienvenida vía Resend", "Crear Tarea 'Seguimiento 24h'"],
      status: "Activa",
    },
    {
      name: "Automatización Cita Agendada",
      trigger: "Prueba de Manejo Agendada",
      actions: ["Enviar Recordatorio WhatsApp", "Notificar a Vendedor", "Crear Evento en Calendario"],
      status: "Activa",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Workflow Automation</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Automatizaciones Operativas</h1>
          <p className="text-xs text-slate-500 mt-1">Reglas automáticas disparadas por eventos del sitio web y CRM.</p>
        </div>
      </div>

      <div className="space-y-6">
        {workflows.map((wf, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <Workflow className="w-6 h-6 text-sky-600" />
                <h3 className="text-lg font-bold text-slate-900">{wf.name}</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase rounded-full">
                {wf.status}
              </span>
            </div>

            <div className="text-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Disparador (Trigger):</span>
                <span className="px-2.5 py-1 bg-sky-50 text-sky-800 font-bold rounded">{wf.trigger}</span>
              </div>

              <div className="space-y-1.5 pl-4 border-l-2 border-slate-200">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Acciones Consecuentes:</span>
                {wf.actions.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
