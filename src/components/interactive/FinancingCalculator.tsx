"use client";

import React, { useState } from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { Calculator, CheckCircle, HelpCircle } from "lucide-react";

export const FinancingCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(512000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [termMonths, setTermMonths] = useState<number>(36);
  const [annualRatePercent] = useState<number>(14.5);

  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanAmount = vehiclePrice - downPaymentAmount;
  
  // Monthly interest rate calculation
  const monthlyRate = annualRatePercent / 12 / 100;
  const estimatedMonthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Simulador de Financiamiento</h3>
            <p className="text-xs text-slate-500">Calcula tu enganche y pago mensual estimado</p>
          </div>
        </div>

        {/* Vehicle Price */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Precio de la Motocicleta (MXN)
          </label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-600 font-bold text-slate-900"
          />
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Enganche ({downPaymentPercent}%)
            </label>
            <span className="text-xs font-bold text-sky-600">
              ${downPaymentAmount.toLocaleString("es-MX")} MXN
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="70"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>Mínimo 20%</span>
            <span>Máximo 70%</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Plazo de Financiamiento
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[12, 24, 36, 48].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTermMonths(m)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  termMonths === m
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {m} Meses
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Box */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
            Mensualidad Estimada
          </span>
          <PriceDisplay
            amount={Math.round(estimatedMonthlyPayment)}
            className="text-4xl font-black text-slate-900"
          />
        </div>

        <div className="space-y-3 border-t border-b border-slate-200 py-4 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Precio Vehículo:</span>
            <span className="font-bold text-slate-900">${vehiclePrice.toLocaleString("es-MX")} MXN</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Enganche ({downPaymentPercent}%):</span>
            <span className="font-bold text-slate-900">${downPaymentAmount.toLocaleString("es-MX")} MXN</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Monto a Financiar:</span>
            <span className="font-bold text-slate-900">${loanAmount.toLocaleString("es-MX")} MXN</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tasa Anual Estimada:</span>
            <span className="font-bold text-slate-900">{annualRatePercent}% (Sujeta a crédito)</span>
          </div>
        </div>

        <a
          href={`https://wa.me/528125827777?text=Hola%20Eduardo,%20quisiera%20solicitar%20financiamiento%20con%20mensualidad%20de%20$${Math.round(
            estimatedMonthlyPayment
          ).toLocaleString("es-MX")}%20MXN`}
          target="_blank"
          rel="noreferrer"
          className="w-full text-center py-3 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-all shadow-md shadow-sky-600/20"
        >
          Solicitar Pre-Aprobación de Crédito
        </a>
      </div>
    </div>
  );
};
