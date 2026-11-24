import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import { readStorage } from '@semantic-components/ui';
import {
  LOCALE_KEY,
  type ScI18nConfig,
  chooseLocale,
  localeDir,
} from './i18n-config';

/**
 * Before bootstrapping, in `main.ts` (the app's code imported after it):
 * picks the locale — the one chosen before, else the browser's, else the
 * source one — loads its translations and locale data, and sets `<html lang>`,
 * `<html dir>` and `$localize.locale`, which Angular's `LOCALE_ID` follows.
 * If they fail to load: the source locale. In the browser. An app whose
 * setup gives a `storagePrefix` gives it here too: the choice is read before
 * the setup exists.
 */
export async function loadLocale(
  config: ScI18nConfig,
  options: { storagePrefix?: string } = {},
): Promise<void> {
  let locale = chooseLocale(
    config,
    readStorage(LOCALE_KEY, options.storagePrefix),
    navigator.languages,
  );
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

async function fetchTranslations(id: string): Promise<Record<string, string>> {
  const response = await fetch(`i18n/${id}.json`);
  if (!response.ok) throw new Error(`i18n/${id}.json: ${response.status}`);
  return (await response.json()).translations;
}
