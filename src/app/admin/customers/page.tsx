"use client";

import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { UserCheck, ShieldCheck, Bike, FileText, Calendar, Plus, ChevronRight } from "lucide-react";

export default function CustomersPage() {
  const customerList = [
    {
      id: "cust-1",
      name: "Roberto Garza Sada",
      email: "roberto.garza@ejemplo.com",
      phone: "81 9988 7766",
      ownedMotorcycles: ["BMW R 1300 GS Option 719"],
      warrantyValidUntil: "2029-07-15",
      totalSpentMxn: 535000,
      referralsCount: 2,
    },
    {
      id: "cust-2",
      name: "Guillermo Zambrano",
      email: "memo.zambrano@ejemplo.com",
      phone: "81 5544 3322",
      ownedMotorcycles: ["BMW M 1000 XR Competition"],
      warrantyValidUntil: "2029-05-10",
      totalSpentMxn: 625000,
      referralsCount: 4,
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Base de Propietarios</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Clientes & Customer Ownership</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gestión de clientes con entrega realizada, historial de garantías, mantenimientos y programa de referidos.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customerList.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                <span className="text-xs text-slate-500">{c.phone} • {c.email}</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Garantía Activa
              </span>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Motocicletas Adquiridas</span>
                <span className="font-bold text-slate-900">{c.ownedMotorcycles.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Vigencia de Garantía</span>
                <span className="font-bold text-slate-900">{c.warrantyValidUntil}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Referidos Exitosos</span>
                <span className="font-bold text-sky-600">{c.referralsCount} Clientes</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Inversión Total Acumulada</span>
                <PriceDisplay amount={c.totalSpentMxn} className="font-bold text-slate-900" showDisclaimerNote={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
