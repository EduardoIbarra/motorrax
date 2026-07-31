import React from "react";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { CheckCircle2, ShieldCheck, Zap, Sparkles, Award } from "lucide-react";

export default function R1300GSLandingPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Luxury Hero */}
      <section className="relative min-h-[75vh] bg-slate-950 flex items-center justify-center overflow-hidden bg-overlay-dark">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 relative z-10 space-y-6">
          <span className="px-4 py-1.5 bg-sky-600/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-full inline-flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            Oferta Especial Google Ads • BMW Monterrey
          </span>
          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-none">
            Nueva BMW R 1300 GS 2026
          </h1>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            145 HP, 149 Nm de torque y control adaptativo de altura. Entrega prioritaria en Monterrey con Eduardo Ibarra.
          </p>

          <div className="pt-4">
            <PriceDisplay amount={512000} prefix="Precio Especial de Lanzamiento" className="text-4xl font-black text-white" />
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">¿Por qué elegir la R 1300 GS?</span>
            <h2 className="text-3xl font-extrabold text-slate-900">La referencia mundial indiscutible de la aventura.</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              La nueva R 1300 GS reduce 12 kg respecto al modelo anterior mientras incrementa la potencia a 145 hp y 149 Nm. Equipa faro matricial LED, suspensión electro-hidráulica DSA y radar de crucero activo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-sky-600 font-bold block text-sm mb-1">Garantía BMW 3 Años</span>
              <span className="text-slate-500 font-normal">Sin límite de kilometraje e impreso en factura</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <span className="text-sky-600 font-bold block text-sm mb-1">Planes Select Financial</span>
              <span className="text-slate-500 font-normal">Enganches desde 20% y mensualidades bajas</span>
            </div>
          </div>
        </div>

        <div>
          <LeadCaptureForm
            title="Solicitar Cotización Preferencial R 1300 GS"
            subtitle="Recibe atención inmediata y bono exclusivo de equipamiento."
            defaultModel="BMW R 1300 GS"
            buttonText="Obtener Cotización Preferencial"
          />
        </div>
      </div>
    </div>
  );
}
