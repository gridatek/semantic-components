/** A language the app offers. */
export interface ScLanguage {
  /** Its BCP 47 code: `fr`, `pt-BR`. */
  code: string;
  /** Its name, written in itself: `Français`. */
  label: string;
}

/**
 * The app's languages, and where their translations come from: the `languages`
 * part of `provideScConfig()`, and what `loadLanguage()` is given.
 */
export interface ScLanguagesConfig {
  /** The language the templates are written in: nothing is loaded for it. */
  sourceLanguage: string;
  /** Every language offered, the source one included. */
  languages: readonly ScLanguage[];
  /**
   * Angular's locale data, for its pipes: lazy imports written in the app,
   * so each one is a chunk of its own —
   * `{ fr: () => import('@angular/common/locales/fr') }`.
   */
  localeData?: Readonly<Record<string, () => Promise<{ default: unknown }>>>;
  /**
   * A language's translations (message id → text). By default the
   * `translations` of `i18n/<code>.json`, as `ng extract-i18n --format json`
   * writes them.
   */
  loadTranslations?: (code: string) => Promise<Record<string, string>>;
  /** Where the choice is kept in `localStorage`. Default `sc-language`. */
  storageKey?: string;
}

export const storageKey = (config: ScLanguagesConfig) =>
  config.storageKey ?? 'sc-language';

/** The language's writing direction, from the platform. */
export function textDirection(code: string): 'ltr' | 'rtl' {
  return new Intl.Locale(code).getTextInfo().direction ?? 'ltr';
}

declare module '@semantic-components/ui' {
  interface ScConfig {
    /** The app's languages (`@semantic-components/ui/i18n`). */
    languages?: ScLanguagesConfig;
  }
}
