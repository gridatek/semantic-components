import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, REQUEST, Service, inject } from '@angular/core';

/** A year: a choice of the user's lasts until changed. */
const MAX_AGE = 60 * 60 * 24 * 365;

/** A cookie's value in a `Cookie` header (or `document.cookie`); `null` without it. */
function parseCookie(cookies: string, name: string): string | null {
  for (const part of cookies.split(';')) {
    const at = part.indexOf('=');
    if (at > 0 && part.slice(0, at).trim() === name)
      return decodeURIComponent(part.slice(at + 1).trim());
  }
  return null;
}

/**
 * A saved choice, in the browser: its cookie, else its copy in
 * `localStorage` (where cookies are not kept: a `file://` page, an embed on
 * another site). For code that runs before the app; in it, `ScCookies`.
 */
export function readCookie(name: string): string | null {
  const cookie = parseCookie(globalThis.document?.cookie ?? '', name);
  if (cookie !== null) return cookie;
  try {
    return globalThis.localStorage?.getItem(name) ?? null;
  } catch {
    return null;
  }
}

/** Saves a choice, in the browser: a cookie for a year, and its copy in `localStorage`. */
export function writeCookie(name: string, value: string): void {
  if (!globalThis.document) return;
  globalThis.document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  try {
    globalThis.localStorage?.setItem(name, value);
  } catch {
    // No storage: the cookie alone.
  }
}

/**
 * The user's choices, as cookies: read in the browser and, while the server
 * renders a request, from it — so a page rendered per request is drawn as the
 * user left it, from the first paint. A prerendered page has no request: its
 * defaults, then the browser's. Each choice is also copied to `localStorage`,
 * read where cookies are not kept.
 */
@Service()
export class ScCookies {
  private readonly request = inject(REQUEST, { optional: true });
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  get(name: string): string | null {
    if (this.browser) return readCookie(name);
    return parseCookie(this.request?.headers.get('cookie') ?? '', name);
  }

  /** Kept a year, for the whole site; nothing on the server. */
  set(name: string, value: string): void {
    if (this.browser) writeCookie(name, value);
  }
}
