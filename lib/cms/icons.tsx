import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Circle,
  ClipboardList,
  Clock,
  Gem,
  Headphones,
  Home,
  IndianRupee,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
} from "lucide-react";

/**
 * Explicit map so bundlers keep these icons (dynamic `import *` lookups get tree-shaken).
 */
const CMS_ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Gem,
  ClipboardList,
  Headphones,
  Sparkles,
  Building2,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  IndianRupee,
  TrendingUp,
  Home,
  Store,
  Maximize2,
};

export function getLucideIcon(name: string): LucideIcon {
  const Icon = CMS_ICON_MAP[name];
  if (Icon) return Icon;
  return Circle;
}

/** Highlights on project pages — unknown keys fall back to Building2 */
export function projectIcon(name: string): LucideIcon {
  return CMS_ICON_MAP[name] ?? Building2;
}
