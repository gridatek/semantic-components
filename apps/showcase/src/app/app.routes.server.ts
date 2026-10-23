import { RenderMode, ServerRoute } from '@angular/ssr';

// Every page rendered on request: what the e2e tests check is the server's render.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
