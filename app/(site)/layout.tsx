import SiteShell from "@/components/layout/SiteShell";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteShell>
      <main className="flex-1 bg-lux-ivory text-theme-fg">{children}</main>
    </SiteShell>
  );
}
