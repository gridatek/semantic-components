import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { sera } from '@semantic-components/presets/sera';
import { provideSemanticComponents } from '@semantic-components/ui';
import { appRoutes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // The Sera preset, the whole app's: chosen at start, as in any app.
    provideSemanticComponents({ preset: sera }),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // A page's route parameters (:id, ?issue) as its inputs.
      withComponentInputBinding(),
    ),
  ],
};
