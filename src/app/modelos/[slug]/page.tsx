import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { ConversionStickyBar } from "@/components/marketing/ConversionStickyBar";
import { CheckCircle2, XCircle, ShieldCheck, Download, Calendar, Sparkles, FileText, Camera, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = BMW_MODELS_DATA.find((m) => m.slug === slug);

  if (!model) return {};

  return {
    title: `${model.name} 2026 en Monterrey | Precio, Ficha Técnica y Cotización`,
    description: `Cotiza la nueva ${model.name} 2026 en Monterrey con Eduardo Ibarra. ${model.powerHp} HP, ${model.torqueNm} Nm. Precio desde $${model.msrpMxn.toLocaleString("es-MX")} MXN*. Ficha técnica completa, fotos oficiales y prueba de manejo.`,
    keywords: [
      `${model.name} Monterrey`,
      `Precio ${model.name} Mexico`,
      `Ficha tecnica ${model.name}`,
      `BMW Motorrad ${model.slug}`,
      `Prueba de manejo ${model.name}`,
      `Financiamiento BMW Select ${model.name}`,
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
      title: `${model.name} 2026 | Ficha Técnica y Precio en Monterrey`,
      description: model.tagline || model.description,
      url: `https://motorrax.com/modelos/${model.slug}`,
      siteName: "MOTORRAX • BMW Motorrad Monterrey",
      type: "website",
      images: [
        {
          url: model.heroImage || "/images/motorrax_logo_black.png",
          width: 1200,
          height: 630,
          alt: `${model.name} 2026 BMW Motorrad Monterrey`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${model.name} 2026 | BMW Motorrad Monterrey`,
      description: `Cotiza la ${model.name} con Eduardo Ibarra en Monterrey.`,
      images: [model.heroImage || "/images/motorrax_logo_black.png"],
    },
    alternates: {
      canonical: `https://motorrax.com/modelos/${model.slug}`,
    },
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = BMW_MODELS_DATA.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const relatedModels = BMW_MODELS_DATA.filter((m) => m.slug !== model.slug).slice(0, 3);

  // 1. Product Schema.org (Google Shopping & Rich Results)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": model.name,
    "image": model.heroImage,
    "description": model.description,
    "category": model.category,
    "sku": model.slug,
    "brand": {
      "@type": "Brand",
      "name": "BMW Motorrad"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://motorrax.com/modelos/${model.slug}`,
      "priceCurrency": "MXN",
      "price": model.msrpMxn,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "MOTORRAX BMW Motorrad Monterrey"
      }
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
        "name": "Modelos BMW",
        "item": "https://motorrax.com/modelos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": model.name,
        "item": `https://motorrax.com/modelos/${model.slug}`
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
        "name": `¿Cuál es el precio de lista oficial de la ${model.name} 2026 en Monterrey?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `El precio base sugerido de lista para la ${model.name} 2026 es de $${model.msrpMxn.toLocaleString("es-MX")} MXN. Consulta paquetes y versiones especiales con Eduardo Ibarra.`
        }
      },
      {
        "@type": "Question",
        "name": `¿Cuáles son las especificaciones técnicas principales de la ${model.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Motor de ${model.engineCapacityCc} cc con una potencia de ${model.powerHp} HP, torque máximo de ${model.torqueNm} Nm y altura de asiento de ${model.seatHeightMm} mm.`
        }
      },
      {
        "@type": "Question",
        "name": `¿Qué garantía incluye la ${model.name} en México?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Incluye 3 años de garantía oficial de fábrica sin límite de kilometraje y 3 años de asistencia vial en carretera."
        }
      }
    ]
  };

  return (
    <article className="space-y-16 pb-28">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ConversionStickyBar />

      {/* Hero Banner with Official Photo */}
      <section className="relative min-h-[70vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        {model.heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: `url('${model.heroImage}')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 relative z-10 space-y-4">
          <nav className="text-xs text-slate-400 flex items-center justify-center gap-2 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/modelos" className="hover:text-white transition-colors">Modelos</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{model.name}</span>
          </nav>

          <span className="px-3.5 py-1 bg-sky-600 text-white text-xs font-black uppercase tracking-wider rounded-md inline-block shadow-md">
            BMW Motorrad {model.category}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">{model.name}</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light">{model.tagline}</p>

          <div className="pt-2">
            <PriceDisplay
              amount={model.msrpMxn}
              prefix="Precio Base Sugerido"
              className="text-4xl font-black text-white"
            />
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <a
              href="#form-cotizar"
              className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl"
            >
              Solicitar Cotización de {model.name}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Specs, Photo Gallery, Ficha Tecnica Table, Pros/Cons, Colors */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Visión General del Modelo</h2>
            <p className="text-slate-600 text-sm leading-relaxed font-light">{model.description}</p>
          </div>

          {/* AI Extraction & GEO Facts Box */}
          <section className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm" aria-label="Resumen Técnico para Motores de Búsqueda e IA">
            <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0" />
              <span>Resumen Ejecutivo Técnico — {model.name} 2026</span>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light" itemProp="abstract">
              La <strong>{model.name}</strong> es una motocicleta del segmento <strong>{model.category}</strong> equipada con motor de {model.engineCapacityCc} cc, que genera {model.powerHp} HP de potencia y {model.torqueNm} Nm de torque. Cuenta con una altura de asiento de {model.seatHeightMm} mm y un peso en orden de marcha de {model.unladenWeightKg} kg. Su precio oficial de lista en México inicia desde ${model.msrpMxn.toLocaleString("es-MX")} MXN e incluye 3 años de garantía oficial BMW sin límite de kilometraje.
            </p>
          </section>

          {/* Official Photo Gallery */}
          {model.galleryImages && model.galleryImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-sky-600" />
                <h2 className="text-2xl font-bold text-slate-900">Galería de Fotografías Oficiales</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {model.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm group bg-slate-950 bg-overlay-dark"
                  >
                    <img
                      src={imgUrl}
                      alt={`${model.name} 2026 BMW Motorrad Monterrey vista ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold">{model.name} — Fotografía Oficial</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Specs Cards */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Especificaciones Rápidas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-400 font-bold uppercase block">Cilindrada</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{model.engineCapacityCc} cc</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-400 font-bold uppercase block">Potencia</span>
                <span className="text-2xl font-black text-sky-600 mt-1 block">{model.powerHp} HP</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-400 font-bold uppercase block">Torque</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{model.torqueNm} Nm</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-400 font-bold uppercase block">Altura Asiento</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{model.seatHeightMm} mm</span>
              </div>
            </div>
          </div>

          {/* Complete Ficha Técnica Data Table */}
          {model.specs && model.specs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <h2 className="text-2xl font-bold text-slate-900">Ficha Técnica Oficial BMW</h2>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-1/3">Categoría / Especificación</th>
                      <th className="p-4">Detalle Oficial</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {model.specs.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4 text-slate-500 font-bold">
                          <span className="text-[10px] uppercase font-bold text-sky-600 block">{s.category}</span>
                          <span className="text-slate-800">{s.key}</span>
                        </td>
                        <td className="p-4 font-semibold text-slate-900">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 space-y-3">
              <h3 className="text-sm font-bold uppercase text-emerald-800 tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ventajas Destacadas
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {model.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-200 space-y-3">
              <h3 className="text-sm font-bold uppercase text-amber-800 tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-amber-600" />
                Consideraciones
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {model.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Colors */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Colores Disponibles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {model.colors.map((c, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border border-slate-300 shadow-inner flex-shrink-0"
                    style={{ backgroundColor: c.hex }}
                  ></div>
                  <span className="text-xs font-bold text-slate-800">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SEO FAQ Section */}
          <section className="space-y-6 border-t border-slate-200 pt-8">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <h2 className="text-2xl font-bold text-slate-900">Preguntas Frecuentes sobre la {model.name}</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900">¿Cuál es el precio de lista de la {model.name} 2026 en Monterrey?</h3>
                <p className="text-xs text-slate-600 font-light">
                  El precio sugerido de lista parte desde ${model.msrpMxn.toLocaleString("es-MX")} MXN. Eduardo Ibarra te puede cotizar paquetes de equipamiento especial.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900">¿Se puede adquirir la {model.name} con financiamiento BMW Select?</h3>
                <p className="text-xs text-slate-600 font-light">
                  Sí, el plan BMW Select aplica con enganches desde el 20% y mensualidades diferidas a 24 o 36 meses con Pago Final Garantizado.
                </p>
              </div>
            </div>
          </section>

          {/* Related Models Section (Internal Link SEO Juice) */}
          {relatedModels.length > 0 && (
            <section className="space-y-6 border-t border-slate-200 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-sky-600" />
                  <h2 className="text-xl font-bold text-slate-900">Otros Modelos BMW Relacionados</h2>
                </div>
                <Link href="/modelos" className="text-xs font-bold text-sky-600 hover:underline">
                  Ver Todos →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedModels.map((rm) => (
                  <Link
                    key={rm.slug}
                    href={`/modelos/${rm.slug}`}
                    className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all space-y-2 group"
                  >
                    <span className="text-[10px] font-bold uppercase text-sky-600 block">{rm.category}</span>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {rm.name}
                    </h3>
                    <PriceDisplay amount={rm.msrpMxn} className="text-xs font-bold text-slate-900 block" showDisclaimerNote={false} />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: High-Conversion Lead Form */}
        <div id="form-cotizar" className="space-y-6 scroll-mt-28">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Cotización Inmediata</span>
            <PriceDisplay amount={model.msrpMxn} prefix="Precio de Lista" className="text-3xl font-black text-white" />
            <p className="text-xs text-slate-400">
              *Precios sujetos a disponibilidad y cambios sin previo aviso. Incluye garantía oficial BMW Motorrad por 3 años sin límite de kilometraje.
            </p>
          </div>

          <LeadCaptureForm
            title={`Cotizar ${model.name}`}
            subtitle="Recibe atención prioritaria de Eduardo Ibarra con propuesta personalizada."
            defaultModel={model.name}
            buttonText={`RECIBIR COTIZACIÓN DE ${model.name.toUpperCase()}`}
          />
        </div>
      </div>
    </article>
  );
}

