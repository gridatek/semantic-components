import { expectHydrated, routesOf } from './ssr';
import { test } from './test';

/**
 * Every page, rendered on the server, hydrates: Angular's hydration ran, with
 * no mismatch (NG05xx) and no error in the browser. The CI job `ssr` only
 * (`SSR=1`); the server's own errors are in `dist/ssr-showcase.log`, which
 * the job checks after the tests.
 */
test.describe('SSR', () => {
  test.skip(!process.env['SSR'], 'The CI job `ssr` only');

  const routes = [
    '/',
    ...routesOf('apps/showcase/src/app/routes/getting-started.routes.ts'),
    ...routesOf('apps/showcase/src/app/routes/components.routes.ts'),
    ...routesOf('apps/showcase/src/app/routes/demos.routes.ts'),
  ];

  for (const route of new Set(routes)) {
    test(`${route} hydrates`, async ({ page }) => {
      await expectHydrated(page, route);
    });
  }
});
