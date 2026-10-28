/** A locale the app offers. */
export interface ScLocale {
  /** Its ID, a BCP 47 tag — `LOCALE_ID`'s value: `fr`, `pt-BR`. */
  id: string;
  /** Its name, written in itself: `Français`. */
  label: string;
  /** Its writing direction; left out, the platform's (`Intl.Locale#getTextInfo()`). */
  dir?: 'ltr' | 'rtl';
}

/**
 * The app's locales, and where their translations come from: the `i18n` part
 * of `provideScConfig()`, and what `loadLocale()` is given.
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
  /** The cookie the choice is kept in — the server reads it too. Default `sc-locale`. */
  cookie?: string;
}

export const cookieName = (config: ScI18nConfig) =>
  config.cookie ?? 'sc-locale';

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

/** The locale's writing direction: the app's, else the platform's. */
export function localeDir(config: ScI18nConfig, id: string): 'ltr' | 'rtl' {
  return (
    config.locales.find((locale) => locale.id === id)?.dir ??
    new Intl.Locale(id).getTextInfo().direction ??
    'ltr'
  );
}

declare module '@semantic-components/ui' {
  interface ScConfig {
    /** The app's locales (`@semantic-components/ui/i18n`). */
    i18n?: ScI18nConfig;
  }
}
