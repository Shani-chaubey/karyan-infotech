import { getSiteSettings } from "@/lib/cms/getters";
import FooterClient from "@/components/layout/FooterClient";

/** @deprecated Prefer SiteShell */
export default async function Footer() {
  const { footer } = await getSiteSettings();
  return <FooterClient footer={footer} />;
}
