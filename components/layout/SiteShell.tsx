import { getSiteSettings } from "@/lib/cms/getters";
import NavbarClient from "@/components/layout/NavbarClient";
import FooterClient from "@/components/layout/FooterClient";

export default async function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <>
      <NavbarClient nav={settings.nav} />
      {children}
      <FooterClient footer={settings.footer} />
    </>
  );
}
