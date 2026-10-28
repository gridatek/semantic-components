import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, REQUEST, Service, inject } from '@angular/core';

/** A year: a choice of the user's lasts until changed. */
const MAX_AGE = 60 * 60 * 24 * 365;

/** A cookie's value in a `Cookie` header (or `document.cookie`); `null` without it. */
export function readCookie(cookies: string, name: string): string | null {
  for (const part of cookies.split(';')) {
    const at = part.indexOf('=');
    if (at > 0 && part.slice(0, at).trim() === name)
      return decodeURIComponent(part.slice(at + 1).trim());
  }
  return null;
}

/**
 * The user's choices, as cookies: read in the browser and, while the server
 * renders a request, from it — so a page rendered per request is drawn as the
 * user left it, from the first paint. A prerendered page has no request: its
 * defaults, then the browser's.
 */
@Service()
export class ScCookies {
  private readonly request = inject(REQUEST, { optional: true });
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  get(name: string): string | null {
    const cookies = this.browser
      ? this.document.cookie
      : (this.request?.headers.get('cookie') ?? '');
    return readCookie(cookies, name);
  }

  /** Kept a year, for the whole site; nothing on the server. */
  set(name: string, value: string): void {
    if (!this.browser) return;
    this.document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  }
}
