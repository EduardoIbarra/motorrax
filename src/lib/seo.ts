import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type BuildMetaInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image,
  noIndex = false,
  type = "website",
}: BuildMetaInput = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-default.svg`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        "es-MX": url,
        es: url,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    keywords: [
      "adventure motorcycle",
      "moto adventure",
      "maxitrail",
      "BMW GS",
      "off road moto México",
      "rodadas Monterrey",
      "Rally ADV",
      "MOTORRAX",
      "NorthBikers",
      "rutas off road",
      "adventure bike México",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
    areaServed: {
      "@type": "Country",
      name: "México",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "es-MX",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/rutas?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function eventJsonLd(route: {
  title: string;
  description?: string | null;
  start_timestamp?: string | null;
  venue?: string | null;
  banner?: string | null;
  id: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: route.title,
    description: route.description || undefined,
    startDate: route.start_timestamp || undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: route.banner || undefined,
    location: route.venue
      ? {
          "@type": "Place",
          name: route.venue,
          address: {
            "@type": "PostalAddress",
            addressCountry: "MX",
          },
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/rutas/${route.id}`,
  };
}
