import React from "react";
import Link from "next/link";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";
import { BMWFinderWidget } from "@/components/interactive/BMWFinderWidget";
import { FinancingCalculator } from "@/components/interactive/FinancingCalculator";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { ConversionStickyBar } from "@/components/marketing/ConversionStickyBar";
import { HeroCarousel, HeroModelItem } from "@/components/home/HeroCarousel";
import { siteConfig } from "@/lib/config";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/SocialIcons";
import { ShieldCheck, Award, Zap, ChevronRight, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";
import { db } from "@/db";
import { bmwModels } from "@/db/schema";

export default async function HomePage() {
  let featuredModels: Array<{
    slug: string;
    name: string;
    category: string;
    description: string;
    powerHp: number;
    torqueNm: number;
    unladenWeightKg: number;
    msrpMxn: number;
    heroImage: string;
  }> = [];

  let heroCarouselModels: HeroModelItem[] = [];

  try {
    const dbModels = await db.select().from(bmwModels);
    if (dbModels && dbModels.length > 0) {
      // Pick 3 diverse models dynamically for featured section
      const shuffled = [...dbModels].sort(() => 0.5 - Math.random());
      featuredModels = shuffled.slice(0, 3).map((m) => {
        const staticModel = BMW_MODELS_DATA.find((s) => s.slug === m.slug);
        return {
          slug: m.slug,
          name: m.name,
          category: m.category,
          description: m.descriptionEs,
          powerHp: m.powerHp,
          torqueNm: m.torqueNm,
          unladenWeightKg: m.unladenWeightKg,
          msrpMxn: Number(m.msrpMxn),
          heroImage: m.heroImage || staticModel?.heroImage || "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop",
        };
      });

      // Pick 4 random models for Hero carousel with valid hero images
      const carouselShuffled = [...BMW_MODELS_DATA].sort(() => 0.5 - Math.random()).slice(0, 4);
      heroCarouselModels = carouselShuffled.map((m) => ({
        name: m.name,
        slug: m.slug,
        category: m.category,
        msrpMxn: m.msrpMxn,
        heroImage: m.heroImage,
      }));
    }
  } catch (error) {
    console.error("Failed to query models from database, falling back to static data:", error);
  }

  if (featuredModels.length === 0) {
    featuredModels = BMW_MODELS_DATA.slice(0, 3).map((m) => ({
      slug: m.slug,
      name: m.name,
      category: m.category,
      description: m.description,
      powerHp: m.powerHp,
      torqueNm: m.torqueNm,
      unladenWeightKg: m.unladenWeightKg,
      msrpMxn: m.msrpMxn,
      heroImage: m.heroImage,
    }));
  }

  if (heroCarouselModels.length === 0) {
    const staticCarousel = [...BMW_MODELS_DATA].sort(() => 0.5 - Math.random()).slice(0, 4);
    heroCarouselModels = staticCarousel.map((m) => ({
      name: m.name,
      slug: m.slug,
      category: m.category,
      msrpMxn: m.msrpMxn,
      heroImage: m.heroImage,
    }));
  }

  return (
    <div className="space-y-24 pb-28">
      {/* Conversion Sticky Floating Bar */}
      <ConversionStickyBar />

      {/* Hero Section with 4 Random Models Hero Image Carousel */}
      <HeroCarousel carouselModels={heroCarouselModels} />

      {/* Featured Models Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Catálogo 2026 Monterrey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Precios y Modelos BMW Motorrad</h2>
          </div>
          <Link
            href="/modelos"
            className="mt-4 md:mt-0 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 group transition-all"
          >
            <span>Ver todo el catálogo (28+ Modelos)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredModels.map((model) => (
            <div
              key={model.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-56 bg-slate-950 overflow-hidden">
                <img
                  src={model.heroImage}
                  alt={`${model.name} 2026 BMW Motorrad Monterrey Eduardo Ibarra`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-white/10">
                    {model.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{model.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{model.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Potencia</span>
                    <span className="font-bold text-slate-900">{model.powerHp} HP</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Torque</span>
                    <span className="font-bold text-slate-900">{model.torqueNm} Nm</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Peso</span>
                    <span className="font-bold text-slate-900">{model.unladenWeightKg} kg</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <PriceDisplay amount={model.msrpMxn} prefix="Desde" className="text-2xl font-black text-slate-900" />
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/modelos/${model.slug}`}
                      className="text-center py-2.5 bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      Ver Ficha
                    </Link>
                    <a
                      href="#cotizar-lead-form"
                      className="text-center py-2.5 bg-sky-600 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl hover:bg-sky-700 transition-colors shadow-sm"
                    >
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Call to Action Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-white">¿Buscas otro modelo en particular?</h3>
            <p className="text-xs text-slate-300 font-light">
              Explora nuestra gama de 28 motocicletas BMW Motorrad 2026: Adventure, Roadster, Sport, M Series y Tourer.
            </p>
          </div>
          <Link
            href="/modelos"
            className="whitespace-nowrap px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2"
          >
            <span>Ver Catálogo Completo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Interactive BMW Finder Section */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BMWFinderWidget />
        </div>
      </section>

      {/* Eduardo Ibarra & Lead Intake Form */}
      <section id="cotizar-lead-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative overflow-hidden bg-overlay-dark">


          <div className="space-y-6 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Atención Especializada Monterrey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ¿Por qué comprar tu BMW Motorrad con Eduardo Ibarra?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Con amplia trayectoria representando a BMW Motorrad en Monterrey y San Pedro, Eduardo Ibarra te ofrece un proceso transparente de adquisición: cotización formal en minutos, avalúo de tu moto actual y prueba de manejo personalizada.
            </p>

            <div className="space-y-3 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Atención prioritaria 1 a 1 sin intermediarios</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Mejor avalúo de mercado para tu motocicleta a cuenta</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span>Prioridad en asignación de inventario exclusivo</span>
              </div>
            </div>
          </div>

          <LeadCaptureForm
            title="Solicitar Cotización & Atención Inmediata"
            subtitle="Llena este formulario para recibir tu cotización personalizada en menos de 15 minutos."
            buttonText="ENVIAR DATOS PARA COTIZACIÓN"
          />
        </div>
      </section>

      {/* Financial Calculators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FinancingCalculator />
      </section>

      {/* Social Proof & Community Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Comunidad & Confianza</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Síguenos en Redes Sociales</h2>
          <p className="text-xs text-slate-500 font-light">
            Conoce las entregas oficiales de motocicletas en Monterrey, videos de pruebas de manejo, consejos off-road y la comunidad MOTORRAX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instagram Card */}
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md">
                @_motorrax
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                Instagram Oficial
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Fotos de entregas a clientes, detalles de modelos 2026, historias en showroom y rutas de aventura por Nuevo León.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver Fotos & Historias →</span>
            </div>
          </a>

          {/* YouTube Card */}
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <YoutubeIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-rose-50 text-rose-700 rounded-md">
                @_motorrax
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-rose-600 transition-colors">
                Canal de YouTube
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Reseñas en video de R 1300 GS, F 900 GS y M 1000 XR, pruebas de aceleración y comparativas en carretera.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Ver Videos & Reviews →</span>
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-sky-50 text-sky-700 rounded-md">
                /motorrax
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
                Página de Facebook
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                Novedades de inventario, promociones exclusivas de financiamiento y testimonios de clientes satisfechos.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Visitar Facebook →</span>
            </div>
          </a>
        </div>
      </section>

      {/* SEO FAQ Section & Schema Markup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Resolve tus Dudas</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Preguntas Frecuentes sobre BMW Motorrad Monterrey</h2>
          <p className="text-xs text-slate-500">
            Información clave sobre adquisición, planes de financiamiento BMW Select, garantías y recepción de motocicletas a cuenta con Eduardo Ibarra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Cómo funciona el plan de financiamiento BMW Select en Monterrey?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6 font-light">
              BMW Select te permite adquirir tu motocicleta con enganches desde el 20%, mensualidades reducidas y un Pago Final Garantizado al término del plazo (24 o 36 meses). Al finalizar, puedes renovar por un nuevo modelo, conservar la moto o entregarla.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Reciben motocicletas a cuenta (Trade-In)?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6 font-light">
              Sí. Realizamos avalúos profesionales multimarca (BMW, Honda, Ducati, Yamaha, etc.). El valor estipulado se toma como enganche directo para tu nueva BMW 2026 sin complicaciones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Qué garantía oficial tienen los modelos BMW 2026?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6 font-light">
              Todas las motocicletas BMW Motorrad 2026 incluyen 3 años de garantía oficial sin límite de kilometraje y 3 años de asistencia en el camino (Roadside Assistance) en México, EE. UU. y Canadá.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ¿Cuál es el tiempo de entrega en San Pedro y Monterrey?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed pl-6 font-light">
              Unidades en inventario físico se entregan en menos de 48 a 72 horas hábiles tras la aprobación del crédito o pago de contado. Eduardo Ibarra coordina la entrega personalizada en showroom o a domicilio.
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema.org FAQPage & ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cómo funciona el plan de financiamiento BMW Select en Monterrey?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BMW Select te permite adquirir tu motocicleta con enganches desde el 20%, mensualidades reducidas y un Pago Final Garantizado a 24 o 36 meses."
                }
              },
              {
                "@type": "Question",
                "name": "¿Reciben motocicletas a cuenta (Trade-In)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, realizamos avalúos profesionales de motocicletas a cuenta para aplicarse directamente como enganche de tu nueva BMW 2026."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué garantía oficial tienen los modelos BMW 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3 años de garantía oficial sin límite de kilometraje y 3 años de asistencia vial en México, Estados Unidos y Canadá."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el tiempo de entrega en San Pedro y Monterrey?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Entregas en 48 a 72 horas hábiles para modelos disponibles en inventario."
                }
              }
            ]
          }),
        }}
      />
    </div>
  );
}
