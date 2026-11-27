import { type Response, test as base } from '@playwright/test';

export * from '@playwright/test';

/**
 * Playwright's `test`, for every spec. In the CI job `ssr` (`SSR=1`) a page
 * arrives drawn by the server before Angular runs in it: `goto` and `reload`
 * wait until it has hydrated, so a test never types or clicks into a page
 * that isn't listening yet. Without SSR, Playwright's own.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, use, testInfo) => {
    // The specs' style: their project's (styles-lyra…), else nova — the
    // showcase opens in lyra. Read when the app starts.
    const style =
      (testInfo.project.metadata as { style?: string }).style ?? 'nova';
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: style,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    if (process.env['SSR']) {
      // The app marks <html> once hydrated and stable (main-ssr.ts). Up to a
      // minute: the largest page (/customize) hydrates past 15 s in WebKit on
      // a busy runner, and a test going on clicked into a page not listening
      // yet. A response that isn't a page (a file): nothing to wait for.
      const hydrated = async (response: Response | null) => {
        if (response && !response.headers()['content-type']?.includes('html'))
          return;
        await page
          .locator('html[data-hydrated]')
          .waitFor({ state: 'attached', timeout: 60_000 })
          // A page without the app (an error): nothing to wait for.
          .catch(() => undefined);
      };
      const goto = page.goto.bind(page);
      const reload = page.reload.bind(page);
      page.goto = async (...args) => {
        const response = await goto(...args);
        await hydrated(response);
        return response;
      };
      page.reload = async (...args) => {
        const response = await reload(...args);
        await hydrated(response);
        return response;
      };
    }
    await use(page);
  },
});
