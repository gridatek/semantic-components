import { DOCUMENT } from '@angular/common';
import { LOCALE_ID, Service, inject } from '@angular/core';
import { SC_CONFIG } from '@semantic-components/ui';
import {
  type ScI18nConfig,
  type ScLocale,
  localeDir,
  storageKey,
} from './i18n-config';

/**
 * The app's locales (`provideScConfig({ i18n })`) and the one in use
 * (`LOCALE_ID`, set by `loadLocale()`) — for the page's life: switching
 * reloads it, since templates are translated once, when they are created.
 * Write your switcher from it (a select, a menu, buttons).
 */
@Service()
export class ScI18n {
  private readonly document = inject(DOCUMENT);
  private readonly config: ScI18nConfig = inject(SC_CONFIG).i18n ?? {
    sourceLocale: 'en',
    locales: [],
  };

  /** The locales offered. */
  readonly locales = this.config.locales;

  /** The locale in use: `LOCALE_ID`'s, or its base (`en` for `en-US`), else the source one. */
  readonly locale: ScLocale = this.find(inject(LOCALE_ID)) ??
    this.find(this.config.sourceLocale) ?? {
      id: this.config.sourceLocale,
      label: this.config.sourceLocale,
    };

  /** Its writing direction: its `dir`, else the platform's. */
  readonly dir = localeDir(this.config, this.locale.id);

  /** Keeps the choice and reloads the page in it; nothing for the locale in use or one not offered. */
  setLocale(id: string): void {
    if (
      id === this.locale.id ||
      !this.locales.some((locale) => locale.id === id)
    )
      return;
    try {
      localStorage.setItem(storageKey(this.config), id);
    } catch {
      // No storage: the choice can't be kept.
      return;
    }
    this.document.defaultView?.location.reload();
  }

  private find(id: string): ScLocale | undefined {
    const lower = id.toLowerCase();
    return (
      this.locales.find((locale) => locale.id.toLowerCase() === lower) ??
      this.locales.find(
        (locale) => locale.id.toLowerCase() === lower.split('-')[0],
      )
    );
  }
}
