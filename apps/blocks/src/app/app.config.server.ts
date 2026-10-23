import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// The `ssr` build only (CI): rendered on the server, then hydrated.
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideClientHydration(withEventReplay()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
