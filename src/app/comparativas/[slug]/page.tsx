import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BMW_COMPARISONS_DATA } from "@/lib/data/bmw-comparisons";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { ConversionStickyBar } from "@/components/marketing/ConversionStickyBar";
import { CheckCircle2, Trophy, Zap, ShieldCheck, HelpCircle, ArrowRight, Check, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = BMW_COMPARISONS_DATA.find((c) => c.slug === slug);

  if (!comp) return {};

  return {
    title: `${comp.title} | Comparativa Técnica, Precios y Veredicto 2026`,
    description: comp.seoDescription,
    keywords: comp.keywords,
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
      title: comp.title,
      description: comp.seoDescription,
      url: `https://motorrax.com/comparativas/${comp.slug}`,
      siteName: "MOTORRAX • BMW Motorrad Monterrey",
      type: "article",
      publishedTime: "2026-01-15T00:00:00.000Z",
      authors: ["Eduardo Ibarra"],
      images: [
        {
          url: "/images/motorrax_logo_black.png",
          width: 1200,
          height: 630,
          alt: comp.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: comp.title,
      description: comp.seoDescription,
      images: ["/images/motorrax_logo_black.png"],
    },
    alternates: {
      canonical: `https://motorrax.com/comparativas/${comp.slug}`,
    },
  };
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = BMW_COMPARISONS_DATA.find((c) => c.slug === slug);

  if (!comp) {
    notFound();
  }

  const otherComparisons = BMW_COMPARISONS_DATA.filter((c) => c.slug !== slug);

  // 1. FAQ Schema.org (Google Rich Snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": comp.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
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
        "name": "Comparativas",
        "item": "https://motorrax.com/comparativas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": comp.title,
        "item": `https://motorrax.com/comparativas/${comp.slug}`
      }
    ]
  };

  // 3. TechArticle / Product Comparison Schema.org (For AI & Search Engine Knowledge Graphs)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": comp.title,
    "description": comp.seoDescription,
    "author": {
      "@type": "Person",
      "name": "Eduardo Ibarra",
      "jobTitle": "Especialista Ejecutivo BMW Motorrad Monterrey",
      "url": "https://motorrax.com/conoce-eduardo"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MOTORRAX BMW Motorrad Monterrey",
      "url": "https://motorrax.com"
    },
    "mainEntityOfPage": `https://motorrax.com/comparativas/${comp.slug}`,
    "about": [
      {
        "@type": "Product",
        "name": comp.modelA.name,
        "category": "Motorcycle",
        "offers": {
          "@type": "Offer",
          "price": comp.modelA.priceMxn,
          "priceCurrency": "MXN",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Product",
        "name": comp.modelB.name,
        "category": "Motorcycle",
        "offers": {
          "@type": "Offer",
          "price": comp.modelB.priceMxn,
          "priceCurrency": "MXN"
        }
      }
    ]
  };

  return (
    <article className="space-y-16 pb-28">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <ConversionStickyBar />

      {/* Hero Header */}
      <section className="relative min-h-[55vh] bg-slate-950 flex items-center justify-center overflow-hidden bg-overlay-dark">
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
            <Link href="/comparativas" className="hover:text-white transition-colors">Comparativas</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{comp.category}</span>
          </nav>

          <span className="px-3.5 py-1 bg-sky-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-md inline-block shadow-md">
            {comp.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {comp.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light">{comp.subtitle}</p>

          <div className="pt-4 flex justify-center gap-4">
            <a
              href="#cotizar-comparativa"
              className="px-6 py-3.5 bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-sky-500 transition-colors shadow-lg"
            >
              Solicitar Propuesta Preferencial
            </a>
            <a
              href="#analisis-tecnico"
              className="px-6 py-3.5 bg-white/10 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-colors"
            >
              Ver Ficha Comparativa
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Quick Answer Box (GEO / AI Search Optimized) */}
        <section className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm" aria-label="Resumen para Inteligencia Artificial y Motores de Búsqueda">
          <div className="flex items-center gap-2 text-sky-800 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-sky-600 flex-shrink-0" />
            <span>Veredicto Directo & Resumen Ejecutivo para Compradores</span>
          </div>
          <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed" itemProp="abstract">
            {comp.quickAnswer}
          </p>
        </section>

        {/* Side-by-Side Model Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Model A (BMW) */}
          <div className="bg-white rounded-3xl border-2 border-sky-500 p-8 shadow-xl space-y-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
              Ganador de la Comparativa
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-600 tracking-wider">Opción BMW</span>
                {comp.modelA.slug && (
                  <Link
                    href={`/modelos/${comp.modelA.slug}`}
                    className="text-[11px] font-bold text-sky-600 hover:underline"
                    title={`Ver detalles completos de ${comp.modelA.name}`}
                  >
                    Ver Ficha Técnica →
                  </Link>
                )}
              </div>
              <h2 className="text-2xl font-black text-slate-900">{comp.modelA.name}</h2>
              <p className="text-xs text-slate-500 italic">{comp.modelA.tagline}</p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Potencia</span>
                  <span className="font-extrabold text-slate-900">{comp.modelA.power}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Torque</span>
                  <span className="font-extrabold text-slate-900">{comp.modelA.torque}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Peso</span>
                  <span className="font-extrabold text-slate-900">{comp.modelA.weight}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase text-slate-400">Puntos Clave Destacados:</span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {comp.modelA.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <PriceDisplay amount={comp.modelA.priceMxn} prefix="Precio Sugerido" className="text-3xl font-black text-slate-900" />
            </div>
          </div>

          {/* Model B */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Modelo Competidor</span>
                {comp.modelB.slug && (
                  <Link
                    href={`/modelos/${comp.modelB.slug}`}
                    className="text-[11px] font-bold text-slate-600 hover:underline"
                  >
                    Ver Modelo →
                  </Link>
                )}
              </div>
              <h2 className="text-2xl font-black text-slate-800">{comp.modelB.name}</h2>
              <p className="text-xs text-slate-500 italic">{comp.modelB.tagline}</p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-200 text-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Potencia</span>
                  <span className="font-bold text-slate-800">{comp.modelB.power}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Torque</span>
                  <span className="font-bold text-slate-800">{comp.modelB.torque}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Peso</span>
                  <span className="font-bold text-slate-800">{comp.modelB.weight}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase text-slate-400">Puntos Clave:</span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {comp.modelB.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <PriceDisplay amount={comp.modelB.priceMxn} prefix="Precio Sugerido" className="text-3xl font-black text-slate-700" />
            </div>
          </div>
        </div>

        {/* Technical Spec Comparison Table */}
        <section id="analisis-tecnico" className="scroll-mt-28 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-600" />
            <h2 className="text-2xl font-black text-slate-900">Tabla Comparativa de Especificaciones Técnicas</h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4 w-1/3">Especificación Técnica</th>
                  <th className="p-4 bg-sky-950 text-sky-200">{comp.modelA.name}</th>
                  <th className="p-4">{comp.modelB.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {comp.specComparisonTable.map((item, idx) => (
                  <tr key={idx} className={item.winner === "BMW" ? "bg-sky-50/50" : "hover:bg-slate-50"}>
                    <td className="p-4 font-bold text-slate-800">{item.feature}</td>
                    <td className="p-4 font-extrabold text-sky-900 flex items-center justify-between">
                      <span>{item.bmwValue}</span>
                      {item.winner === "BMW" && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded">
                          Ventaja BMW
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">{item.rivalValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Long-Form Paragraph Analysis */}
        {comp.detailedAnalysis.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Análisis Detallado de Ingeniería y Manejo</h2>
            <div className="space-y-6">
              {comp.detailedAnalysis.map((sec, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{sec.sectionTitle}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">{sec.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verdict Box */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
          <span className="text-xs font-black uppercase tracking-wider text-sky-400">Conclusión & Veredicto Final</span>
          <h3 className="text-3xl font-black text-white">{comp.verdictTitle}</h3>
          <p className="text-base text-slate-300 leading-relaxed font-light">{comp.verdictText}</p>
          <div className="p-4 bg-sky-950/80 rounded-2xl border border-sky-800 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-sky-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-sky-200 font-bold">{comp.recommendation}</p>
          </div>
        </section>

        {/* Frequently Asked Questions (FAQ Section) */}
        {comp.faq.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-600" />
              <h2 className="text-2xl font-black text-slate-900">Preguntas Frecuentes de Compradores en Monterrey</h2>
            </div>
            <div className="space-y-4">
              {comp.faq.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-900">{item.question}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Comparisons (Internal Link SEO Juice) */}
        {otherComparisons.length > 0 && (
          <section className="space-y-6 border-t border-slate-200 pt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                <h2 className="text-xl font-bold text-slate-900">Otras Comparativas Populares de BMW Motorrad</h2>
              </div>
              <Link href="/comparativas" className="text-xs font-bold text-sky-600 hover:underline">
                Ver Todas →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherComparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/comparativas/${c.slug}`}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all space-y-2 group"
                >
                  <span className="text-[10px] font-bold uppercase text-sky-600 block">{c.category}</span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 font-light">{c.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Lead Capture Form */}
        <div id="cotizar-comparativa" className="scroll-mt-28">
          <LeadCaptureForm
            title={`Solicitar Asesoría de Comparativa: ${comp.title}`}
            subtitle="Eduardo Ibarra evaluará tu perfil de manejo y enviará tu cotización preferencial con financiamiento BMW Select."
            defaultModel={comp.modelA.name}
            buttonText="SOLICITAR PROPUESTA PREFERENCIAL"
          />
        </div>
      </div>
    </article>
  );
}
