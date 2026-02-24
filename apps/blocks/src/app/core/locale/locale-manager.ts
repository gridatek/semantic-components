import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SC_LOCALE_CONFIG, ScLocale } from './locale-config';

@Injectable({ providedIn: 'root' })
export class ScLocaleManager {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(SC_LOCALE_CONFIG);

  private readonly storageKey = this.config.storageKey ?? 'sc-locale';

  readonly locales = signal<ScLocale[]>(this.config.locales);

  readonly locale = signal<string>(this.detectLocale());

  readonly currentLocale = computed(() => {
    const code = this.locale();
    return this.locales().find((l) => l.code === code) ?? this.locales()[0];
  });

  readonly language = computed(() => this.locale().split('-')[0]);

  readonly region = computed(() => {
    const parts = this.locale().split('-');
    return parts.length > 1 ? parts[1] : undefined;
  });

  readonly direction = computed(() => this.currentLocale().direction);

  readonly isRtl = computed(() => this.direction() === 'rtl');

  constructor() {
    effect(() => {
      const docEl = this.document.documentElement;
      if (docEl) {
        docEl.dir = this.direction();
        docEl.lang = this.language();
      }
    });
  }

  setLocale(code: string): void {
    const locale = this.locales().find((l) => l.code === code);
    if (!locale) {
      console.warn(`Locale "${code}" is not configured.`);
      return;
    }

    this.locale.set(code);
    this.storeLocale(code);
  }

  private detectLocale(): string {
    const stored = this.getStoredLocale();
    if (stored && this.config.locales.some((l) => l.code === stored)) {
      return stored;
    }

    return this.config.defaultLocale;
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
