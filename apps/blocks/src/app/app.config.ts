import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideScConfig } from './core/provide-sc-config';
import { ScI18nConfig } from './core/locale';

const loadArabicTranslations = () =>
  import('../i18n/ar.json').then((m) => m.default);

export const i18nConfig: ScI18nConfig = {
  defaultLocaleCode: 'en-US',
  supportedLocales: [
    {
      code: 'en-US',
      language: 'en',
      label: 'English (US)',
      nativeLabel: 'English (US)',
      direction: 'ltr',
    },
    {
      code: 'fr-FR',
      language: 'fr',
      label: 'French (France)',
      nativeLabel: 'Français (France)',
      direction: 'ltr',
      loadTranslations: () => import('../i18n/fr.json').then((m) => m.default),
    },
    {
      code: 'ar-MA',
      language: 'ar',
      label: 'Arabic (Morocco)',
      nativeLabel: 'العربية (المغرب)',
      direction: 'rtl',
      loadTranslations: loadArabicTranslations,
    },
    {
      code: 'ar-EG',
      language: 'ar',
      label: 'Arabic (Egypt)',
      nativeLabel: 'العربية (مصر)',
      direction: 'rtl',
      loadTranslations: loadArabicTranslations,
    },
  ],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }), // Enable reloading on same URL navigation for mobile menu
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideScConfig({ i18n: i18nConfig }),
  ],
};
