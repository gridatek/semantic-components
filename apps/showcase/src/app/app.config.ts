import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideScConfig } from '@semantic-components/ui';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Alt+T moves focus to the toasts (the toaster's template names it); Escape goes back.
    provideScConfig({
      toaster: { hotkey: ['altKey', 'KeyT'], layout: 'list' },
    }),
    // Overlays (dialogs, menus, tooltips) stay visible in fullscreen, e.g. in
    // the PDF viewer's presentation mode.
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    provideRouter(
      appRoutes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }), // Enable reloading on same URL navigation for mobile menu
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
