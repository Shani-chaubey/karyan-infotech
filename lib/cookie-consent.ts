export const COOKIE_CONSENT_NAME = "karyan_site_consent";

/** Seven days in seconds */
export const COOKIE_CONSENT_MAX_AGE_SEC = 7 * 24 * 60 * 60;

export type CookieConsentChoice = "accepted" | "dismissed";

export function readConsentCookie(): CookieConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_CONSENT_NAME}=([^;]*)`)
  );
  if (!match?.[1]) return null;
  const value = decodeURIComponent(match[1].trim());
  if (value === "accepted" || value === "dismissed") return value;
  return null;
}

export function writeConsentCookie(choice: CookieConsentChoice): void {
  if (typeof document === "undefined") return;
  document.cookie = [
    `${COOKIE_CONSENT_NAME}=${encodeURIComponent(choice)}`,
    "path=/",
    `max-age=${COOKIE_CONSENT_MAX_AGE_SEC}`,
    "SameSite=Lax",
  ].join("; ");
}
