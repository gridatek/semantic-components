import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { nova } from '@semantic-components/styles/nova';
import { provideSemanticComponents } from '@semantic-components/ui';
import { withI18n } from '@semantic-components/ui/i18n';
import { appRoutes } from './app-routes';
import { I18N } from './i18n';
import { useLibraryFormatting } from './shared/format';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // The pages' formatting: the library's formatters, taken once.
    provideAppInitializer(useLibraryFormatting),
    // nova: shadcn's base-nova, the reference's own style.
    provideSemanticComponents({ preset: { style: nova } }, withI18n(I18N)),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // A page's route parameters (:slug, :id) as its inputs.
      withComponentInputBinding(),
    ),
  ],
};
