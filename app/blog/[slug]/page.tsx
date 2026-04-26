import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/shared/CTASection";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/cms/getters";
import { stripHtml } from "@/lib/html/stripHtml";
import BlogArticleBody from "@/components/blog/BlogArticleBody";
import { Calendar } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: stripHtml(post.excerpt).slice(0, 200),
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const mainContent = (post.body?.trim() ? post.body : post.excerpt) ?? "";
  const headerBlurb = stripHtml(post.excerpt);
  const headerDesc =
    headerBlurb.slice(0, 160) + (headerBlurb.length > 160 ? "…" : "");

  return (
    <>
      <PageHeader
        title={post.title}
        bgImage={post.image}
        description={headerDesc}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: "Article" }]}
      />

      <article className="bg-[#f8f5f0] pb-20 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center gap-3 text-sm" style={{ color: "#7a7a7a" }}>
            <span
              className="text-xs font-bold uppercase px-2.5 py-1 text-white"
              style={{ background: "#F7B90F" }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
          </div>

          <div className="bg-white p-8 shadow-sm sm:p-10">
            <BlogArticleBody html={mainContent} />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:opacity-80"
              style={{ color: "#F7B90F" }}
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
