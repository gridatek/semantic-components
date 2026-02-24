import { loadTranslations } from '@angular/localize';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, i18nConfig } from './app/app.config';
import { App } from './app/app';

async function main() {
  const localeCode = localStorage.getItem('sc-locale') ?? 'en-US';
  const locale = i18nConfig.supportedLocales.find((l) => l.code === localeCode);

  if (locale?.loadTranslations) {
    const translations = await locale.loadTranslations();
    loadTranslations(translations);
  }

  await bootstrapApplication(App, appConfig);
}

main().catch((err) => console.error(err));
