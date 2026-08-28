import type { Metadata } from "next";
import { RegionalBMWPage } from "@/components/marketing/RegionalBMWPage";
const url = "https://www.motorrax.com/bmw-motorrad/coahuila";
export const metadata: Metadata = {
  title: "Comprar BMW Motorrad en Coahuila: cotización y precios",
  description:
    "¿Buscas una BMW Motorrad en Coahuila? Solicita precio, mensualidad, inventario y financiamiento desde Saltillo, Torreón, Ramos Arizpe o Monclova.",
  alternates: { canonical: url },
  keywords: [
    "comprar moto BMW Coahuila",
    "BMW Motorrad Saltillo",
    "BMW Motorrad Torreón precios",
    "BMW R 1300 GS Coahuila",
    "financiamiento moto BMW Saltillo",
  ],
  openGraph: {
    title: "BMW Motorrad en Coahuila: precios y opciones de compra",
    description:
      "Información para compradores de Saltillo, Torreón, Ramos Arizpe y Monclova.",
    url,
    type: "website",
  },
};
export default function Page() {
  return (
    <RegionalBMWPage
      content={{
        region: "Coahuila",
        cities: [
          "Saltillo",
          "Torreón",
          "Ramos Arizpe",
          "Monclova",
          "Piedras Negras",
        ],
        heading: "Comprar una BMW Motorrad desde Coahuila",
        intro:
          "Si estás en Saltillo, Torreón, Ramos Arizpe, Monclova o Piedras Negras, solicita una propuesta antes de trasladarte: modelo, versión, precio, mensualidad, disponibilidad y posible toma de tu moto a cuenta.",
        url,
        whatsappText:
          "Hola Eduardo, quiero cotizar una BMW Motorrad desde Coahuila. Me interesa conocer precio, mensualidad y disponibilidad antes de trasladarme.",
      }}
    />
  );
}
