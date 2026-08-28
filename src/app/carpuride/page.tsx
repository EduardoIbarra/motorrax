import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Smartphone, Sun, Waves } from "lucide-react";
import { AffiliateNotice, BuyButton, CompatibilityWarning, FeatureList, JsonLd } from "@/components/carpuride/CarpurideUI";
import { CARPURIDE_COLLECTION, CARPURIDE_502_702, CARPURIDE_602, carpurideModels, commonFeatures } from "@/lib/carpuride";

const url = "https://www.motorrax.com/carpuride";
export const metadata: Metadata = {
  title: "Carpuride para BMW Motorrad: W502BS, W602BS y W702BS",
  description: "Guía en español de Carpuride W502BS, W602BS y W702BS para BMW: CarPlay, Android Auto, Wonder Wheel, compatibilidad y qué pantalla elegir.",
  alternates: { canonical: url },
  openGraph: { title: "Carpuride BS para BMW Motorrad: guía y comparación", description: "Compara W502BS, W602BS y W702BS antes de comprar.", url, type: "article", images: [{ url: "https://carpuride.com/cdn/shop/files/Carpuride_W702BS.jpg?v=1747392353", width: 1600, height: 1600, alt: "Carpuride W702BS para BMW Motorrad" }] },
  twitter: { card: "summary_large_image", title: "Carpuride para BMW Motorrad", description: "W502BS, W602BS y W702BS comparados en español.", images: ["https://carpuride.com/cdn/shop/files/Carpuride_W702BS.jpg?v=1747392353"] },
};

const faqs = [
  ["¿Qué Carpuride funciona con el Wonder Wheel de BMW?", "Los W502BS, W602BS y W702BS están diseñados para usar el Multi-Controller o Wonder Wheel en BMW compatibles con la base de navegación original."],
  ["¿Cuál es la diferencia principal entre W502BS, W602BS y W702BS?", "El tamaño: 5, 6 y 7 pulgadas. El W602BS añade además un puerto USB-C de alimentación, útil para ajustes y calibración fuera de la base BMW."],
  ["¿Necesito TPMS de fábrica?", "La pantalla puede mostrar presión si la moto ya tiene un sistema TPMS compatible. Sin TPMS instalado, esa lectura no estará disponible."],
  ["¿Funcionan sin cables?", "CarPlay y Android Auto se conectan de forma inalámbrica. En una BMW compatible, la unidad obtiene alimentación al colocarse en la base original de navegación."],
];

