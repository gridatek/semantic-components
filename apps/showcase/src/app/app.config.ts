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
import { provideCodeHighlighter } from '@semantic-components/ui/code-block';
import { appRoutes } from './app-routes';
import { PRESETS, storedPreset } from './presets';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Code blocks highlighted with Shiki, each language loaded when first shown.
    provideCodeHighlighter(),
    provideScConfig({
      // The one picked in the preset sheet (nova by default).
      preset: PRESETS[storedPreset()],
      // Alt+T moves focus to the toasts (the toaster's template names it); Escape goes back.
      toaster: { hotkey: ['altKey', 'KeyT'] },
    }),
    // Overlays (dialogs, menus, tooltips) stay visible in fullscreen, e.g. in
    // the PDF viewer's presentation mode.
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    provideRouter(
      appRoutes,
      withRouterConfig({ onSameUrlNavigation: 'reload' }), // Enable reloading on same URL navigation for mobile menu
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        // At a section (`#id`): there, not to the top — the table of
        // contents scrolls there once the headings have ids.
        anchorScrolling: 'enabled',
      }),
    ),
  ],
};
