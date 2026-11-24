// Playwright's own test, not ../test: the app is kept from loading here, and
// ../test would wait for a hydration that never comes.
import { type Page, expect, test } from '@playwright/test';

/**
 * The script the server puts in `<head>` (ScPresetManager, theme-script.ts)
 * draws the page in the user's mode before the app runs: "system" from
 * `prefers-color-scheme`, which the server can't know, and a choice only the
 * `localStorage` copy holds. The app's scripts are blocked, so what the page
 * shows is the inline script's alone. The CI job `ssr` only (`SSR=1`).
 */
test.describe('Theme script', () => {
  test.skip(!process.env['SSR'], 'The CI job `ssr` only');

  /** The page as the server sent it, with no script of the app's. */
  async function withoutApp(page: Page) {
    await page.route(/\.m?js(\?|$)/, (route) => route.abort());
    await page.goto('/docs/guides/theming');
  }

  test('the system in dark: dark before the app runs', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await withoutApp(page);
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  });

  test('the system in light: light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await withoutApp(page);
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
  });

  test('light chosen, the system in dark: light', async ({ page, baseURL }) => {
    await page
      .context()
      .addCookies([{ name: 'sc-mode', value: 'light', url: baseURL ?? '' }]);
    await page.emulateMedia({ colorScheme: 'dark' });
    await withoutApp(page);
    await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
  });

  test('a choice in localStorage only (no cookie): applied', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('sc-mode', 'dark');
      localStorage.setItem('sc-theme', 'rose');
    });
    await page.emulateMedia({ colorScheme: 'light' });
    await withoutApp(page);
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'rose');
  });

  test('once, after the charset', async ({ request }) => {
    const html = await (await request.get('/docs/guides/theming')).text();
    expect(html.match(/id="sc-theme-script"/g)).toHaveLength(1);
    expect(html.indexOf('id="sc-theme-script"')).toBeGreaterThan(
      html.indexOf('<meta charset'),
    );
  });
});
