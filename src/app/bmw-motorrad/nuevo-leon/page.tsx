import type { Metadata } from "next";
import { RegionalBMWPage } from "@/components/marketing/RegionalBMWPage";
const url = "https://www.motorrax.com/bmw-motorrad/nuevo-leon";
export const metadata: Metadata = {
  title: "Comprar BMW Motorrad en Nuevo León: precios y cotización",
  description:
    "Cotiza una BMW Motorrad en Nuevo León: precios, mensualidades, BMW SELECT, inventario, prueba de manejo y moto a cuenta en Monterrey y San Pedro.",
  alternates: { canonical: url },
  keywords: [
    "comprar moto BMW Nuevo León",
    "BMW Motorrad Monterrey precios",
    "BMW Motorrad San Pedro",
    "cotizar BMW R 1300 GS Monterrey",
    "financiamiento moto BMW Nuevo León",
  ],
  openGraph: {
    title: "BMW Motorrad en Nuevo León: guía de compra y cotización",
    description:
      "Compara precio, mensualidad, inventario y financiamiento antes de comprar.",
    url,
    type: "website",
  },
};
export default function Page() {
  return (
    <RegionalBMWPage
      content={{
        region: "Nuevo León",
        cities: [
          "Monterrey",
          "San Pedro Garza García",
          "Santa Catarina",
          "San Nicolás",
          "Guadalupe",
          "Apodaca",
        ],
        heading: "Comprar una BMW Motorrad en Monterrey y Nuevo León",
        intro:
          "Compara modelos, precio vigente, mensualidad, inventario, BMW SELECT, prueba de manejo y toma de tu moto a cuenta con atención directa de Eduardo Ibarra.",
        url,
        whatsappText:
          "Hola Eduardo, quiero cotizar una BMW Motorrad desde Nuevo León. Me interesa conocer precio, mensualidad e inventario.",
      }}
    />
  );
}
