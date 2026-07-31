import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { MapPin, PhoneCall, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Comprar Moto BMW en Monterrey y San Pedro | Asesoria Eduardo Ibarra",
  description:
    "Adquiere tu motocicleta nueva BMW 2026 en Monterrey y San Pedro Garza García con Eduardo Ibarra. Cotizaciones inmediatas, financiamiento BMW Select, trade-in y atención ejecutiva personalizada.",
  keywords: [
    "Comprar moto BMW Monterrey",
    "Agencia BMW Motorrad San Pedro",
    "BMW Motorrad Monterrey Eduardo Ibarra",
    "Prueba de manejo BMW San Pedro Garza Garcia",
    "Motos BMW 2026 Monterrey",
    "Cotizacion BMW Select Monterrey",
  ],
  alternates: {
    canonical: "https://motorrax.com/landings/comprar-moto-bmw-monterrey",
  },
};

export default function MonterreyLocalLandingPage() {
  const topModels = BMW_MODELS_DATA.slice(0, 6);

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    "name": "BMW Motorrad Monterrey - Asesor Ejecutivo Eduardo Ibarra",
    "description": "Venta de motocicletas BMW nuevas 2026, financiamiento BMW Select, toma a cuenta y pruebas de manejo en Monterrey y San Pedro Garza García.",
    "url": "https://motorrax.com/landings/comprar-moto-bmw-monterrey",
    "telephone": "+528125827777",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Pedro Garza García",
      "addressRegion": "Nuevo León",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.6572,
      "longitude": -100.3664
    }
  };

  return (
    <div className="space-y-16 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-600/30 border border-sky-400/30 rounded-full text-sky-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Monterrey & San Pedro Garza García, NL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl">
            Comprar tu Motocicleta <span className="text-sky-400">BMW 2026</span> en Monterrey
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Asesoría ejecutiva VIP con Eduardo Ibarra. Cotiza directamente los 28 modelos oficiales BMW Motorrad, accede al plan de financiamiento BMW Select y estrena tu moto con atención prioritaria.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
            <a
              href="#cotizar"
              className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl"
            >
              Solicitar Cotización Inmediata
            </a>
            <a
              href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20cotizar%20una%20moto%20BMW%20en%20Monterrey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Directo (+52 81 2582 7777)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Why buy with Eduardo */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              ¿Por qué comprar tu BMW Motorrad con Eduardo Ibarra en Monterrey?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Atención Personalizada en San Pedro</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Asesoría técnica y financiera directa sin intermediarios ni demoras de agencia convencional.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Financiamiento BMW Select</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Planes flexibles con mensualidades bajas, enganche desde 20% y valor futuro garantizado.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Toma de Moto a Cuenta (Trade-in)</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Avaluamos tu motocicleta actual a precio competitivo de mercado para abonarla a tu enganche.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Garantía Oficial de Fábrica</span>
                </div>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  3 años de garantía oficial BMW Motorrad sin límite de kilometraje y asistencia vial nacional.
                </p>
              </div>
            </div>
          </section>

          {/* Top Models Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900">Modelos Más Solicitados en Nuevo León</h2>
              <Link href="/modelos" className="text-xs font-bold text-sky-600 hover:underline">
                Ver los 28 modelos →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topModels.map((m) => (
                <div
                  key={m.slug}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-5 space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider block">
                      {m.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900">{m.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 font-light">{m.tagline}</p>
                    <PriceDisplay amount={m.msrpMxn} className="text-xl font-black text-slate-900 block" showDisclaimerNote={false} />
                  </div>
                  <Link
                    href={`/modelos/${m.slug}`}
                    className="w-full text-center py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Ver Ficha & Cotizar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Lead Form */}
        <div id="cotizar" className="space-y-6 scroll-mt-28">
          <LeadCaptureForm
            title="Cotiza tu BMW en Monterrey"
            subtitle="Recibe propuesta ejecutiva por WhatsApp o correo en menos de 15 minutos."
            buttonText="RECIBIR COTIZACIÓN MONTERREY"
          />
        </div>
      </div>
    </div>
  );
}
