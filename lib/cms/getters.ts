import { connectMongo } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { HomeContentModel } from "@/models/HomeContent";
import { ProjectPageModel } from "@/models/ProjectPage";
import { BlogPostModel } from "@/models/BlogPost";
import { SitePageModel } from "@/models/SitePage";
import type {
  BlogPostPayload,
  HomePayload,
  ProjectPayload,
  SiteSettingsBundle,
} from "./types";
import { DEFAULT_SITE_SETTINGS } from "./defaults/siteSettings";
import { DEFAULT_HOME_PAYLOAD } from "./defaults/homePayload";
import { DEFAULT_BLOG_POSTS } from "./defaults/blogPosts";
import { DEFAULT_SITE_PAGES } from "./defaults/sitePages";
import { DEFAULT_PROJECT_PAGES } from "./defaults/projectsSeed";

function defaultProject(slug: string): ProjectPayload | null {
  const row = DEFAULT_PROJECT_PAGES.find((p) => p.slug === slug);
  return row ? row.payload : null;
}

export async function getSiteSettings(): Promise<SiteSettingsBundle> {
  try {
    await connectMongo();
    const doc = await SiteSettingsModel.findOne({ key: "default" }).lean();
    if (doc?.nav && doc?.footer) {
      return { nav: doc.nav as SiteSettingsBundle["nav"], footer: doc.footer as SiteSettingsBundle["footer"] };
    }
  } catch {
    /* use defaults */
  }
  return DEFAULT_SITE_SETTINGS;
}

export async function getHomeContent(): Promise<HomePayload> {
  try {
    await connectMongo();
    const doc = await HomeContentModel.findOne({ key: "default" }).lean();
    if (doc?.data && typeof doc.data === "object") {
      return { ...DEFAULT_HOME_PAYLOAD, ...(doc.data as Partial<HomePayload>) };
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_HOME_PAYLOAD;
}

export async function getProjectPayload(slug: string): Promise<ProjectPayload | null> {
  try {
    await connectMongo();
    const doc = await ProjectPageModel.findOne({ slug }).lean();
    if (doc?.payload && typeof doc.payload === "object") {
      return doc.payload as ProjectPayload;
    }
  } catch {
    /* fall through */
  }
  return defaultProject(slug);
}

export async function getBlogPosts(): Promise<BlogPostPayload[]> {
  try {
    await connectMongo();
    const rows = await BlogPostModel.find().sort({ order: 1, createdAt: -1 }).lean();
    if (rows.length) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        excerpt: r.excerpt,
        body: r.body ?? undefined,
        date: r.date,
        category: r.category,
        href: r.href,
        image: r.image,
        order: r.order,
      }));
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostPayload | null> {
  const posts = await getBlogPosts();
  const normalized = slug.toLowerCase();
  return (
    posts.find(
      (p) =>
        p.slug.toLowerCase() === normalized ||
        p.href === `/blog/${slug}` ||
        p.href.endsWith(`/${normalized}`)
    ) ?? null
  );
}

export async function getSitePage(slug: string): Promise<{
  metaTitle: string;
  metaDescription: string;
  payload: Record<string, unknown>;
} | null> {
  const fallback = DEFAULT_SITE_PAGES.find((p) => p.slug === slug);
  try {
    await connectMongo();
    const doc = await SitePageModel.findOne({ slug }).lean();
    if (doc) {
      return {
        metaTitle: doc.metaTitle,
        metaDescription: doc.metaDescription,
        payload: (doc.payload ?? {}) as Record<string, unknown>,
      };
    }
  } catch {
    /* fall through */
  }
  if (!fallback) return null;
  return {
    metaTitle: fallback.metaTitle,
    metaDescription: fallback.metaDescription,
    payload: { ...fallback.payload } as Record<string, unknown>,
  };
}
