"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AISalesWidget } from "@/components/interactive/AISalesWidget";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

export const PublicLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <AISalesWidget />
      <React.Suspense fallback={null}>
        <AnalyticsTracker />
      </React.Suspense>
    </>
  );
};
