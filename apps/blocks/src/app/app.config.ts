import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideSemanticComponents } from '@semantic-components/ui';
import { withI18n } from '@semantic-components/ui/i18n';
import { appRoutes } from './app-routes';
import { I18N } from './i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSemanticComponents({}, withI18n(I18N)),
    provideRouter(
      appRoutes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }), // Enable reloading on same URL navigation for mobile menu
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
