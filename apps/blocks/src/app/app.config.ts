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
import { SC_LOCALE_CONFIG, ScLocaleConfig } from './core/locale';

const localeConfig: ScLocaleConfig = {
  defaultLocale: 'en-US',
  locales: [
    {
      code: 'en-US',
      label: 'English (US)',
      nativeLabel: 'English (US)',
      direction: 'ltr',
    },
    {
      code: 'fr-FR',
      label: 'French (France)',
      nativeLabel: 'Français (France)',
      direction: 'ltr',
    },
    {
      code: 'ar-MA',
      label: 'Arabic (Morocco)',
      nativeLabel: 'العربية (المغرب)',
      direction: 'rtl',
    },
    {
      code: 'ar-EG',
      label: 'Arabic (Egypt)',
      nativeLabel: 'العربية (مصر)',
      direction: 'rtl',
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
    { provide: SC_LOCALE_CONFIG, useValue: localeConfig },
  ],
};
