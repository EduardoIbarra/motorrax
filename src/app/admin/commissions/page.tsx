"use client";

import React, { useState } from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { DollarSign, CheckCircle2, Clock, Check } from "lucide-react";

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState([
    {
      id: "comm-1",
      salesperson: "Eduardo Ibarra",
      deal: "BMW R 1300 GS Option 719 - Roberto Garza",
      dealValueMxn: 535000,
      ratePercent: 3.0,
      amountMxn: 16050,
      status: "approved",
    },
    {
      id: "comm-2",
      salesperson: "Eduardo Ibarra",
      deal: "BMW M 1000 XR - Guillermo Zambrano",
      dealValueMxn: 625000,
      ratePercent: 3.0,
      amountMxn: 18750,
      status: "pending",
    },
  ]);

  const approveCommission = (id: string) => {
    setCommissions((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Finanzas Comerciales</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Cálculo & Aprobación de Comisiones</h1>
          <p className="text-xs text-slate-500 mt-1">Cálculo automático del 3.0% por motocicleta entregada y estado de pago.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Vendedor</th>
              <th className="p-4">Venta / Unidad</th>
              <th className="p-4">Monto Venta</th>
              <th className="p-4">Comisión (3%)</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {commissions.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-bold text-slate-900">{c.salesperson}</td>
                <td className="p-4 text-slate-700">{c.deal}</td>
                <td className="p-4">
                  <PriceDisplay amount={c.dealValueMxn} className="text-xs font-bold text-slate-900" showDisclaimerNote={false} />
                </td>
                <td className="p-4">
                  <PriceDisplay amount={c.amountMxn} className="text-xs font-bold text-emerald-600" showDisclaimerNote={false} />
                </td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md ${
                      c.status === "approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {c.status === "approved" ? "Aprobada" : "Pendiente Aprobación"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {c.status === "pending" && (
                    <button
                      onClick={() => approveCommission(c.id)}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-emerald-700 transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Aprobar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
