import { loadTranslations } from '@angular/localize';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const translationFiles: Record<string, () => Promise<Record<string, string>>> =
  {
    'fr-FR': () => import('./i18n/fr-FR.json').then((m) => m.default),
    'ar-MA': () => import('./i18n/ar-MA.json').then((m) => m.default),
    'ar-EG': () => import('./i18n/ar-EG.json').then((m) => m.default),
  };

async function main() {
  const locale = localStorage.getItem('sc-locale') ?? 'en-US';

  if (locale !== 'en-US' && translationFiles[locale]) {
    const translations = await translationFiles[locale]();
    loadTranslations(translations);
  }

  await bootstrapApplication(App, appConfig);
}

main().catch((err) => console.error(err));
