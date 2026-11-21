import { provideHotkeys } from '@tanstack/angular-hotkeys';
import {
  FullscreenOverlayContainer,
  OverlayContainer,
} from '@angular/cdk/overlay';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import {
  SC_CONFIG,
  ScStorage,
  provideSemanticComponents,
} from '@semantic-components/ui';
import { withBarcodeScanner } from '@semantic-components/ui/barcode-scanner';
import { withCodeHighlighter } from '@semantic-components/ui/code-block';
import { appRoutes } from './app-routes';
import { STYLES, provideStyleSheets, styleFrom } from './styles';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSemanticComponents(
      {
        // Alt+T moves focus to the toasts (the toaster's template names it); Escape goes back.
        toaster: { hotkey: ['altKey', 'KeyT'] },
        // Charts mirror themselves in right to left (the RTL examples).
        charts: { followDirection: true },
      },
      // Code blocks highlighted with Shiki, each language loaded when first shown.
      withCodeHighlighter(),
      // The scanner's decoder, where the browser has no BarcodeDetector: served
      // with the site's assets (project.json), not a CDN.
      withBarcodeScanner({ wasmUrl: '/zxing/zxing_reader.wasm' }),
    ),
    // The style picked on /customize (lyra by default): its cookie, read from
    // the request when the server renders — a page is drawn in it from the
    // first paint, and hydration keeps those classes.
    {
      provide: SC_CONFIG,
      useFactory: () => ({
        toaster: { hotkey: ['altKey', 'KeyT'] },
        charts: { followDirection: true },
        style: STYLES[styleFrom(inject(ScStorage))],
      }),
    },
    // The style's stylesheets (Typeset's variables, the editor), linked at start.
    provideStyleSheets(),
    // Keyboard shortcuts (the docs search, Mod+K): TanStack Hotkeys.
    provideHotkeys(),
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
