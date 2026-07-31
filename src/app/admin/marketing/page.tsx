"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Megaphone, TrendingUp, DollarSign, Target, Plus } from "lucide-react";

export default function MarketingPage() {
  const campaignsList = [
    {
      name: "Google Search - BMW R1300GS Monterrey",
      channel: "Google Ads",
      budgetMxn: 45000,
      spendMxn: 32000,
      leads: 68,
      revenueMxn: 3584000,
      roas: "112x",
    },
    {
      name: "Meta Video Ads - Launch M1000XR",
      channel: "Meta Ads",
      budgetMxn: 25000,
      spendMxn: 18500,
      leads: 34,
      revenueMxn: 1875000,
      roas: "101x",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Growth & Publicidad</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Campañas Marketing & ROI</h1>
          <p className="text-xs text-slate-500 mt-1">Rendimiento de presupuesto publicitario en Google Ads, Meta Ads y Orgánico.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Campaña</th>
              <th className="p-4">Canal</th>
              <th className="p-4">Inversión Actual</th>
              <th className="p-4">Leads Generados</th>
              <th className="p-4">Ingreso Atribuido</th>
              <th className="p-4">ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {campaignsList.map((c, idx) => (
              <tr key={idx}>
                <td className="p-4 font-bold text-slate-900">{c.name}</td>
                <td className="p-4 text-slate-600">{c.channel}</td>
                <td className="p-4">
                  <PriceDisplay amount={c.spendMxn} className="text-xs font-bold text-slate-900" showDisclaimerNote={false} />
                </td>
                <td className="p-4 font-bold text-sky-600">{c.leads} Leads</td>
                <td className="p-4">
                  <PriceDisplay amount={c.revenueMxn} className="text-xs font-bold text-emerald-600" showDisclaimerNote={false} />
                </td>
                <td className="p-4 font-black text-slate-900 text-sm">{c.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
