import PageHeader from "@/components/layout/PageHeader";
import BlogArticleBody from "@/components/blog/BlogArticleBody";
import SeoJsonLd from "@/components/seo/SeoJsonLd";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import type { ContentPagePayload } from "@/lib/cms/types";
import type { Metadata } from "next";

export function contentPageMetadata(page: ContentPagePayload): Metadata {
  return buildSeoMetadata({
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    seo: page.seo,
  });
}

export default function ContentPageView({ page }: { page: ContentPagePayload }) {
  return (
    <>
      <SeoJsonLd raw={page.seo?.schemaJsonLd} />
      <PageHeader title={page.title} breadcrumbs={[{ label: page.title }]} />
      <section className="bg-[#f8f5f0] py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogArticleBody html={page.body} />
        </div>
      </section>
    </>
  );
}
