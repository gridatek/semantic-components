import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SC_I18N_CONFIG } from './locale-config';

@Injectable({ providedIn: 'root' })
export class ScLocaleManager {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SC_I18N_CONFIG);

  private readonly storageKey = this.config.storageKey ?? 'sc-locale';

  readonly supportedLocales = this.config.supportedLocales;

  private readonly _locale = signal<string>(this.detectLocale());

  readonly locale = this._locale.asReadonly();

  readonly currentLocale = computed(() => {
    const code = this._locale();
    return (
      this.supportedLocales.find((l) => l.code === code) ??
      this.supportedLocales[0]
    );
  });

  readonly language = computed(() => this.currentLocale().language);

  readonly region = computed(() => {
    const parts = this._locale().split('-');
    return parts.length > 1 ? parts[1] : undefined;
  });

  readonly direction = computed(() => this.currentLocale().direction);

  readonly isRtl = computed(() => this.direction() === 'rtl');

  constructor() {
    this.validateConfig();

    effect(() => {
      const docEl = this.document.documentElement;
      if (docEl) {
        docEl.dir = this.direction();
        docEl.lang = this.language();
      }
    });
  }

  setLocale(code: string): void {
    const locale = this.supportedLocales.find((l) => l.code === code);
    if (!locale) {
      console.warn(`Locale "${code}" is not configured.`);
      return;
    }

    this._locale.set(code);
    this.storeLocale(code);
  }

  private validateConfig(): void {
    const { supportedLocales, defaultLocaleCode } = this.config;

    if (!supportedLocales.length) {
      throw new Error(
        'ScLocaleManager: supportedLocales must contain at least one locale.',
      );
    }

    if (!supportedLocales.some((l) => l.code === defaultLocaleCode)) {
      throw new Error(
        `ScLocaleManager: defaultLocaleCode "${defaultLocaleCode}" is not in supportedLocales.`,
      );
    }
  }

  private detectLocale(): string {
    const stored = this.getStoredLocale();
    if (stored && this.config.supportedLocales.some((l) => l.code === stored)) {
      return stored;
    }

    return this.config.defaultLocaleCode;
  }

  private getStoredLocale(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.storageKey);
  }

  private storeLocale(code: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, code);
    }
  }
}
