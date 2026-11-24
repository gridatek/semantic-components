import { isPlatformBrowser } from '@angular/common';
import {
  InjectionToken,
  PLATFORM_ID,
  REQUEST,
  Service,
  inject,
} from '@angular/core';

/** A year: a choice of the user's lasts until changed. */
const MAX_AGE = 60 * 60 * 24 * 365;

/** The prefix while the setup gives none: `sc-mode`, `sc-sidebar-state`… */
const DEFAULT_PREFIX = 'sc';

/**
 * The setup's `storagePrefix`, on a token of its own: an app may build its
 * settings from a saved choice (`ScStorage` in `SC_CONFIG`'s factory), which
 * reading the prefix from `SC_CONFIG` would make a cycle.
 */
export const SC_STORAGE_PREFIX = new InjectionToken<string>(
  'SC_STORAGE_PREFIX',
  { factory: () => DEFAULT_PREFIX },
);

/** A choice's cookie and `localStorage` name: `<prefix>-<name>`. */
function storageName(name: string, prefix: string): string {
  return `${prefix}-${name}`;
}

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
 * another site). For code that runs before the app; in it, `ScStorage`. Give
 * the setup's `storagePrefix`, if it has one.
 */
export function readStorage(
  name: string,
  prefix = DEFAULT_PREFIX,
): string | null {
  const key = storageName(name, prefix);
  const cookie = parseCookie(globalThis.document?.cookie ?? '', key);
  if (cookie !== null) return cookie;
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

/** Saves a choice, in the browser: a cookie for a year, and its copy in `localStorage`. */
export function writeStorage(
  name: string,
  value: string,
  prefix = DEFAULT_PREFIX,
): void {
  if (!globalThis.document) return;
  const key = storageName(name, prefix);
  globalThis.document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // No storage: the cookie alone.
  }
}

/**
 * The user's choices, kept as cookies: read in the browser and, while the server
 * renders a request, from it — so a page rendered per request is drawn as the
 * user left it, from the first paint. A prerendered page has no request: its
 * defaults, then the browser's. Each choice is also copied to `localStorage`,
 * read where cookies are not kept. Named `<prefix>-<name>`: the setup's
 * `storagePrefix`, `sc` by default.
 */
@Service()
export class ScStorage {
  private readonly request = inject(REQUEST, { optional: true });
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly prefix = inject(SC_STORAGE_PREFIX);

  get(name: string): string | null {
    if (this.browser) return readStorage(name, this.prefix);
    return parseCookie(
      this.request?.headers.get('cookie') ?? '',
      this.key(name),
    );
  }

  /** Kept a year, for the whole site; nothing on the server. */
  set(name: string, value: string): void {
    if (this.browser) writeStorage(name, value, this.prefix);
  }

  /** The choice's cookie and `localStorage` name, prefixed: what a `storage` event's `key` is. */
  key(name: string): string {
    return storageName(name, this.prefix);
  }
}
