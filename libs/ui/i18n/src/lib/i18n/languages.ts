import { DOCUMENT } from '@angular/common';
import { LOCALE_ID, Service, inject } from '@angular/core';
import { SC_CONFIG } from '@semantic-components/ui';
import {
  type ScLanguage,
  type ScLanguagesConfig,
  languageDir,
  storageKey,
} from './languages-config';

/**
 * The app's languages (`provideScConfig({ languages })`) and the one in use
 * (`LOCALE_ID`, set by `loadLanguage()`) — for the page's life: switching
 * reloads it, since templates are translated once, when they are created.
 * Write your switcher from it (a select, a menu, buttons).
 */
@Service()
export class ScLanguages {
  private readonly document = inject(DOCUMENT);
  private readonly config: ScLanguagesConfig = inject(SC_CONFIG).languages ?? {
    sourceLanguage: 'en',
    languages: [],
  };

  /** The languages offered. */
  readonly all = this.config.languages;

  /** The language in use: `LOCALE_ID`'s, or its base (`en` for `en-US`), else the source one. */
  readonly current: ScLanguage = this.find(inject(LOCALE_ID)) ??
    this.find(this.config.sourceLanguage) ?? {
      code: this.config.sourceLanguage,
      label: this.config.sourceLanguage,
    };

  /** Its writing direction: its `dir`, else the platform's. */
  readonly dir = languageDir(this.config, this.current.code);

  /** Keeps the choice and reloads the page in it; nothing for the language in use or one not offered. */
  switchTo(code: string): void {
    if (
      code === this.current.code ||
      !this.all.some((language) => language.code === code)
    )
      return;
    try {
      localStorage.setItem(storageKey(this.config), code);
    } catch {
      // No storage: the choice can't be kept.
      return;
    }
    this.document.defaultView?.location.reload();
  }

  private find(code: string): ScLanguage | undefined {
    const lower = code.toLowerCase();
    return (
      this.all.find((language) => language.code.toLowerCase() === lower) ??
      this.all.find(
        (language) => language.code.toLowerCase() === lower.split('-')[0],
      )
    );
  }
}
