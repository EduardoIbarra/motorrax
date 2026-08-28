import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Bike,
  MapPin,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
import { BMW_MODELS_DATA } from "@/lib/data/bmw-models";

export type RegionContent = {
  region: string;
  cities: string[];
  heading: string;
  intro: string;
  url: string;
  whatsappText: string;
};
const intents = [
  {
    icon: BadgeDollarSign,
    title: "Precio y mensualidad",
    text: "Solicita precio vigente, equipamiento, enganche y escenario de mensualidad. Las promociones cambian por modelo y fecha.",
  },
  {
    icon: Bike,
    title: "Inventario y prueba de manejo",
    text: "Pregunta por colores, versiones disponibles, fecha estimada y posibilidad de prueba antes de decidir.",
  },
  {
    icon: RefreshCw,
    title: "Financiamiento y moto a cuenta",
    text: "Compara BMW SELECT, crédito tradicional y avalúo de tu motocicleta actual como parte del enganche.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía y posventa",
    text: "Confirma garantía aplicable, servicios, seguro, accesorios, placas y costos no incluidos en el precio publicado.",
  },
];

export function RegionalBMWPage({ content }: { content: RegionContent }) {
  const models = BMW_MODELS_DATA.slice(0, 6);
  const faqs = [
    [
      `¿Cómo cotizar una BMW Motorrad desde ${content.region}?`,
      `Indica modelo, ciudad, si requieres financiamiento y si tienes moto a cuenta. Recibirás una propuesta y podrás confirmar disponibilidad antes de trasladarte.`,
    ],
    [
      "¿Qué debo comparar además del precio?",
      "Versión, paquetes, accesorios, seguro, comisión, tasa, CAT, pago final, garantía, fecha de entrega y valor de tu moto usada.",
    ],
    [
      "¿Puedo financiar con BMW SELECT?",
      "Depende del modelo participante y aprobación de BMW Financial Services. Solicita una tabla personalizada y revisa enganche, plazo, pago final y opciones al terminar.",
    ],
    [
      "¿Reciben mi moto a cuenta?",
      "Puedes solicitar un avalúo. Marca, modelo, año, kilometraje, historial, condición y documentos influyen en la oferta.",
    ],
    [
      "¿Conviene apartar sin confirmar inventario?",
      "Primero pide por escrito versión, color, precio, equipamiento, condiciones del apartado y fecha estimada de entrega.",
    ],
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: content.heading,
        description: content.intro,
        areaServed: content.cities.map((name) => ({ "@type": "City", name })),
        provider: {
          "@type": "Organization",
          name: "MOTORRAX",
          url: "https://www.motorrax.com",
        },
        url: content.url,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-sky-400">
            <MapPin className="h-4 w-4" />
            {content.cities.join(" · ")}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
            {content.heading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cotizar"
              className="rounded-xl bg-sky-600 px-6 py-4 text-sm font-black hover:bg-sky-500"
            >
              Solicitar precio y mensualidad
            </a>
            <a
              href={`https://wa.me/528125827777?text=${encodeURIComponent(content.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-6 py-4 text-sm font-black hover:bg-emerald-500"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-3xl font-black">
            Lo que debes pedir antes de comprar
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {intents.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <Icon className="h-6 w-6 text-sky-600" />
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <h2 className="text-3xl font-black">
              BMW Motorrad más buscadas en el norte de México
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {models.map((m) => (
                <Link
                  key={m.slug}
                  href={`/modelos/${m.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-500"
                >
                  <p className="text-xs font-black uppercase tracking-wider text-sky-700">
                    {m.category}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{m.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Precio, ficha técnica, equipamiento y cotización.
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-bold text-sky-700">
                    Ver modelo{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div id="cotizar" className="scroll-mt-28">
            <LeadCaptureForm
              title={`Cotiza tu BMW desde ${content.region}`}
              subtitle="Indica modelo, financiamiento y moto a cuenta para preparar una propuesta personalizada."
              buttonText="SOLICITAR PROPUESTA BMW"
            />
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-black">
            Preguntas antes de comprar una BMW Motorrad
          </h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {faqs.map(([q, a]) => (
              <details key={q} className="py-5">
                <summary className="cursor-pointer font-black">{q}</summary>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>
        <aside className="rounded-2xl bg-slate-100 p-5 text-xs leading-5 text-slate-600">
          Precios, promociones, inventario, tasas, CAT, aprobación, garantía y
          tiempos de entrega están sujetos a confirmación. MOTORRAX brinda
          orientación comercial; solicita siempre una cotización formal con
          condiciones vigentes.
        </aside>
      </main>
    </div>
  );
}
