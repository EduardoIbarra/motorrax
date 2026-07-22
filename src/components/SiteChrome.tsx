"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Paths that render without the main site header/footer (link-in-bio). */
const BARE_PATHS = ["/links", "/l"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (bare) {
    return <main className="flex min-h-full flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
