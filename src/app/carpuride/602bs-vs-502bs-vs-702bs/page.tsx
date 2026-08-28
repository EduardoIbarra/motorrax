import type { Metadata } from "next";
import {
  AffiliateNotice,
  Breadcrumbs,
  BuyButton,
  CompatibilityWarning,
  CouponBar,
  CouponOffer,
  JsonLd,
  RelatedComparisons,
} from "@/components/carpuride/CarpurideUI";
import { ComparisonTable } from "@/components/carpuride/ComparisonTable";
import { CARPURIDE_502_702, CARPURIDE_602 } from "@/lib/carpuride";

const url = "https://www.motorrax.com/carpuride/602bs-vs-502bs-vs-702bs";
export const metadata: Metadata = {
  title: "W602BS vs W502BS vs W702BS + 30% OFF",
  description:
    "Compara W602BS vs W502BS y W702BS y ahorra 30% con MOTORRAX. Tamaños 6, 5 y 7 pulgadas, USB-C, Wonder Wheel y cuál comprar.",
  alternates: { canonical: url },
  openGraph: {
    title: "W602BS vs W502BS vs W702BS: comparación completa",
    description:
      "Elige la pantalla Carpuride BS adecuada para tu BMW Motorrad.",
    url,
    type: "article",
    images: [
      {
        url: "https://carpuride.com/cdn/shop/files/w602bs.jpg?v=1776937263",
        width: 1600,
        height: 1600,
        alt: "Carpuride W602BS de 6 pulgadas",
      },
    ],
  },
};
const rows = [
  { feature: "Pantalla", values: ['5" IPS', '6" IPS', '7" IPS'] },
  { feature: "Brillo", values: ["1,000 nits", "1,000 nits", "1,000 nits"] },
  {
    feature: "CarPlay / Android Auto inalámbricos",
    values: ["Sí", "Sí", "Sí"],
  },
  { feature: "BMW Wonder Wheel", values: ["Sí", "Sí", "Sí"] },
  { feature: "Datos de moto / TPMS compatible", values: ["Sí", "Sí", "Sí"] },
  { feature: "IP67", values: ["Sí", "Sí", "Sí"] },
  {
    feature: "USB-C para alimentación externa",
    values: ["No", "Sí (5 V / 3 A)", "No"],
  },
  {
    feature: "Mejor para",
    values: ["Cockpit compacto", "Equilibrio + USB-C", "Máxima lectura"],
  },
];
const faqs = [
  [
    "¿Qué aporta el W602BS frente a W502BS y W702BS?",
    "Una pantalla intermedia de 6 pulgadas y un puerto USB-C para alimentación externa de 5 V / 3 A, útil para calibrar la brújula o hacer ajustes fuera de la base.",
  ],
  [
    "¿Comparten la misma integración BMW?",
    "Sí. Los tres modelos BS publicados admiten Wonder Wheel, datos compatibles de la moto y montaje en la base original de navegación de BMW compatibles.",
  ],
  [
    "¿Cuál recomendamos para la mayoría?",
    "El W602BS es el punto medio más versátil por tamaño y USB-C. Pero el W502BS puede encajar mejor en cockpits pequeños y el W702BS favorece la lectura.",
  ],
];

export default function ThreeWayComparison() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Carpuride W602BS vs W502BS vs W702BS",
        description: metadata.description,
        inLanguage: "es-MX",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "MOTORRAX" },
        dateModified: "2026-08-27",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://www.motorrax.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Carpuride",
            item: "https://www.motorrax.com/carpuride",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Comparación serie BS",
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };
  return (
    <div className="bg-slate-50 pb-24">
      <JsonLd data={jsonLd} />
      <CouponBar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Breadcrumbs current="W602BS vs W502BS vs W702BS" />
        <header className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-widest text-sky-700">
            Los tres Carpuride BS · 30% OFF con MOTORRAX
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
            W602BS vs W502BS vs W702BS: 5, 6 o 7 pulgadas
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            <strong className="text-slate-900">Veredicto rápido:</strong> W502BS
            para el mínimo espacio, W602BS como opción equilibrada con USB-C, y
            W702BS para la mayor superficie de lectura. Usa
            <strong className="text-sky-700"> MOTORRAX para ahorrar 30%.</strong>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton href={CARPURIDE_602}>Comprar W602BS</BuyButton>
            <BuyButton href={CARPURIDE_502_702} secondary>
              Ver W502BS / W702BS
            </BuyButton>
          </div>
        </header>
        <div className="mt-10"><CouponOffer href={CARPURIDE_602} /></div>
        <div className="mt-10">
          <AffiliateNotice />
        </div>
        <section className="mt-16">
          <h2 className="text-3xl font-black">Comparación completa</h2>
          <div className="mt-6">
            <ComparisonTable
              models={["W502BS", "W602BS", "W702BS"]}
              rows={rows}
            />
          </div>
        </section>
        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            {
              size: "5″",
              name: "W502BS",
              title: "Compacto",
              text: "La opción indicada si buscas menor obstrucción visual y una presencia discreta.",
              href: CARPURIDE_502_702,
            },
            {
              size: "6″",
              name: "W602BS",
              title: "Equilibrado + USB-C",
              text: "Tamaño intermedio y alimentación externa USB-C. La opción más flexible para la mayoría.",
              href: CARPURIDE_602,
            },
            {
              size: "7″",
              name: "W702BS",
              title: "Máxima visibilidad",
              text: "Mapas, controles y avisos más grandes para touring, adventure y viajes largos.",
              href: CARPURIDE_502_702,
            },
          ].map((m, i) => (
            <article
              key={m.name}
              className={`rounded-3xl border p-7 ${i === 1 ? "border-sky-400 bg-sky-50 ring-2 ring-sky-100" : "border-slate-200 bg-white"}`}
            >
              <p className="text-5xl font-black text-sky-200">{m.size}</p>
              <h2 className="mt-3 text-2xl font-black">{m.name}</h2>
              <p className="mt-1 text-sm font-bold text-sky-700">{m.title}</p>
              <p className="mt-4 min-h-20 text-sm leading-6 text-slate-600">
                {m.text}
              </p>
              <BuyButton href={m.href}>Comprar {m.name}</BuyButton>
            </article>
          ))}
        </section>
        <section className="mt-16 rounded-3xl bg-slate-950 p-8 text-white">
          <h2 className="text-3xl font-black">
            Por qué el W602BS es diferente
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-slate-300">
            Además de quedar justo entre 5 y 7 pulgadas, incorpora un puerto
            USB-C. Carpuride especifica alimentación externa de 5 V / 3 A, que
            permite encenderlo y calibrar la brújula fuera del soporte BMW. En
            W502BS y W702BS, Carpuride indica que esa calibración externa
            requiere su soporte BM05.
          </p>
          <div className="mt-7">
            <BuyButton href={CARPURIDE_602}>
              Ver precio actual del W602BS
            </BuyButton>
          </div>
        </section>
        <div className="mt-16">
          <CompatibilityWarning />
        </div>
        <section className="mt-16">
          <h2 className="text-3xl font-black">Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {faqs.map(([q, a]) => (
              <details key={q} className="py-5">
                <summary className="cursor-pointer font-black">{q}</summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </section>
        <div className="mt-16">
          <RelatedComparisons exclude="/carpuride/602bs-vs-502bs-vs-702bs" />
        </div>
      </main>
    </div>
  );
}
