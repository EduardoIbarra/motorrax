"use client";

import React, { useState } from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Users, Filter, Plus, Phone, Calendar, ArrowRight, Flame, Zap, Snowflake } from "lucide-react";

export default function CRMKanbanPage() {
  const [pipeline, setPipeline] = useState([
    {
      id: "lead-101",
      customerName: "Carlos Villarreal",
      phone: "81 1234 5678",
      desiredModel: "BMW R 1300 GS Option 719",
      budgetMxn: 535000,
      score: 92,
      scoreLabel: "hot",
      stage: "scheduled",
      source: "YouTube Comparison Video",
      utmCampaign: "google_search_r1300gs",
    },
    {
      id: "lead-102",
      customerName: "Mauricio Sada",
      phone: "81 8765 4321",
      desiredModel: "BMW M 1000 XR",
      budgetMxn: 625000,
      score: 88,
      scoreLabel: "hot",
      stage: "test_ride",
      source: "BMW Finder Quiz",
      utmCampaign: "meta_ads_m1000xr",
    },
    {
      id: "lead-103",
      customerName: "Bernardo Garza",
      phone: "81 4567 8901",
      desiredModel: "BMW F 900 GS",
      budgetMxn: 348000,
      score: 65,
      scoreLabel: "warm",
      stage: "new",
      source: "Landing Page Form",
      utmCampaign: "organic_google",
    },
    {
      id: "lead-104",
      customerName: "Alejandro Treviño",
      phone: "81 3344 5566",
      desiredModel: "BMW S 1000 XR",
      budgetMxn: 455000,
      score: 40,
      scoreLabel: "cold",
      stage: "contacted",
      source: "Referral Program",
      utmCampaign: "referral_link",
    },
  ]);

  const stages = [
    { key: "new", title: "Nuevo Lead", color: "bg-slate-100 border-slate-300 text-slate-800" },
    { key: "contacted", title: "Contactado", color: "bg-sky-50 border-sky-200 text-sky-800" },
    { key: "scheduled", title: "Cita Agendada", color: "bg-purple-50 border-purple-200 text-purple-800" },
    { key: "test_ride", title: "Prueba de Manejo", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { key: "negotiation", title: "Negociación", color: "bg-amber-50 border-amber-200 text-amber-800" },
  ];

  const moveStage = (id: string, newStage: string) => {
    setPipeline((prev) => prev.map((item) => (item.id === id ? { ...item, stage: newStage } : item)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Sales Operations</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">CRM & Pipeline Kanban MOTORRAX</h1>
          <p className="text-xs text-slate-500 mt-1">Gestiona prospectos, lead scores y oportunidades de venta en tiempo real.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
            Total Oportunidades: <span className="text-slate-900 font-extrabold">{pipeline.length}</span>
          </div>
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {stages.map((stage) => {
          const stageLeads = pipeline.filter((l) => l.stage === stage.key);
          return (
            <div key={stage.key} className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200 space-y-4 min-w-[240px]">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">{stage.title}</h3>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <div key={lead.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{lead.customerName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                          lead.scoreLabel === "hot"
                            ? "bg-rose-100 text-rose-800"
                            : lead.scoreLabel === "warm"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {lead.scoreLabel === "hot" ? (
                          <Flame className="w-3 h-3 text-rose-600" />
                        ) : lead.scoreLabel === "warm" ? (
                          <Zap className="w-3 h-3 text-amber-600" />
                        ) : (
                          <Snowflake className="w-3 h-3 text-sky-600" />
                        )}
                        Score: {lead.score}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div className="font-semibold text-slate-800">{lead.desiredModel}</div>
                      <div className="text-slate-400">Fuente: {lead.source}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <PriceDisplay amount={lead.budgetMxn} className="text-sm font-bold text-slate-900" showDisclaimerNote={false} />
                      <div className="flex items-center gap-1">
                        {stage.key !== "negotiation" && (
                          <button
                            onClick={() => {
                              const nextIdx = stages.findIndex((s) => s.key === stage.key) + 1;
                              if (nextIdx < stages.length) moveStage(lead.id, stages[nextIdx].key);
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500"
                            title="Avanzar etapa"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
