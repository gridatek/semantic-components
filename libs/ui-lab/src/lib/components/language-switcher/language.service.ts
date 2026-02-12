import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
}

export interface LanguageConfig {
  languages: Language[];
  defaultLanguage: string;
  /** Base path for localized URLs (e.g., '/' for '/en/', '/fr/') */
  basePath?: string;
  /** Storage key for persisting language preference */
  storageKey?: string;
  /** Custom URL resolver for language switching */
  urlResolver?: (language: string, currentUrl: string) => string;
}

export const SC_LANGUAGE_CONFIG = new InjectionToken<LanguageConfig>(
  'SC_LANGUAGE_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      languages: [
        { code: 'en', label: 'English', nativeLabel: 'English' },
        { code: 'fr', label: 'French', nativeLabel: 'Français' },
      ],
      defaultLanguage: 'en',
      basePath: '/',
      storageKey: 'sc-language',
    }),
  },
);

@Injectable({ providedIn: 'root' })
export class ScLanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SC_LANGUAGE_CONFIG);

  private readonly storageKey = this.config.storageKey ?? 'sc-language';

  /** All available languages */
  readonly languages = signal<Language[]>(this.config.languages);

  /** Current language code */
  readonly language = signal<string>(this.detectCurrentLanguage());

  /** Current language object */
  readonly currentLanguage = computed(() => {
    const code = this.language();
    return (
      this.languages().find((lang) => lang.code === code) ?? this.languages()[0]
    );
  });

  /** Stored user preference (may differ from current if URL overrides) */
  readonly preferredLanguage = signal<string>(this.getStoredLanguage());

  /**
   * Set the language and navigate to the localized URL.
   * This will trigger a page refresh to load the correct locale bundle.
   */
  setLanguage(languageCode: string): void {
    const language = this.languages().find(
      (lang) => lang.code === languageCode,
    );
    if (!language) {
      console.warn(`Language "${languageCode}" is not configured.`);
      return;
    }

    // Store preference
    this.storeLanguage(languageCode);
    this.preferredLanguage.set(languageCode);

    // Navigate to the localized URL (this will refresh the page)
    const newUrl = this.resolveLanguageUrl(languageCode);
    if (newUrl !== this.getCurrentUrl()) {
      this.document.defaultView?.location.assign(newUrl);
    }
  }

  /**
   * Toggle between languages (useful for 2-language setups)
   */
  toggleLanguage(): void {
    const langs = this.languages();
    if (langs.length !== 2) {
      console.warn(
        'toggleLanguage() is designed for 2-language setups. Use setLanguage() instead.',
      );
      return;
    }

    const current = this.language();
    const next = langs.find((lang) => lang.code !== current) ?? langs[0];
    this.setLanguage(next.code);
  }

  /**
   * Get the URL for a specific language
   */
  getLanguageUrl(languageCode: string): string {
    return this.resolveLanguageUrl(languageCode);
  }

  private detectCurrentLanguage(): string {
    // First, try to detect from URL path (e.g., /en/, /fr/)
    const urlLanguage = this.detectLanguageFromUrl();
    if (urlLanguage) {
      return urlLanguage;
    }

    // Then, check stored preference
    const stored = this.getStoredLanguage();
    if (stored && this.languages().some((lang) => lang.code === stored)) {
      return stored;
    }

    // Finally, try browser language
    const browserLanguage = this.detectBrowserLanguage();
    if (browserLanguage) {
      return browserLanguage;
    }

    return this.config.defaultLanguage;
  }

  private detectLanguageFromUrl(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const pathname = window.location.pathname;
    const basePath = this.config.basePath ?? '/';

    // Extract language code from path (e.g., /en/page -> en, /fr/page -> fr)
    const pathAfterBase = pathname.startsWith(basePath)
      ? pathname.slice(basePath.length)
      : pathname.slice(1);

    const firstSegment = pathAfterBase.split('/')[0];
    const language = this.languages().find(
      (lang) => lang.code === firstSegment,
    );

    return language?.code ?? null;
  }

  private detectBrowserLanguage(): string | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    const browserLang = navigator.language.split('-')[0];
    const language = this.languages().find((lang) => lang.code === browserLang);

    return language?.code ?? null;
  }

  private getStoredLanguage(): string {
    if (typeof localStorage === 'undefined') {
      return this.config.defaultLanguage;
    }

    const stored = localStorage.getItem(this.storageKey);
    if (stored && this.config.languages.some((lang) => lang.code === stored)) {
      return stored;
    }

    return this.config.defaultLanguage;
  }

  private storeLanguage(languageCode: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, languageCode);
    }
  }

  private resolveLanguageUrl(languageCode: string): string {
    const currentUrl = this.getCurrentUrl();

    // Use custom resolver if provided
    if (this.config.urlResolver) {
      return this.config.urlResolver(languageCode, currentUrl);
    }

    // Default: replace language segment in path
    return this.defaultUrlResolver(languageCode, currentUrl);
  }

  private defaultUrlResolver(languageCode: string, currentUrl: string): string {
    if (typeof window === 'undefined') {
      return currentUrl;
    }

    const url = new URL(currentUrl, window.location.origin);
    const basePath = this.config.basePath ?? '/';
    const pathname = url.pathname;

    // Check if current URL has a language prefix
    const currentLangCode = this.detectLanguageFromUrl();

    if (currentLangCode) {
      // Replace existing language code
      const regex = new RegExp(
        `^(${basePath.replace(/\/$/, '')}/)${currentLangCode}(/|$)`,
      );
      url.pathname = pathname.replace(regex, `$1${languageCode}$2`);
    } else {
      // Add language code after base path
      const pathWithoutBase = pathname.startsWith(basePath)
        ? pathname.slice(basePath.length)
        : pathname.slice(1);
      url.pathname =
        `${basePath.replace(/\/$/, '')}/${languageCode}/${pathWithoutBase}`.replace(
          /\/+/g,
          '/',
        );
    }

    return url.toString();
  }

  private getCurrentUrl(): string {
    if (typeof window === 'undefined') {
      return '/';
    }
    return window.location.href;
  }
}
