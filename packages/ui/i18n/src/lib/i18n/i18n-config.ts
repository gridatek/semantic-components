import { InjectionToken } from '@angular/core';
import type { ScFirstDayOfWeek } from '@semantic-components/ui';

/** A locale the app offers. */
export interface ScLocale {
  /** Its ID, a BCP 47 tag — `LOCALE_ID`'s value: `fr`, `pt-BR`. */
  id: string;
  /** Its name, written in itself: `Français`. */
  label: string;
  /** Its writing direction; left out, the platform's (`Intl.Locale#getTextInfo()`). */
  dir?: 'ltr' | 'rtl';
  /**
   * Its week's first day, `'mon'` … `'sun'`: `'sun'` for Arabic, say, where
   * `Intl` gives Saturday or Monday. Left out, the locale's own (`Intl`).
   */
  firstDayOfWeek?: ScFirstDayOfWeek;
}

/**
 * The app's locales, and where their translations come from: what
 * `withI18n()` and `loadLocale()` are given.
 */
export interface ScI18nConfig {
  /** The locale the templates are written in: nothing is loaded for it. */
  sourceLocale: string;
  /** Every locale offered, the source one included. */
  locales: readonly ScLocale[];
  /**
   * Angular's locale data, for its pipes: lazy imports written in the app,
   * so each one is a chunk of its own —
   * `{ fr: () => import('@angular/common/locales/fr') }`.
   */
  localeData?: Readonly<Record<string, () => Promise<{ default: unknown }>>>;
  /**
   * A locale's translations (message id → text). By default the
   * `translations` of `i18n/<id>.json`, as `ng extract-i18n --format json`
   * writes them.
   */
  loadTranslations?: (id: string) => Promise<Record<string, string>>;
  /** Where the choice is kept: a cookie, copied to `localStorage`. Default `sc-locale`. */
  storageKey?: string;
}

export const storageKey = (config: ScI18nConfig) =>
  config.storageKey ?? 'sc-locale';

/**
 * The locale to show: the one chosen before (`saved`), else the first of the
 * user's languages offered (or its base: `fr` for `fr-CA`), else the source
 * one. The browser and the server choose alike.
 */
export function chooseLocale(
  config: ScI18nConfig,
  saved: string | null,
  languages: readonly string[],
): string {
  const offered = (id: string | null | undefined) =>
    config.locales.find(
      (locale) => locale.id.toLowerCase() === id?.toLowerCase(),
    )?.id;
  const chosen = offered(saved);
  if (chosen) return chosen;
  for (const tag of languages) {
    const match = offered(tag) ?? offered(tag.split('-')[0]);
    if (match) return match;
  }
  return config.sourceLocale;
}

/**
 * The locale offered for an id — the one Angular has, its extensions aside
 * (`ar` for `ar-u-fw-sun`) — or for its base (`fr` for `fr-CA`).
 */
export function findLocale(
  config: ScI18nConfig,
  id: string,
): ScLocale | undefined {
  const base = new Intl.Locale(id).baseName.toLowerCase();
  return (
    config.locales.find((locale) => locale.id.toLowerCase() === base) ??
    config.locales.find(
      (locale) => locale.id.toLowerCase() === base.split('-')[0],
    )
  );
}

/**
 * The locale Angular is given (`LOCALE_ID`): the id, carrying the week's
 * first day when the locale sets one, as Unicode's `fw` (`ar-u-fw-sun`), which `Intl` reads, and so every
 * calendar. Its translations and `<html lang>` keep the id itself.
 */
export function withWeekStart(config: ScI18nConfig, id: string): string {
  const firstDayOfWeek = findLocale(config, id)?.firstDayOfWeek;
  if (!firstDayOfWeek) return id;
  return new Intl.Locale(id, {
    firstDayOfWeek,
  } as Intl.LocaleOptions).toString();
}

/** The locale's writing direction: the app's, else the platform's. */
export function localeDir(config: ScI18nConfig, id: string): 'ltr' | 'rtl' {
  return (
    config.locales.find((locale) => locale.id === id)?.dir ??
    new Intl.Locale(id).getTextInfo().direction ??
    'ltr'
  );
}

/** The app's locales, given by `withI18n()`. */
export const SC_I18N_CONFIG = new InjectionToken<ScI18nConfig>(
  'SC_I18N_CONFIG',
);