export default function CarpuridePage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", headline: "Carpuride para BMW Motorrad: W502BS, W602BS y W702BS", description: metadata.description, inLanguage: "es-MX", mainEntityOfPage: url, author: { "@type": "Organization", name: "MOTORRAX" }, publisher: { "@type": "Organization", name: "MOTORRAX", url: "https://www.motorrax.com" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.motorrax.com" }, { "@type": "ListItem", position: 2, name: "Carpuride para BMW", item: url }] },
    { "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ] };
  return <div className="bg-slate-50 pb-24"><JsonLd data={jsonLd} />
    <section className="overflow-hidden bg-slate-950 text-white"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"><div>
      <p className="text-sm font-black uppercase tracking-[.2em] text-sky-400">Guía independiente para BMW Motorrad</p>
      <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">Carpuride W502BS, W602BS y W702BS: ¿cuál elegir?</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Añade CarPlay o Android Auto inalámbrico a una BMW compatible, conserva el control con el Wonder Wheel y consulta datos de la moto. Te explicamos qué cambia entre 5, 6 y 7 pulgadas.</p>
      <div className="mt-8 flex flex-wrap gap-3"><BuyButton href={CARPURIDE_COLLECTION}>Ver serie BS en Carpuride</BuyButton><Link href="#comparar" className="inline-flex min-h-12 items-center rounded-xl border border-slate-600 px-5 py-3 text-sm font-bold hover:border-sky-400">Comparar modelos</Link></div>
    </div><div className="relative aspect-square rounded-3xl bg-white/5 p-4"><Image src="https://carpuride.com/cdn/shop/files/Carpuride_W702BS.jpg?v=1747392353" alt="Pantalla Carpuride W702BS con CarPlay para BMW Motorrad" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="rounded-2xl object-contain" /></div></div></section>
    <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8"><AffiliateNotice />
      <section aria-labelledby="que-es"><h2 id="que-es" className="text-3xl font-black text-slate-950">Qué ofrece la serie Carpuride BS</h2><p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">Es una familia de pantallas portátiles creada para ciertas BMW Motorrad. No reemplaza el teléfono: proyecta de forma inalámbrica las interfaces de Apple CarPlay o Android Auto para usar mapas, música, llamadas y voz. Su ventaja frente a una pantalla universal es la integración con el mando original BMW y los datos de la motocicleta.</p><div className="mt-8"><FeatureList items={commonFeatures} /></div></section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[Smartphone,"CarPlay + Android Auto","Conexión inalámbrica"],[Gauge,"Wonder Wheel","Control desde el manillar"],[Sun,"1,000 nits","IPS legible al sol"],[Waves,"IP67","Protección contra agua y polvo"]].map(([Icon,title,text]) => { const I = Icon as typeof Smartphone; return <div key={String(title)} className="rounded-2xl border border-slate-200 bg-white p-5"><I className="h-6 w-6 text-sky-600"/><h3 className="mt-4 font-black">{String(title)}</h3><p className="mt-1 text-sm text-slate-500">{String(text)}</p></div>})}</section>
      <section id="comparar" className="scroll-mt-28"><div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-widest text-sky-700">Decisión rápida</p><h2 className="mt-2 text-3xl font-black">Tres tamaños, una misma integración BMW</h2></div><div className="mt-8 grid gap-6 lg:grid-cols-3">{carpurideModels.map((model, index) => <article key={model.shortName} className={`rounded-3xl border bg-white p-6 shadow-sm ${index === 1 ? "border-sky-500 ring-2 ring-sky-100" : "border-slate-200"}`}><p className="text-5xl font-black text-slate-200">{model.screen}</p><h3 className="mt-3 text-2xl font-black">{model.name}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">{model.bestFor}</p>{index === 1 && <span className="mt-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-800">Punto medio + USB-C</span>}<div className="mt-6"><BuyButton href={model.productUrl}>Comprar {model.shortName}</BuyButton></div></article>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2"><Link href="/carpuride/502bs-vs-702bs" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 font-bold hover:border-sky-500">Comparar W502BS vs W702BS <ArrowRight className="h-5 w-5" /></Link><Link href="/carpuride/602bs-vs-502bs-vs-702bs" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 font-bold hover:border-sky-500">Comparar los tres modelos <ArrowRight className="h-5 w-5" /></Link></div></section>
      <CompatibilityWarning />
      <section><h2 className="text-3xl font-black">Preguntas frecuentes</h2><div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">{faqs.map(([q,a]) => <details key={q} className="group py-5"><summary className="cursor-pointer list-none font-black text-slate-900">{q}</summary><p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">{a}</p></details>)}</div></section>
      <section className="rounded-3xl bg-sky-700 p-8 text-white sm:p-12"><h2 className="text-3xl font-black">¿Listo para equipar tu BMW?</h2><p className="mt-3 max-w-2xl text-sky-100">Verifica primero la compatibilidad de tu moto y teléfono; después elige el tamaño que mejor encaje en tu campo visual.</p><div className="mt-7 flex flex-wrap gap-3"><BuyButton href={CARPURIDE_502_702}>Comprar W502BS o W702BS</BuyButton><BuyButton href={CARPURIDE_602} secondary>Comprar W602BS</BuyButton></div></section>
    </main></div>;
}

