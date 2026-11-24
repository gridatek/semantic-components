import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSemanticComponents } from '@semantic-components/ui';
import { appRoutes } from './app-routes';
import { customStyle } from './custom-style';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // The app's own style: a copy of nova it can change (custom-style/), kept
    // in step with nova by scripts/sync-custom-style.mjs.
    provideSemanticComponents({ preset: { style: customStyle } }),
    provideRouter(appRoutes),
  ],
};
