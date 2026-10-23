import { mergeApplicationConfig } from '@angular/core';
import {
  bootstrapApplication,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// The browser entry of the `ssr` build: the app hydrates the server's HTML.
// The default build (main.ts) renders in the browser only.
bootstrapApplication(
  App,
  mergeApplicationConfig(appConfig, {
    providers: [provideClientHydration(withEventReplay())],
  }),
)
  // Hydrated and stable: a mark on <html> for the e2e tests to wait for —
  // Angular has no "hydrated" event (only a dev-mode console message), and
  // a page drawn by the server is visible before Angular listens.
  .then((app) => app.whenStable())
  .then(() => document.documentElement.setAttribute('data-hydrated', ''))
  .catch((err) => console.error(err));
