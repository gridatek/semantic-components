import {
  computed,
  effect,
  inject,
  Injectable,
  InjectionToken,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ScLocale {
  code: string;
  label: string;
  nativeLabel: string;
  direction?: 'ltr' | 'rtl';
}

export interface ScLocaleConfig {
  locales: ScLocale[];
  defaultLocale: string;
  storageKey?: string;
}

const RTL_LANGUAGES = new Set([
  'ar',
  'he',
  'fa',
  'ur',
  'ps',
  'sd',
  'yi',
  'ku',
  'ug',
  'dv',
  'syr',
  'ckb',
]);

export const SC_LOCALE_CONFIG = new InjectionToken<ScLocaleConfig>(
  'SC_LOCALE_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      locales: [
        { code: 'en-US', label: 'English (US)', nativeLabel: 'English (US)' },
      ],
      defaultLocale: 'en-US',
      storageKey: 'sc-locale',
    }),
  },
);

@Injectable({ providedIn: 'root' })
export class ScLocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SC_LOCALE_CONFIG);

  private readonly storageKey = this.config.storageKey ?? 'sc-locale';

  /** All available locales */
  readonly locales = signal<ScLocale[]>(this.config.locales);

  /** Current locale code */
  readonly locale = signal<string>(this.detectCurrentLocale());

  /** Current locale object */
  readonly currentLocale = computed(() => {
    const code = this.locale();
    return this.locales().find((l) => l.code === code) ?? this.locales()[0];
  });

  /** Language extracted from locale (e.g. 'en' from 'en-US') */
  readonly language = computed(() => {
    const code = this.locale();
    return code.split('-')[0];
  });

  /** Region extracted from locale (e.g. 'US' from 'en-US') */
  readonly region = computed(() => {
    const code = this.locale();
    const parts = code.split('-');
    return parts.length > 1 ? parts[1] : undefined;
  });

  /** Text direction derived from locale */
  readonly direction = computed<'ltr' | 'rtl'>(() => {
    const current = this.currentLocale();

    // Use explicit override if provided
    if (current.direction) {
      return current.direction;
    }

    // Try Intl.Locale.prototype.getTextInfo()
    try {
      const intlLocale = new Intl.Locale(this.locale());
      const textInfo =
        (
          intlLocale as Intl.Locale & {
            getTextInfo?: () => { direction: string };
            textInfo?: { direction: string };
          }
        ).getTextInfo?.() ??
        (intlLocale as Intl.Locale & { textInfo?: { direction: string } })
          .textInfo;
      if (textInfo?.direction === 'rtl') {
        return 'rtl';
      }
      if (textInfo?.direction === 'ltr') {
        return 'ltr';
      }
    } catch {
      // Fallback below
    }

    // Fallback: check against known RTL languages
    return RTL_LANGUAGES.has(this.language()) ? 'rtl' : 'ltr';
  });

  /** Whether the current locale is RTL */
  readonly isRtl = computed(() => this.direction() === 'rtl');

  constructor() {
    // Sync document attributes when locale changes
    effect(() => {
      const dir = this.direction();
      const lang = this.language();
      const docEl = this.document.documentElement;

      if (docEl) {
        docEl.dir = dir;
        docEl.lang = lang;
      }
    });
  }

  /**
   * Set the active locale.
   */
  setLocale(localeCode: string): void {
    const locale = this.locales().find((l) => l.code === localeCode);
    if (!locale) {
      console.warn(`Locale "${localeCode}" is not configured.`);
      return;
    }

    this.locale.set(localeCode);
    this.storeLocale(localeCode);
  }

  /**
   * Toggle between locales (useful for 2-locale setups).
   */
  toggleLocale(): void {
    const all = this.locales();
    if (all.length !== 2) {
      console.warn(
        'toggleLocale() is designed for 2-locale setups. Use setLocale() instead.',
      );
      return;
    }

    const current = this.locale();
    const next = all.find((l) => l.code !== current) ?? all[0];
    this.setLocale(next.code);
  }

  private detectCurrentLocale(): string {
    // 1. Stored preference
    const stored = this.getStoredLocale();
    if (stored && this.config.locales.some((l) => l.code === stored)) {
      return stored;
    }

    // 2. Config default
    if (this.config.defaultLocale) {
      return this.config.defaultLocale;
    }

    // 3. Browser locale
    const browserLocale = this.detectBrowserLocale();
    if (browserLocale) {
      return browserLocale;
    }

    return this.config.locales[0]?.code ?? 'en-US';
  }

  private detectBrowserLocale(): string | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    const browserLang = navigator.language;

    // Exact match
    const exact = this.config.locales.find((l) => l.code === browserLang);
    if (exact) {
      return exact.code;
    }

    // Language-only match (e.g. 'en' matches 'en-US')
    const langOnly = browserLang.split('-')[0];
    const partial = this.config.locales.find(
      (l) => l.code.split('-')[0] === langOnly,
    );
    return partial?.code ?? null;
  }

  private getStoredLocale(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.storageKey);
  }

  private storeLocale(localeCode: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, localeCode);
    }
  }
}
