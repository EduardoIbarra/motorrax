import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Tienda — merch y gear de rallies",
  description:
    "Tienda MOTORRAX / NorthBikers: gorras Rally ADV, jerseys, buffs y merch de la comunidad adventure motorcycle.",
  path: "/tienda",
});

export default async function TiendaPage() {
  const products = await getProducts(48);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Gear de la tribu"
        title="Tienda"
        description="Merch oficial de rallies y rodadas. Edición limitada para la comunidad ADV."
      />

      {products.length === 0 ? (
        <p className="rounded-2xl border border-card-border bg-card p-8 text-center text-muted">
          No hay productos activos en este momento.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
