import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FinancingCalculator } from "@/components/interactive/FinancingCalculator";
import { Calculator, HelpCircle, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, DollarSign, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulador de Financiamiento BMW Select 2026 | Calculadora de Mensualidades Monterrey",
  description:
    "Calcula el enganche, mensualidad estimada y plan de financiamiento BMW Select para tu motocicleta BMW 2026 en Monterrey. Cotizador oficial con atención personalizada de Eduardo Ibarra.",
  keywords: [
    "Simulador financiamiento BMW Motorrad",
    "Calculadora BMW Select México",
    "Cotizar mensualidad BMW R1300GS",
    "Enganche financiamiento moto BMW Monterrey",
    "BMW Financial Services San Pedro",
    "Pre-aprobación crédito BMW moto",
    "Trade-in moto enganche BMW",
  ],
  authors: [{ name: "Eduardo Ibarra", url: "https://motorrax.com/conoce-eduardo" }],
  publisher: "BMW Motorrad Monterrey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Simulador de Financiamiento BMW Select 2026 | BMW Motorrad Monterrey",
    description:
      "Simula tu mensualidad y enganche con BMW Financial Services. Pre-aprobación rápida de crédito para modelos 2026 con Eduardo Ibarra.",
    url: "https://motorrax.com/herramientas/calculadoras",
    siteName: "MOTORRAX • BMW Motorrad Monterrey",
    type: "website",
    images: [
      {
        url: "/images/motorrax_logo_black.png",
        width: 1200,
        height: 630,
        alt: "Simulador Financiero BMW Motorrad Monterrey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Financiamiento BMW Select 2026",
    description: "Calcula el enganche y mensualidades para tu motocicleta BMW en Monterrey.",
    images: ["/images/motorrax_logo_black.png"],
  },
  alternates: {
    canonical: "https://motorrax.com/herramientas/calculadoras",
  },
};

export default function CalculatorsPage() {
  // 1. FinancialProduct / WebApplication Schema.org
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Simulador de Financiamiento BMW Select",
    "url": "https://motorrax.com/herramientas/calculadoras",
    "description": "Calculadora de planes de financiamiento BMW Select y Crédito Tradicional para motocicletas BMW Motorrad en México.",
    "brand": {
      "@type": "Brand",
      "name": "BMW Financial Services"
    },
    "provider": {
      "@type": "Organization",
      "name": "MOTORRAX BMW Motorrad Monterrey",
      "url": "https://motorrax.com"
    },
    "currency": "MXN",
    "annualPercentageRate": 14.5,
    "feesAndCommissionsSpecification": "Sin comisión por apertura en promociones ejecutivas seleccionadas."
  };

  // 2. BreadcrumbList Schema.org
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://motorrax.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Herramientas",
        "item": "https://motorrax.com/herramientas/calculadoras"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Calculadora Financiera",
        "item": "https://motorrax.com/herramientas/calculadoras"
      }
    ]
  };

  // 3. FAQPage Schema.org
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué diferencia existe entre el plan BMW Select y un crédito bancario tradicional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMW Select ofrece mensualidades hasta un 30% más bajas al diferir un Pago Final Garantizado a 24 o 36 meses. Al terminar el plazo, puedes renovar por una moto nueva, conservar tu moto pagando el saldo o liquidando, o entregarla."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo entregar mi motocicleta actual como enganche del financiamiento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Realizamos avalúos multimarca directos en Monterrey. El valor acordado de tu moto se abona como enganche inicial para reducir tu monto financiado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son los requisitos básicos para la pre-aprobación del crédito BMW en Monterrey?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Identificación oficial (INE/Pasaporte), comprobante de domicilio reciente y estados de cuenta bancarios de los últimos 3 meses (o recibos de nómina)."
        }
      }
    ]
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header & Breadcrumb */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <nav className="text-xs text-slate-400 flex items-center justify-center gap-2">
          <Link href="/" className="hover:text-slate-900 transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">Herramientas</span>
          <span>/</span>
          <span className="text-sky-600 font-semibold">Simulador de Financiamiento</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          BMW Financial Services 2026
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Simulador de <span className="text-sky-600">Financiamiento BMW</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
          Simula el enganche, plazo y mensualidad de tu nueva motocicleta BMW Motorrad. Diseñado para ofrecerte transparencia financiera completa con atención directa de Eduardo Ibarra en Monterrey.
        </p>
      </div>

      {/* Interactive Calculator Widget */}
      <FinancingCalculator />

      {/* AI Extraction & GEO Facts Box */}
      <section className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm" aria-label="Condiciones Financieras BMW Select">
        <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs uppercase tracking-wider">
          <DollarSign className="w-5 h-5 text-sky-600 flex-shrink-0" />
          <span>Resumen de Esquemas Financieros BMW Financial Services</span>
        </div>
        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light" itemProp="abstract">
          El plan <strong>BMW Select</strong> en México permite adquirir motocicletas de la gama 2026 (como la R 1300 GS, F 900 GS o M 1000 XR) mediante enganches iniciales desde el 20% hasta el 50%, plazos flexibles de 24, 36 o 48 meses y un Pago Final Garantizado al término del contrato. Incluye seguro de cobertura amplia integrado y opción de recepción de motocicletas seminuevas como enganche directo (Trade-In).
        </p>
      </section>

      {/* Educational Guide Section */}
      <section className="space-y-8 border-t border-slate-200 pt-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Planes Financieros</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            ¿Por qué elegir BMW Select para tu próxima motocicleta?
          </h2>
          <p className="text-xs text-slate-500 font-light">
            Ventajas competitivas del esquema financiero insignia de BMW Financial Services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Mensualidades Reducidas</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Al diferir un porcentaje del costo total para el término del contrato (Pago Final Garantizado), tus pagos mensuales disminuyen sustancialmente comparados con un crédito tradicional.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Renovación Constante</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Al finalizar los 24 o 36 meses, puedes entregar la moto como pago y estrenar la versión más reciente del modelo sin descapitalizarte.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Protección de Valor</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              BMW garantiza contractualmente el Valor Final Anual de tu unidad, blindando tu inversión frente a variaciones del mercado de seminuevos.
            </p>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="space-y-6 border-t border-slate-200 pt-12">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <h2 className="text-2xl font-black text-slate-900">Preguntas Frecuentes de Financiamiento en Monterrey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Qué enganche mínimo se solicita para autorizar el crédito?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              El enganche mínimo estándar es del 20% del valor total de la motocicleta, pudiendo incrementarse para reducir la mensualidad deseada.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Aceptan mi motocicleta actual como parte del enganche?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Sí. En BMW Motorrad Monterrey valuamos tu motocicleta actual y aplicamos el saldo de la toma directamente a tu enganche.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Cuánto tiempo tarda la pre-aprobación del crédito?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Con la documentación completa (INE, comprobante de domicilio e ingresos), Eduardo Ibarra gestiona el dictamen en menos de 24 horas hábiles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Qué opciones tengo al cumplir el plazo del plan BMW Select?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Puedes: 1) Estrenar un nuevo modelo entregando la moto actual, 2) Conservar la moto pagando o refinanciando el valor residual, o 3) Devolver la unidad a la agencia.
            </p>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">¿Listo para pre-aprobar tu crédito BMW?</h3>
          <p className="text-xs text-slate-300 font-light">
            Eduardo Ibarra te brinda asesoría personalizada sin compromiso para estructurar la corrida financiera a tu medida.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
          <a
            href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20cotizar%20un%20financiamiento%20BMW%20Select"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Cotizar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/herramientas/finder"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>BMW Finder (IA)</span>
          </Link>
        </div>
      </section>
    </article>
  );
}

