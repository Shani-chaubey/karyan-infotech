import { getSiteSettings } from "@/lib/cms/getters";
import NavbarClient from "@/components/layout/NavbarClient";

/** @deprecated Prefer SiteShell; kept for direct imports if needed */
export default async function Navbar() {
  const { nav } = await getSiteSettings();
  return <NavbarClient nav={nav} />;
}
