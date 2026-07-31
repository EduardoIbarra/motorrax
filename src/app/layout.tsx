import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://motorrax.com"),
  title: {
    default: "BMW Motorrad Monterrey | Eduardo Ibarra • Motocicletas, Cotizaciones y Financiamiento",
    template: "%s | MOTORRAX BMW Motorrad Monterrey",
  },
  description:
    "Adquiere tu motocicleta BMW 2026 en Monterrey con Eduardo Ibarra. Cotizaciones inmediatas de R 1300 GS, F 900 GS, M 1000 XR, S 1000 XR. Financiamiento BMW Select, trade-in y pruebas de manejo.",
  keywords: [
    "BMW Motorrad Monterrey",
    "Eduardo Ibarra BMW",
    "BMW R1300GS Monterrey",
    "BMW F900GS precio Mexico",
    "Motocicletas BMW Monterrey",
    "Financiamiento BMW Motorrad",
    "Prueba de manejo BMW Monterrey",
    "Agencia BMW Motorrad San Pedro",
    "Trade in moto Monterrey",
    "MOTORRAX BMW",
  ],
  authors: [{ name: "Eduardo Ibarra", url: "https://motorrax.com/conoce-eduardo" }],
  creator: "MOTORRAX SaaS Platform",
  publisher: "BMW Motorrad Monterrey",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BMW Motorrad Monterrey | Eduardo Ibarra • Motocicletas 2026",
    description:
      "Asesoría ejecutiva personalizada en Monterrey. Descubre la nueva R 1300 GS, solicita tu financiamiento y agenda tu prueba de manejo hoy.",
    url: "https://motorrax.com",
    siteName: "MOTORRAX - BMW Motorrad Monterrey",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/motorrax_logo_black.png",
        width: 1200,
        height: 630,
        alt: "MOTORRAX BMW Motorrad Monterrey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW Motorrad Monterrey | Eduardo Ibarra",
    description: "Cotiza tu BMW R 1300 GS o F 900 GS con atención directa de Eduardo Ibarra en Monterrey.",
    images: ["/images/motorrax_logo_black.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://motorrax.com",
    languages: {
      "es-MX": "https://motorrax.com",
      "en-US": "https://motorrax.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema.org for Local Business & Motorcycle Dealership
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    "name": "MOTORRAX • BMW Motorrad Monterrey",
    "image": "https://motorrax.com/images/motorrax_logo_black.png",
    "@id": "https://motorrax.com",
    "url": "https://motorrax.com",
    "telephone": "+528125827777",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Vasconcelos",
      "addressLocality": "San Pedro Garza García",
      "addressRegion": "NL",
      "postalCode": "66220",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.6572,
      "longitude": -100.3664
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://facebook.com/motorrax",
      "https://instagram.com/motorrax.bmw",
      "https://youtube.com/@motorrax"
    ]
  };

  return (
    <html lang="es" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased selection:bg-sky-600 selection:text-white min-h-screen flex flex-col`}>
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
