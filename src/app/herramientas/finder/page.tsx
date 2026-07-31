import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BMWFinderWidget } from "@/components/interactive/BMWFinderWidget";
import { Sparkles, HelpCircle, CheckCircle2, ShieldCheck, Compass, ArrowRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "BMW Finder Quiz Interactivo | Encuentra tu Motocicleta BMW Ideal 2026",
  description:
    "Recomendador inteligente de motocicletas BMW Motorrad en México. Responde 5 preguntas sobre tu estatura, presupuesto, nivel de manejo y terreno para descubrir tu BMW perfecta con asesoría de Eduardo Ibarra.",
  keywords: [
    "BMW Finder",
    "Quiz recomendador de motos BMW",
    "Encontrar mi BMW ideal",
    "Qué motocicleta BMW comprar",
    "BMW R1300GS vs F900GS recomendación",
    "Motos BMW para principiantes México",
    "Motos BMW según estatura",
    "BMW Motorrad Monterrey",
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
    title: "BMW Finder Quiz Interactivo | Encuentra tu Motocicleta BMW Ideal",
    description:
      "Descubre la motocicleta BMW Motorrad que mejor se adecúa a tu presupuesto, estatura y tipo de uso. Algoritmo de recomendación con atención ejecutiva de Eduardo Ibarra.",
    url: "https://motorrax.com/herramientas/finder",
    siteName: "MOTORRAX • BMW Motorrad Monterrey",
    type: "website",
    images: [
      {
        url: "/images/motorrax_logo_black.png",
        width: 1200,
        height: 630,
        alt: "BMW Finder Quiz Interactivo MOTORRAX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW Finder Quiz Interactivo | Encuentra tu BMW Ideal",
    description: "Algoritmo interactivo de recomendación de motocicletas BMW Motorrad 2026.",
    images: ["/images/motorrax_logo_black.png"],
  },
  alternates: {
    canonical: "https://motorrax.com/herramientas/finder",
  },
};

export default function FinderPage() {
  // 1. WebApplication Schema.org (Google & AI Tool Recognition)
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BMW Finder Interactive Quiz",
    "url": "https://motorrax.com/herramientas/finder",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Algoritmo interactivo de recomendación de motocicletas BMW Motorrad según presupuesto, estatura, experiencia y estilo de manejo.",
    "author": {
      "@type": "Person",
      "name": "Eduardo Ibarra",
      "jobTitle": "Asesor Ejecutivo BMW Motorrad Monterrey"
    },
    "provider": {
      "@type": "Organization",
      "name": "MOTORRAX BMW Motorrad Monterrey",
      "url": "https://motorrax.com"
    }
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
        "item": "https://motorrax.com/herramientas/finder"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "BMW Finder Quiz",
        "item": "https://motorrax.com/herramientas/finder"
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
        "name": "¿Cómo recomienda el BMW Finder la motocicleta ideal para mi estatura?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El algoritmo analiza la altura de asiento (mm) de cada modelo BMW (desde 785 mm en F 800 GS hasta 890 mm en Rallye specs) y sugiere modelos con control adaptativo de altura (Adaptive Vehicle Height Control) o kits de suspensión baja de fábrica."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué motocicletas BMW son ideales para principiantes o primerizos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para pilotos principiantes o en transición a cilindradas intermedias, recomendamos la serie G 310 GS / G 310 R y la nueva F 800 GS debido a su entrega suave de potencia, bajo peso y altura de asiento accesible."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo solicitar una prueba de manejo de la motocicleta sugerida en Monterrey?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Al obtener tu resultado en el quiz, puedes agendar directamente tu prueba de manejo y recibir una propuesta de financiamiento BMW Select personalizada por Eduardo Ibarra."
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
          <span className="text-sky-600 font-semibold">BMW Finder Quiz</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Recomendador Interactivo IA 2026
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Encuentra tu Motocicleta <span className="text-sky-600">BMW Ideal</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
          Responde 5 preguntas clave sobre tu estatura, presupuesto, tipo de terreno y experiencia. Nuestro algoritmo inteligente evaluará los 28+ modelos BMW Motorrad para sugerirte la moto con mejor compatibilidad.
        </p>
      </div>

      {/* Interactive Widget Core */}
      <BMWFinderWidget />

      {/* AI Extraction & GEO Facts Box */}
      <section className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm" aria-label="Resumen de Criterios de Selección BMW">
        <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs uppercase tracking-wider">
          <Compass className="w-5 h-5 text-sky-600 flex-shrink-0" />
          <span>Criterios Técnicos de Selección BMW Motorrad</span>
        </div>
        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light" itemProp="abstract">
          El recomendador BMW Finder analiza parámetros técnicos oficiales de la gama BMW Motorrad México: altura de asiento (de 785 mm a 890 mm), relación peso-potencia, modos de manejo (Pro, Enduro, Dynamic), capacidad de carga para pasajeros y presupuesto en MXN. Entre los modelos evaluados destacan la <strong>R 1300 GS</strong> (Adventure touring insignia con 145 HP), <strong>F 900 GS</strong> (Enduro ligero 105 HP), <strong>M 1000 XR</strong> (High-performance crossover 201 HP) y <strong>S 1000 XR</strong> (Sport Touring).
        </p>
      </section>

      {/* Educational Guide Section for SEO & Buyers */}
      <section className="space-y-8 border-t border-slate-200 pt-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Guía de Compra 2026</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Factores Clave para Elegir tu Motocicleta BMW
          </h2>
          <p className="text-xs text-slate-500 font-light">
            Aspectos esenciales recomendados por Eduardo Ibarra antes de tomar una decisión de adquisición.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Estatura y Ergonomía</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              La altura al suelo es determinante para el apoyo firme de ambos pies. Modelos como la nueva R 1300 GS incorporan el sistema de ajuste automático de altura al detenerse.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Uso Principal & Terreno</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Define si tu prioridad es la agilidad urbana en Monterrey, rutas de larga distancia por autopista (Touring) o expediciones off-road de fin de semana (Adventure).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">Financiamiento BMW Select</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Calcula tu presupuesto proyectado. El plan BMW Select te brinda la posibilidad de pagar enganches bajos, mensualidades cómodas y renovar tu moto cada 24 o 36 meses.
            </p>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="space-y-6 border-t border-slate-200 pt-12">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <h2 className="text-2xl font-black text-slate-900">Preguntas Frecuentes sobre el recomendador BMW</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Cómo recomienda el BMW Finder la moto según mi estatura?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              El algoritmo analiza la altura de asiento (mm) de cada modelo BMW (de 785 mm a 890 mm) y sugiere opciones con suspensión adaptativa o asientos bajos ajustables.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Qué motocicletas BMW se recomiendan para principiantes?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Recomendamos las series G 310 GS / G 310 R y F 800 GS debido a su bajo peso, excelente maniobrabilidad urbana y entrega de potencia progresiva.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Puedo agendar una prueba de manejo de la moto recomendada?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Sí. Al finalizar la prueba, puedes enviar tu resultado directo a Eduardo Ibarra para agendar tu prueba de manejo en Monterrey o San Pedro.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿El resultado incluye propuesta de financiamiento?
            </h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
              Sí, los modelos recomendados muestran su precio oficial de lista y enlace directo para simular tu enganche y mensualidades en BMW Select.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Navigation Links Bar */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">¿Quieres explorar todo el catálogo de motocicletas?</h3>
          <p className="text-xs text-slate-300 font-light">
            Consulta la gama completa de 28 modelos BMW Motorrad 2026 con precios y fichas técnicas oficiales.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
          <Link
            href="/modelos"
            className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Ver Catálogo 2026</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/herramientas/calculadoras"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Simulador Financiero</span>
          </Link>
        </div>
      </section>
    </article>
  );
}

