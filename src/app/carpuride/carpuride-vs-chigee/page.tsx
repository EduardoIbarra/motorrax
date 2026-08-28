import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Check, HelpCircle } from "lucide-react";
import {
  AffiliateNotice,
  BuyButton,
  CouponBar,
  CouponOffer,
  JsonLd,
} from "@/components/carpuride/CarpurideUI";
import { ComparisonTable } from "@/components/carpuride/ComparisonTable";
import { CARPURIDE_COLLECTION } from "@/lib/carpuride";

const url = "https://www.motorrax.com/carpuride/carpuride-vs-chigee";
export const metadata: Metadata = {
  title: "Carpuride vs CHIGEE para BMW: cuál comprar en 2026",
  description:
    "Comparación Carpuride vs CHIGEE (también buscado Chingee): Wonder Wheel, pantalla, cámaras, GPS, audio, conexión y precio. Cupón MOTORRAX 30%.",
  alternates: { canonical: url },
  keywords: [
    "Carpuride vs Chigee",
    "Carpuride o Chigee",
    "Chingee vs Carpuride",
    "mejor CarPlay para moto BMW",
    "CarPlay BMW Wonder Wheel",
  ],
  openGraph: {
    title: "Carpuride vs CHIGEE: comparación honesta para BMW",
    description:
      "Resolvemos las preguntas que los motociclistas hacen antes de comprar.",
    url,
    type: "article",
  },
};

const rows = [
  {
    feature: "Enfoque",
    values: [
      "Más tamaños y relación funciones/precio",
      "Acabado premium y ecosistema propio",
    ],
  },
  {
    feature: "BMW Wonder Wheel",
    values: [
      "Serie BS en BMW compatibles",
      "AIO-5 Play for BMW; otros requieren adaptador compatible",
    ],
  },
  {
    feature: "Tamaños BMW comparados",
    values: [
      "5, 6 y 7 pulgadas",
      "Depende del modelo; AIO-5 Play es 5 pulgadas",
    ],
  },
  {
    feature: "CarPlay / Android Auto",
    values: ["Inalámbricos", "Inalámbricos"],
  },
  {
    feature: "Cámaras",
    values: [
      "No en W502BS/W602BS/W702BS",
      "No en AIO-5 Play; otros CHIGEE sí pueden incluirlas",
    ],
  },
  {
    feature: "GPS independiente",
    values: [
      "No: usa mapas y datos del teléfono",
      "No en AIO-5 Play: proyecta el teléfono",
    ],
  },
  {
    feature: "Protección publicada",
    values: ["IP67 en serie BS", "IP68 en AIO-5 Play for BMW"],
  },
  {
    feature: "Razón habitual para elegir",
    values: [
      "Pantalla grande o menor costo",
      "Construcción, software o cámaras en otros modelos",
    ],
  },
];

const faqs = [
  [
    "¿Qué es mejor, Carpuride o CHIGEE?",
    "Carpuride suele convenir si priorizas precio, tamaños de 5 a 7 pulgadas y funciones de audio. CHIGEE atrae a quien prioriza acabado, software y, en modelos compatibles, cámaras. La mejor elección depende de tu BMW, montaje y uso.",
  ],
  [
    "¿Chingee y CHIGEE son la misma marca?",
    "Sí. “Chingee” es una búsqueda y escritura común, pero el nombre correcto de la marca es CHIGEE.",
  ],
  [
    "¿Funcionan con el Wonder Wheel de BMW?",
    "No todos los modelos. Carpuride requiere un modelo BS compatible; CHIGEE ofrece el AIO-5 Play for BMW y soluciones con adaptador según modelo. Verifica año, base original y lista oficial.",
  ],
  [
    "¿Carpuride o CHIGEE tienen GPS sin teléfono?",
    "Los modelos CarPlay/Android Auto proyectan aplicaciones del teléfono; no deben confundirse con un navegador GPS autónomo. Puedes descargar mapas offline en aplicaciones compatibles del móvil.",
  ],
  [
    "¿Se calienta o descarga el teléfono con CarPlay inalámbrico?",
    "CarPlay/Android Auto inalámbrico consume batería y puede generar calor según teléfono, señal, clima y carga. En viajes largos conviene probar la configuración y mantener el teléfono ventilado o conectado a energía.",
  ],
  [
    "¿Puedo escuchar mapas y música en Sena o Cardo?",
    "Sí, pero revisa la ruta Bluetooth recomendada por cada fabricante. La forma de emparejar teléfono, pantalla e intercomunicador afecta volumen, llamadas y estabilidad.",
  ],
  [
    "¿Cuál es mejor para manejar de noche?",
    "Compara brillo mínimo y ajuste automático, no solo nits máximos. Algunos usuarios consideran importante que la pantalla pueda atenuarse lo suficiente en carretera oscura.",
  ],
  [
    "¿Una pantalla de 5, 6 o 7 pulgadas?",
    "Cinco pulgadas preserva el campo visual; seis equilibra tamaño y lectura; siete hace mapas y botones más visibles, pero puede cubrir parte del tablero en ciertos cockpits.",
  ],
];

