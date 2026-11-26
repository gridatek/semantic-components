import { DOCUMENT } from '@angular/common';
import { LOCALE_ID, Service, inject } from '@angular/core';
import { ScStorage } from '@semantic-components/ui';
import {
  SC_I18N_CONFIG,
  type ScI18nConfig,
  type ScLocale,
  findLocale,
  localeDir,
  storageKey,
} from './i18n-config';

/**
 * The app's locales (`withI18n()`) and the one in use
 * (`LOCALE_ID`, set by `loadLocale()`) — for the page's life: switching
 * reloads it, since templates are translated once, when they are created.
 * Write your switcher from it (a select, a menu, buttons).
 */
@Service()
export class ScI18n {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(ScStorage);
  private readonly config: ScI18nConfig = inject(SC_I18N_CONFIG, {
    optional: true,
  }) ?? {
    sourceLocale: 'en',
    locales: [],
  };

  /** The locales offered. */
  readonly locales = this.config.locales;

  /** The locale in use: `LOCALE_ID`'s (its extensions aside: `ar` for `ar-u-fw-sun`), or its base (`en` for `en-US`), else the source one. */
  readonly locale: ScLocale = findLocale(this.config, inject(LOCALE_ID)) ??
    findLocale(this.config, this.config.sourceLocale) ?? {
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
    this.storage.set(storageKey(this.config), id);
    this.document.defaultView?.location.reload();
  }
}
