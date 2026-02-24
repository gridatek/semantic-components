import { loadTranslations } from '@angular/localize';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, i18nConfig } from './app/app.config';
import { App } from './app/app';

async function main() {
  const storageKey = i18nConfig.storageKey ?? 'sc-locale';
  const localeCode =
    localStorage.getItem(storageKey) ?? i18nConfig.defaultLocaleCode;
  const locale =
    i18nConfig.supportedLocales.find((l) => l.code === localeCode) ??
    i18nConfig.supportedLocales.find(
      (l) => l.code === i18nConfig.defaultLocaleCode,
    );

  if (locale?.loadTranslations) {
    try {
      const translations = await locale.loadTranslations();
      loadTranslations(translations);
    } catch (e) {
      console.warn(
        `Failed to load translations for "${locale.code}", falling back to default.`,
        e,
      );
    }
  }

  await bootstrapApplication(App, appConfig);
}

main().catch((err) => console.error(err));
