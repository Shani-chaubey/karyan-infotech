import LuxuryHomeView from "@/components/home/LuxuryHomeView";
import SeoJsonLd from "@/components/seo/SeoJsonLd";
import { getBlogPosts, getHomeContent, getProjectsListPayload, getSiteSettings } from "@/lib/cms/getters";

export default async function LuxuryHomePage() {
  const [data, projectsList, site, blogPosts] = await Promise.all([
    getHomeContent(),
    getProjectsListPayload(),
    getSiteSettings(),
    getBlogPosts(),
  ]);
  return (
    <>
      <SeoJsonLd raw={data.seo?.schemaJsonLd} />
      <LuxuryHomeView
        data={data}
        projectsList={projectsList}
        brandLogoSrc={site.nav.headerLogoSrc}
        brandLogoAlt={site.nav.headerLogoAlt}
        blogPosts={blogPosts.slice(0, 10)}
      />
    </>
  );
}
