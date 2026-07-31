import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/SocialIcons";
import { Award, ShieldCheck, Phone, CheckCircle, Star, Sparkles, HelpCircle, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Eduardo Ibarra • Especialista Ejecutivo BMW Motorrad Monterrey & San Pedro",
  description:
    "Conoce a Eduardo Ibarra, especialista oficial en motocicletas BMW Motorrad en Monterrey. Asesoría técnica ejecutiva, financiamiento BMW Select, avalúos de motos a cuenta y pruebas de manejo.",
  keywords: [
    "Eduardo Ibarra BMW",
    "Asesor BMW Motorrad Monterrey",
    "Agencia BMW Motorrad San Pedro",
    "Eduardo Ibarra motocicletas",
    "Contacto Eduardo Ibarra BMW",
    "BMW R1300GS Monterrey Eduardo",
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
    title: "Eduardo Ibarra • Especialista Ejecutivo BMW Motorrad Monterrey",
    description:
      "Asesoría personal directa sin intermediarios. Cotiza tu BMW 2026 con financiamiento BMW Select y avalúo transparente en Monterrey.",
    url: "https://motorrax.com/conoce-eduardo",
    siteName: "MOTORRAX • BMW Motorrad Monterrey",
    type: "profile",
    images: [
      {
        url: "/images/motorrax_logo_black.png",
        width: 1200,
        height: 630,
        alt: "Eduardo Ibarra BMW Motorrad Monterrey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Ibarra • Especialista BMW Motorrad Monterrey",
    description: "Atención ejecutiva 1 a 1 para la adquisición de tu motocicleta BMW en Monterrey.",
    images: ["/images/motorrax_logo_black.png"],
  },
  alternates: {
    canonical: "https://motorrax.com/conoce-eduardo",
  },
};

export default function EduardoPage() {
  // 1. Person Schema.org (Google Knowledge Graph & AI Recognition)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Eduardo Ibarra",
    "jobTitle": "Especialista Ejecutivo BMW Motorrad",
    "worksFor": {
      "@type": "Organization",
      "name": "MOTORRAX BMW Motorrad Monterrey",
      "url": "https://motorrax.com"
    },
    "url": "https://motorrax.com/conoce-eduardo",
    "telephone": "+528125827777",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Pedro Garza García",
      "addressRegion": "Nuevo León",
      "addressCountry": "MX"
    },
    "knowsAbout": [
      "BMW R 1300 GS",
      "BMW F 900 GS",
      "BMW M 1000 XR",
      "BMW S 1000 XR",
      "BMW Financial Services",
      "Financiamiento BMW Select",
      "Avalúo de Motocicletas a Cuenta"
    ]
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
        "name": "Conoce a Eduardo Ibarra",
        "item": "https://motorrax.com/conoce-eduardo"
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
        "name": "¿Cómo puedo contactar directamente a Eduardo Ibarra en Monterrey?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes enviar un mensaje directo de WhatsApp al +52 81 2582 7777 o completar el formulario web para recibir atención ejecutiva en menos de 15 minutos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué servicios ofrece Eduardo Ibarra para compradores de BMW Motorrad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cotizaciones formales personalizadas, trámites de financiamiento BMW Select, avalúos de motocicletas a cuenta (Trade-In), gestión de pruebas de manejo y entregas prioritarias en San Pedro y Monterrey."
        }
      },
      {
        "@type": "Question",
        "name": "¿Eduardo Ibarra realiza entregas de motocicletas a domicilio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. Tras la autorización del crédito o pago de contado, Eduardo Ibarra coordina la entrega personalizada en showroom o transporte cerrado a domicilio en Monterrey y área metropolitana."
        }
      }
    ]
  };

  return (
    <article className="space-y-16 pb-24">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative min-h-[50vh] bg-slate-950 flex items-center justify-center overflow-hidden bg-overlay-dark">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 relative z-10 space-y-4">
          <nav className="text-xs text-slate-400 flex items-center justify-center gap-2 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">Eduardo Ibarra</span>
          </nav>

          <span className="px-3.5 py-1 bg-sky-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-md inline-block shadow-md">
            BMW Motorrad Monterrey & San Pedro
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">Conoce a Eduardo Ibarra</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">
            Especialista ejecutivo en motocicletas BMW de alta cilindrada. Asesoría técnica, financiamiento BMW Select y atención personalizada de primer nivel.
          </p>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* AI Extraction & GEO Facts Box */}
        <section className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm" aria-label="Resumen Profesional Eduardo Ibarra">
          <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs uppercase tracking-wider">
            <UserCheck className="w-5 h-5 text-sky-600 flex-shrink-0" />
            <span>Perfil Profesional — Eduardo Ibarra BMW Motorrad</span>
          </div>
          <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light" itemProp="abstract">
            <strong>Eduardo Ibarra</strong> es el especialista ejecutivo líder en asesoría y ventas de motocicletas <strong>BMW Motorrad</strong> en Monterrey y San Pedro Garza García, Nuevo León. Con una trayectoria contrastada de más de 850 motocicletas entregadas, brinda atención directa sin intermediarios vía WhatsApp al <strong>(81) 2582-7777</strong>, coordinando cotizaciones exprés en menos de 15 minutos, diagnósticos de crédito <strong>BMW Select</strong>, avalúos multimarca a cuenta (Trade-In) y entregas ejecutivas a domicilio.
          </p>
        </section>

        {/* Content Section & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Filosofía de Servicio</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                "Mi compromiso es entregarte no solo una motocicleta, sino la mejor experiencia de libertad, seguridad y servicio."
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Representando la marca BMW Motorrad en Monterrey y San Pedro Garza García, he guiado a cientos de apasionados motociclistas a seleccionar su máquina ideal: desde la mítica R 1300 GS para grandes expediciones hasta la serie M 1000 XR para máximo desempeño en pista y carretera.
              </p>
            </div>

            {/* Authority Pillars */}
            <div className="space-y-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-extrabold text-slate-900 text-sm">Certificación Oficial BMW Motorrad</span>
                  <span className="text-slate-500 font-light">Especialización continua en producto, ergonomía y sistemas electrónicos.</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-extrabold text-slate-900 text-sm">Avalúos Transparentes & Trade-In</span>
                  <span className="text-slate-500 font-light">Recepción de tu motocicleta actual a cuenta al valor de mercado más justo.</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-extrabold text-slate-900 text-sm">Garantía & Asistencia 3 Años</span>
                  <span className="text-slate-500 font-light">Respaldo total oficial BMW sin límite de kilometraje y asistencia vial en México/EE. UU.</span>
                </div>
              </div>
            </div>

            {/* Social Proof Networks */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">Sígueme en Redes Sociales</span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-rose-600" />
                  <span>Instagram @_motorrax</span>
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <YoutubeIcon className="w-4 h-4 text-rose-600" />
                  <span>YouTube Reviews</span>
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <FacebookIcon className="w-4 h-4 text-sky-600" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-900 p-2 rounded-3xl shadow-xl">
            <LeadCaptureForm
              title="Agendar Cita Directa con Eduardo"
              subtitle="Asesoría personalizada 1 a 1 en Showroom San Pedro o videollamada."
              buttonText="CONTACTAR A EDUARDO IBARRA"
            />
          </div>
        </div>

        {/* SEO FAQ Section */}
        <section className="space-y-6 border-t border-slate-200 pt-12">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h2 className="text-2xl font-black text-slate-900">Preguntas Frecuentes sobre Atención con Eduardo Ibarra</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ¿Cómo puedo contactar a Eduardo Ibarra para una cotización?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
                Puedes enviar un WhatsApp al <strong>(81) 2582-7777</strong> o llenar el formulario de contacto para recibir respuesta ejecutiva en menos de 15 minutos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ¿Eduardo Ibarra acepta motocicletas a cuenta?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
                Sí. Realizamos avalúos multimarca directos para abonar el valor fijado al enganche de tu nueva BMW 2026.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ¿Dónde puedo realizar mi prueba de manejo?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
                Eduardo Ibarra agenda tu prueba de manejo en el showroom de San Pedro o en zonas coordinadas de Monterrey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ¿Qué opciones de financiamiento están disponibles?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed pl-6">
                Manejamos planes de BMW Financial Services (BMW Select y Crédito Tradicional) con pre-aprobación rápida en menos de 24 horas.
              </p>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">¿Listo para dar el siguiente paso?</h3>
            <p className="text-xs text-slate-300 font-light">
              Plática directa con Eduardo Ibarra para revisar inventario disponible y planes de financiamiento.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
            <a
              href="https://wa.me/528125827777?text=Hola%20Eduardo,%20quiero%20platicar%20sobre%20un%20BMW%20Motorrad"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
            <Link
              href="/modelos"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Modelos 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

