import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import { type ScI18nConfig, localeDir, storageKey } from './i18n-config';

/**
 * Before bootstrapping, in `main.ts` (the app's code imported after it):
 * picks the locale — the one chosen before, else the browser's, else the
 * source one — loads its translations and locale data, and sets `<html lang>`,
 * `<html dir>` and `$localize.locale`, which Angular's `LOCALE_ID` follows.
 * If they fail to load: the source locale. In the browser.
 */
export async function loadLocale(config: ScI18nConfig): Promise<void> {
  let locale = chosenLocale(config);
  if (locale !== config.sourceLocale) {
    try {
      const [translations, data] = await Promise.all([
        (config.loadTranslations ?? fetchTranslations)(locale),
        config.localeData?.[locale]?.(),
      ]);
      loadTranslations(translations);
      if (data) registerLocaleData(data.default);
    } catch (error) {
      console.error(
        `"${locale}" could not be loaded; "${config.sourceLocale}" instead.`,
        error,
      );
      locale = config.sourceLocale;
    }
  }
  $localize.locale = locale;
  const html = document.documentElement;
  html.lang = locale;
  html.dir = localeDir(config, locale);
}

/** The locale chosen before, else the first of the browser's offered (or its base: `fr` for `fr-CA`), else the source one. */
function chosenLocale(config: ScI18nConfig): string {
  const offered = (id: string | null | undefined) =>
    config.locales.find(
      (locale) => locale.id.toLowerCase() === id?.toLowerCase(),
    )?.id;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey(config));
  } catch {
    // No storage: the browser's locale.
  }
  const chosen = offered(stored);
  if (chosen) return chosen;
  for (const tag of navigator.languages) {
    const match = offered(tag) ?? offered(tag.split('-')[0]);
    if (match) return match;
  }
  return config.sourceLocale;
}

async function fetchTranslations(id: string): Promise<Record<string, string>> {
  const response = await fetch(`i18n/${id}.json`);
  if (!response.ok) throw new Error(`i18n/${id}.json: ${response.status}`);
  return (await response.json()).translations;
}
