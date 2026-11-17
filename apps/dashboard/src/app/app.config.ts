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
import { appRoutes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // nova: shadcn's base-nova, the reference's own style.
    provideSemanticComponents({ preset: nova }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // A page's route parameters (:slug, :id) as its inputs.
      withComponentInputBinding(),
    ),
  ],
};
