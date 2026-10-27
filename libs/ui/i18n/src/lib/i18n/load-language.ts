import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import {
  type ScLanguagesConfig,
  languageDir,
  storageKey,
} from './languages-config';

/**
 * Before bootstrapping, in `main.ts` (the app's code imported after it):
 * picks the language — the one chosen before, else the browser's, else the
 * source one — loads its translations and locale data, and sets `<html lang>`,
 * `<html dir>` and `$localize.locale`, which Angular's `LOCALE_ID` follows.
 * If they fail to load: the source language. In the browser.
 */
export async function loadLanguage(config: ScLanguagesConfig): Promise<void> {
  let language = chosenLanguage(config);
  if (language !== config.sourceLanguage) {
    try {
      const [translations, data] = await Promise.all([
        (config.loadTranslations ?? fetchTranslations)(language),
        config.localeData?.[language]?.(),
      ]);
      loadTranslations(translations);
      if (data) registerLocaleData(data.default);
    } catch (error) {
      console.error(
        `"${language}" could not be loaded; "${config.sourceLanguage}" instead.`,
        error,
      );
      language = config.sourceLanguage;
    }
  }
  $localize.locale = language;
  const html = document.documentElement;
  html.lang = language;
  html.dir = languageDir(config, language);
}

/** The language chosen before, else the first of the browser's offered (or its base: `fr` for `fr-CA`), else the source one. */
function chosenLanguage(config: ScLanguagesConfig): string {
  const offered = (code: string | null | undefined) =>
    config.languages.find(
      (language) => language.code.toLowerCase() === code?.toLowerCase(),
    )?.code;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey(config));
  } catch {
    // No storage: the browser's language.
  }
  const chosen = offered(stored);
  if (chosen) return chosen;
  for (const code of navigator.languages) {
    const match = offered(code) ?? offered(code.split('-')[0]);
    if (match) return match;
  }
  return config.sourceLanguage;
}

async function fetchTranslations(
  code: string,
): Promise<Record<string, string>> {
  const response = await fetch(`i18n/${code}.json`);
  if (!response.ok) throw new Error(`i18n/${code}.json: ${response.status}`);
  return (await response.json()).translations;
}
