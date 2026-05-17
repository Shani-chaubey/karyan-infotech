"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContentPagePayload } from "@/lib/cms/types";
import { normalizeContentPageSlug } from "@/lib/cms/contentPages";
import {
  AdminToastViewport,
  CmsField,
  CmsInput,
  CmsLoadingSkeleton,
  CmsPageIntro,
  CmsSaveBar,
  CmsTextarea,
  showAdminErrorToast,
} from "./cms-ui";
import BlogJoditEditor from "./BlogJoditEditor";
import { slugify } from "./form-helpers";
import SeoFields from "./SeoFields";

const EMPTY_PAGE: ContentPagePayload = {
  slug: "",
  title: "",
  body: "",
  metaTitle: "",
  metaDescription: "",
};

export default function ContentPagePortalForm({
  slug: initialSlug,
  isNew,
}: {
  slug: string;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<ContentPagePayload | null>(isNew ? EMPTY_PAGE : null);
  const [urlSlug, setUrlSlug] = useState(initialSlug === "new" ? "" : initialSlug);
  const [status, setStatus] = useState("");

  const patch = useCallback((fn: (d: ContentPagePayload) => ContentPagePayload) => {
    setData((prev) => (prev ? fn(structuredClone(prev)) : prev));
  }, []);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/content-pages/${initialSlug}`, { credentials: "include" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Could not load page (${r.status})`);
        return r.json();
      })
      .then((j) => {
        if (j.page) {
          setData(j.page as ContentPagePayload);
          setUrlSlug(j.page.slug);
        } else {
          setData({
            ...EMPTY_PAGE,
            slug: initialSlug,
            title: initialSlug
              .split("-")
              .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
              .join(" "),
            metaTitle: initialSlug
              .split("-")
              .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
              .join(" "),
          });
          setUrlSlug(initialSlug);
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : "Could not load page.";
        showAdminErrorToast(msg);
      });
  }, [initialSlug, isNew]);

  async function save() {
    if (!data) return;
    const title = data.title.trim();
    const nextSlug = normalizeContentPageSlug(urlSlug || slugify(title));
    if (!title) {
      showAdminErrorToast("Page name is required.");
      return;
    }
    if (!nextSlug) {
      showAdminErrorToast("URL slug is required.");
      return;
    }

    setStatus("Saving…");
    const payload: ContentPagePayload = {
      ...data,
      slug: nextSlug,
      title,
      metaTitle: data.metaTitle.trim() || title,
      metaDescription: data.metaDescription.trim(),
    };

    const endpoint = isNew
      ? "/api/admin/content-pages"
      : `/api/admin/content-pages/${encodeURIComponent(initialSlug)}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(endpoint, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isNew ? payload : { ...payload, nextSlug: nextSlug !== initialSlug ? nextSlug : undefined }
      ),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      const msg = typeof j.error === "string" ? j.error : "Could not save. Try again.";
      setStatus(msg);
      showAdminErrorToast(msg);
      return;
    }

    const j = await res.json();
    const savedSlug = typeof j.slug === "string" ? j.slug : nextSlug;
    setStatus("Saved successfully.");
    if (isNew || savedSlug !== initialSlug) {
      router.replace(`/admin/content-pages/${savedSlug}`);
    }
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <CmsLoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminToastViewport />
      <CmsPageIntro
        title={isNew ? "New content page" : data.title || "Content page"}
        where="Public URL uses the slug below — e.g. /privacy-policy"
      >
        Page name appears in the header. Body uses the same rich-text editor as blog articles.
      </CmsPageIntro>

      <div className="space-y-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-2">
          <CmsField label="Page name" hint="Shown as the main heading on the public page.">
            <CmsInput
              value={data.title}
              onChange={(e) => patch((d) => ({ ...d, title: e.target.value }))}
            />
          </CmsField>
          <CmsField label="URL slug" hint="Lowercase, hyphens only — part of the live link.">
            <CmsInput
              value={urlSlug}
              onChange={(e) => setUrlSlug(e.target.value)}
              placeholder="e.g. privacy-policy"
            />
          </CmsField>
        </div>

        <CmsField label="Page content" hint="Full page body — headings, lists, links, etc.">
          <BlogJoditEditor
            id={`content-page-body-${urlSlug || "new"}`}
            value={data.body}
            onChange={(html) => patch((d) => ({ ...d, body: html }))}
          />
        </CmsField>

        <CmsField label="Page title (tab & Google)">
          <CmsInput
            value={data.metaTitle}
            onChange={(e) => patch((d) => ({ ...d, metaTitle: e.target.value }))}
          />
        </CmsField>
        <CmsField label="Short summary for Google" hint="Aim for 140–160 characters.">
          <CmsTextarea
            value={data.metaDescription}
            onChange={(e) => patch((d) => ({ ...d, metaDescription: e.target.value }))}
          />
        </CmsField>
        <SeoFields value={data.seo} onChange={(seo) => patch((d) => ({ ...d, seo }))} />
      </div>

      <CmsSaveBar onSave={save} status={status} label="Save page" />
    </div>
  );
}
