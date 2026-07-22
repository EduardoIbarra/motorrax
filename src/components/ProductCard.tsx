import Image from "next/image";
import type { Product } from "@/types/database";
import { formatPriceMXN } from "@/lib/utils";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const pictures =
    product.pictures_csv
      ?.split(",")
      .map((p) => p.trim())
      .filter(Boolean) ?? [];
  const image = pictures[0] || "/og-default.svg";

  return (
    <article className="group overflow-hidden rounded-2xl border border-card-border bg-card transition hover:border-sand/40">
      <div className="relative aspect-square overflow-hidden bg-background">
        <Image
          src={image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-semibold leading-snug">{product.title}</h3>
        {product.description && (
          <p className="mb-3 line-clamp-2 text-sm text-muted">
            {product.description}
          </p>
        )}
        <p className="text-lg font-bold text-accent">
          {formatPriceMXN(product.price_cents)}
        </p>
      </div>
    </article>
  );
}
