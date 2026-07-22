import { redirect } from "next/navigation";

/** Ultra-short alias for Pit Stop — mention “motorrax.com/l” in videos. */
export default function ShortLinksRedirect() {
  redirect("/links");
}
