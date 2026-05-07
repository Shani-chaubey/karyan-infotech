"use client";

import { useEffect, useState } from "react";
import SiteBrandLogo from "@/components/layout/SiteBrandLogo";
import { useLeadSubmission } from "@/hooks/useLeadSubmission";

export default function InquirySection() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const { submitLead, loading } = useLeadSubmission();

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", mobile: "" });
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue =
      name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm({ ...form, [name]: nextValue });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();

    if (!/^[A-Za-z][A-Za-z\s.'-]{1,79}$/.test(name)) {
      nextErrors.name = "Enter a valid name (2-80 letters).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!/^\d{10}$/.test(mobile)) {
      nextErrors.mobile = "Phone number must be exactly 10 digits.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const ok = await submitLead({
        source: "about_page",
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        project: "",
        message: "",
        pagePath: typeof window !== "undefined" ? window.location.pathname : "/about",
      });
      if (!ok) throw new Error("Request failed");
      setSubmitted(true);
      setErrors({});
    } catch {
      alert("We could not send your enquiry. Please try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #ddd",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#292929",
    background: "#fff",
    outline: "none",
  };

  return (
    <section style={{ background: "#f5f5f5" }} className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: heading */}
          <div>
            <div className="mb-6 flex justify-start">
              <SiteBrandLogo
                variant="onLight"
                asLink={false}
                className="h-10 w-auto max-w-[200px] sm:h-11"
              />
            </div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#655E56" }}
            >
              QUICK INQUIRY
            </h4>
            <h2
              className="font-bold leading-tight mb-4"
              style={{ color: "#292929", fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              To stay updated with our projects and more
            </h2>
            <div className="w-10 h-0.5" style={{ background: "#F7B90F" }} />
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="p-6 text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#F7B90F" }}
                >
                  ✓
                </div>
                <p className="font-semibold" style={{ color: "#292929" }}>
                  Thank you! We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#5e646a" }}>
                    Your name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#5e646a" }}>
                    Your email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Your email"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide" style={{ color: "#5e646a" }}>
                    Your Mobile*
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    inputMode="numeric"
                    pattern="\d{10}"
                    maxLength={10}
                    value={form.mobile}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Your mobile number"
                  />
                  {errors.mobile ? (
                    <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 font-semibold uppercase tracking-wider text-sm transition-colors"
                  style={{
                    background: loading ? "#e0a800" : "#F7B90F",
                    color: "#fff",
                    border: "none",
                    cursor: loading ? "wait" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
