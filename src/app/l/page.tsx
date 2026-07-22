import { redirect } from "next/navigation";

/** Ultra-short alias for Pit Stop — mention “motorrax.net/l” in videos. */
export default function ShortLinksRedirect() {
  redirect("/links");
}
