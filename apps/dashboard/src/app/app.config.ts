import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { nova } from '@semantic-components/presets/nova';
import { provideSemanticComponents } from '@semantic-components/ui';
import { withI18n } from '@semantic-components/ui/i18n';
import { appRoutes } from './app-routes';
import { I18N } from './i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // nova: shadcn's base-nova, the reference's own style.
    provideSemanticComponents({ preset: nova }, withI18n(I18N)),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // A page's route parameters (:slug, :id) as its inputs.
      withComponentInputBinding(),
    ),
  ],
};
