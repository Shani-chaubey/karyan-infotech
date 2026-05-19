"use client";

import { useCallback, useState } from "react";

type LeadSource =
  | "enquiry_modal"
  | "contact_page"
  | "about_page"
  | "property_details";

type LeadPayload = {
  source: LeadSource;
  name: string;
  email: string;
  mobile: string;
  project?: string;
  message?: string;
  preferredDate?: string;
  pagePath?: string;
};

export function useLeadSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = useCallback(async (payload: LeadPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(
          typeof j.error === "string" ? j.error : "We could not process your request right now."
        );
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitLead, loading, error };
}
