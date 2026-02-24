import { registerLocaleData } from '@angular/common';
import { loadTranslations } from '@angular/localize';
import localeFrFR from '@angular/common/locales/fr';
import localeExtraFrFR from '@angular/common/locales/extra/fr';
import localeArMA from '@angular/common/locales/ar-MA';
import localeExtraArMA from '@angular/common/locales/extra/ar-MA';
import localeArEG from '@angular/common/locales/ar-EG';
import localeExtraArEG from '@angular/common/locales/extra/ar-EG';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, i18nConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localeFrFR, 'fr-FR', localeExtraFrFR);
registerLocaleData(localeArMA, undefined, localeExtraArMA);
registerLocaleData(localeArEG, undefined, localeExtraArEG);

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