export default function CarpurideVsChigeePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Carpuride vs CHIGEE para BMW",
        description: metadata.description,
        dateModified: "2026-08-27",
        inLanguage: "es-MX",
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "MOTORRAX" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
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
            name: "Carpuride vs CHIGEE",
            item: url,
          },
        ],
      },
    ],
  };
  return (
    <div className="bg-slate-50 pb-24">
      <JsonLd data={jsonLd} />
      <CouponBar />
      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-widest text-sky-700">
            Guía de compra actualizada en agosto de 2026
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-6xl">
            Carpuride vs CHIGEE: ¿cuál CarPlay conviene para tu BMW?
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Analizamos lo que compradores preguntan antes de elegir: Wonder
            Wheel, tamaño real, cámaras, conexión, audio con Sena o Cardo, uso
            nocturno, batería del teléfono y calidad. Si escribiste{" "}
            <strong>“Chingee”</strong>, la marca correcta es CHIGEE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BuyButton href={CARPURIDE_COLLECTION}>
              Ver Carpuride con 30% OFF
            </BuyButton>
            <Link
              href="#comparacion"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black hover:border-sky-500"
            >
              Ir a la comparación
            </Link>
          </div>
        </header>
        <AffiliateNotice />
        <CouponOffer href={CARPURIDE_COLLECTION} />
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-700" />
            <div>
              <h2 className="font-black text-amber-950">
                Comparación independiente, no prueba de laboratorio
              </h2>
              <p className="mt-2 text-sm leading-6 text-amber-900">
                Esta guía sintetiza fichas oficiales y temas recurrentes en
                comunidades de propietarios. Las experiencias individuales sobre
                conexión o durabilidad no prueban el rendimiento de todas las
                unidades. Confirma siempre compatibilidad, devoluciones y
                garantía con el fabricante.
              </p>
            </div>
          </div>
        </section>
        <section id="comparacion" className="scroll-mt-28">
          <h2 className="text-3xl font-black">
            Carpuride vs CHIGEE de un vistazo
          </h2>
          <div className="mt-6">
            <ComparisonTable
              models={["Carpuride BS", "CHIGEE para BMW"]}
              rows={rows}
            />
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-black">
            Qué preguntarte antes de comprar
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              [
                "¿Cabe sin tapar mi TFT?",
                "Recorta una plantilla de 5, 6 o 7 pulgadas y colócala en el cockpit antes de ordenar.",
              ],
              [
                "¿Mi BMW tiene Nav Prep?",
                "Confirma base original, Wonder Wheel, año y modelo. Una BMW con rueda no garantiza por sí sola compatibilidad.",
              ],
              [
                "¿Necesito cámaras?",
                "Si la respuesta es no, evita pagar por hardware que no usarás. Si es sí, compara grabación, sensores y montaje.",
              ],
              [
                "¿Cómo escucharé el audio?",
                "Define si teléfono, pantalla o intercom será el centro Bluetooth y revisa compatibilidad con Sena, Cardo u otro casco.",
              ],
              [
                "¿Viajo sin señal?",
                "Descarga mapas offline en el teléfono. Estas pantallas no convierten CarPlay en un GPS autónomo.",
              ],
              [
                "¿Uso guantes y conduzco de noche?",
                "Evalúa tamaño de botones, sensibilidad con guantes, brillo automático y atenuación mínima.",
              ],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <HelpCircle className="h-5 w-5 text-sky-600" />
                <h3 className="mt-3 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-black">Por qué elegir Carpuride</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Tres tamaños BS para BMW: 5, 6 y 7 pulgadas",
              "W602BS con alimentación USB-C externa",
              "Wonder Wheel y datos de moto en BMW compatibles",
              "Bluetooth dual e intercomunicador publicados",
              "Menor barrera de precio en muchas comparaciones",
              "Cupón MOTORRAX con 30% de descuento",
            ].map((x) => (
              <li
                key={x}
                className="flex gap-3 rounded-xl bg-white p-4 text-sm"
              >
                <Check className="h-5 w-5 shrink-0 text-emerald-600" />
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <BuyButton href={CARPURIDE_COLLECTION}>
              Comprar Carpuride · 30% OFF
            </BuyButton>
          </div>
        </section>
        <section>
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
        <aside className="text-xs leading-5 text-slate-500">
          <strong>Fuentes consultadas:</strong> fichas y soporte oficial de
          Carpuride y CHIGEE, documentación BMW y conversaciones públicas de
          propietarios en BMW MOA, BMWMOTOS y comunidades BMW Motorrad.
          Investigación editorial: 27 de agosto de 2026.
        </aside>
      </main>
    </div>
  );
}
