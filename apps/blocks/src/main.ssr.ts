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
).catch((err) => console.error(err));
