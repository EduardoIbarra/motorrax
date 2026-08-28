import Link from "next/link";
import { ArrowRight, Check, ExternalLink, ShieldCheck } from "lucide-react";

export function AffiliateNotice() {
  return (
    <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950" aria-label="Aviso de afiliación">
      <strong>Transparencia:</strong> esta guía contiene enlaces de afiliado. Si compras mediante ellos, MOTORRAX puede recibir una comisión sin costo adicional para ti. Carpuride es responsable del precio, envío, garantía y soporte del producto.
    </aside>
  );
}

export function BuyButton({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition ${secondary ? "border border-slate-300 bg-white text-slate-900 hover:border-sky-500 hover:text-sky-700" : "bg-sky-600 text-white shadow-lg shadow-sky-900/15 hover:bg-sky-500"}`}
    >
      {children}<ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Migas de pan" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-sky-700">Inicio</Link></li><li aria-hidden="true">/</li>
        <li><Link href="/carpuride" className="hover:text-sky-700">Carpuride para BMW</Link></li><li aria-hidden="true">/</li>
        <li className="font-semibold text-slate-800" aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function FeatureList({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export function CompatibilityWarning() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex gap-4"><ShieldCheck className="h-7 w-7 shrink-0 text-sky-700" aria-hidden="true" /><div>
        <h2 className="text-xl font-black text-slate-950">Comprueba compatibilidad antes de comprar</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">La serie BS requiere una BMW compatible y, normalmente, la base de navegación original. Carpuride confirma modelos como R 1200 GS, R 1250 GS, R 1300 GS y S 1000 XR, pero año y configuración importan. R 1200 RT, R 1250 RT y K 1600 GT/GTL figuran como no compatibles. También existen restricciones con HarmonyOS y algunos teléfonos Android. Envía modelo, año y una foto de la base a <a className="font-bold text-sky-700 underline" href="mailto:service@carpuride.com">service@carpuride.com</a> antes de ordenar.</p>
      </div></div>
    </section>
  );
}

export function RelatedComparisons({ exclude }: { exclude?: string }) {
  const links = [
    { href: "/carpuride/502bs-vs-702bs", label: "W502BS vs W702BS: compacto o máxima pantalla" },
    { href: "/carpuride/602bs-vs-502bs-vs-702bs", label: "W602BS vs W502BS vs W702BS: comparación completa" },
  ].filter((item) => item.href !== exclude);
  return <aside className="rounded-2xl bg-slate-950 p-6 text-white"><h2 className="text-xl font-black">Sigue comparando</h2><div className="mt-4 grid gap-3">{links.map((item) => <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-xl border border-slate-700 p-4 text-sm font-bold hover:border-sky-400 hover:text-sky-300">{item.label}<ArrowRight className="h-4 w-4" /></Link>)}</div></aside>;
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

