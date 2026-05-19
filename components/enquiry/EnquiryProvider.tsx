"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import EnquiryModal from "@/components/enquiry/EnquiryModal";
import type { SiteProjectInterestOption } from "@/lib/cms/types";

export type OpenEnquiryOptions = {
  /** Matches ContactForm / modal select values: trevana, citywalk, square, avenue-iv, other */
  project?: string;
  /** Do not move focus into the modal (e.g. opened from pointer hover). */
  skipAutofocus?: boolean;
};

type EnquiryContextValue = {
  openEnquiry: (opts?: OpenEnquiryOptions) => void;
  closeEnquiry: () => void;
  isOpen: boolean;
  projectOptions: SiteProjectInterestOption[];
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return ctx;
}

export function EnquiryProvider({
  children,
  brandLogoSrc,
  brandLogoAlt,
  projectOptions = [],
}: {
  children: ReactNode;
  brandLogoSrc?: string;
  brandLogoAlt?: string;
  projectOptions?: SiteProjectInterestOption[];
}) {
  const [isOpen, setOpen] = useState(false);
  const [defaultProject, setDefaultProject] = useState("");
  const [skipAutofocus, setSkipAutofocus] = useState(false);

  const openEnquiry = useCallback((opts?: OpenEnquiryOptions) => {
    setDefaultProject(opts?.project ?? "");
    setSkipAutofocus(opts?.skipAutofocus ?? false);
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({ openEnquiry, closeEnquiry, isOpen, projectOptions }),
    [openEnquiry, closeEnquiry, isOpen, projectOptions]
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiry}
        defaultProject={defaultProject}
        skipAutofocus={skipAutofocus}
        logoSrc={brandLogoSrc}
        logoAlt={brandLogoAlt}
        projectOptions={projectOptions}
      />
    </EnquiryContext.Provider>
  );
}

/** Button (or styled trigger) that opens the global enquiry modal. */
export function EnquiryTrigger({
  project,
  className = "",
  children,
  openOnHover = false,
}: {
  project?: string;
  className?: string;
  children: ReactNode;
  /** Opens the modal on pointer hover (click still works for touch/keyboard). */
  openOnHover?: boolean;
}) {
  const { openEnquiry, isOpen } = useEnquiry();

  const projectOpts = project ? { project } : undefined;
  const handleOpen = () => openEnquiry(projectOpts);
  const handleOpenFromHover = () =>
    openEnquiry({ ...projectOpts, skipAutofocus: true });

  return (
    <button
      type="button"
      className={className}
      onClick={handleOpen}
      onMouseEnter={openOnHover && !isOpen ? handleOpenFromHover : undefined}
      onFocus={openOnHover && !isOpen ? handleOpen : undefined}
    >
      {children}
    </button>
  );
}
