import { test as base } from '@playwright/test';

export * from '@playwright/test';

/**
 * Playwright's `test`, for every spec. In the CI job `ssr` (`SSR=1`) a page
 * arrives drawn by the server before Angular runs in it: `goto` and `reload`
 * wait until it has hydrated, so a test never types or clicks into a page
 * that isn't listening yet. Without SSR, Playwright's own.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    if (process.env['SSR']) {
      // The app marks <html> once hydrated and stable (main-ssr.ts).
      const hydrated = () =>
        page
          .locator('html[data-hydrated]')
          .waitFor({ state: 'attached', timeout: 15_000 })
          // A page without the app (a file, an error): nothing to wait for.
          .catch(() => undefined);
      const goto = page.goto.bind(page);
      const reload = page.reload.bind(page);
      page.goto = async (...args) => {
        const response = await goto(...args);
        await hydrated();
        return response;
      };
      page.reload = async (...args) => {
        const response = await reload(...args);
        await hydrated();
        return response;
      };
    }
    await use(page);
  },
});
