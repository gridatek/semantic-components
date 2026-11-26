import { expect, test } from '../test';

/**
 * The mode tells the browser: `ScPresetManager` sets the page's
 * `color-scheme` with it, inline on `<html>` — so the browser's own parts
 * (scrollbars, native controls) and every `light-dark()` follow the app's
 * mode, not the system's. The showcase imports pdf.js's `pdf_viewer.css`,
 * whose `:root { color-scheme: light dark }` would hand them back to the
 * system (pdf.js issue 19886): the inline style wins over it.
 */
test.describe('Preset mode: color-scheme', () => {
  test('follows the mode chosen, not the system', async ({ page, baseURL }) => {
    await page
      .context()
      .addCookies([{ name: 'sc-mode', value: 'light', url: baseURL ?? '' }]);
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/demos/theming/theme-toggle-demo');
    const html = page.locator('html');
    await expect(html).toHaveCSS('color-scheme', 'light');
    await expect(html).toHaveAttribute('style', /color-scheme: light/);

    // Dark: the class and the scheme together.
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect(html).toHaveCSS('color-scheme', 'dark');

    // And back.
    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(html).not.toHaveClass(/\bdark\b/);
    await expect(html).toHaveCSS('color-scheme', 'light');
  });

  test('light-dark() follows it', async ({ page, baseURL }) => {
    await page
      .context()
      .addCookies([{ name: 'sc-mode', value: 'dark', url: baseURL ?? '' }]);
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/demos/theming/theme-toggle-demo');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    // A light-dark() colour resolves to its dark side, the system in light.
    await expect
      .poll(() =>
        page.evaluate(() => {
          const probe = document.createElement('span');
          probe.style.color = 'light-dark(rgb(255, 0, 0), rgb(0, 0, 255))';
          document.body.append(probe);
          const color = getComputedStyle(probe).color;
          probe.remove();
          return color;
        }),
      )
      .toBe('rgb(0, 0, 255)');
  });
});

test.describe('Preset mode: across tabs', () => {
  test('dark chosen in one tab: the other tab turns dark too, and back', async ({
    page,
    baseURL,
  }) => {
    await page
      .context()
      .addCookies([{ name: 'sc-mode', value: 'light', url: baseURL ?? '' }]);
    const other = await page.context().newPage();
    await page.goto('/demos/theming/theme-toggle-demo');
    await other.goto('/demos/theming/theme-toggle-demo');
    await expect(other.locator('html')).not.toHaveClass(/\bdark\b/);
    // The tab clicked keeps its fade: transitions never paused there.
    await page.evaluate(() => {
      const w = window as unknown as { paused: boolean };
      w.paused = false;
      new MutationObserver((records) => {
        for (const record of records)
          for (const node of record.addedNodes)
            if (node.textContent?.includes('transition:none')) w.paused = true;
      }).observe(document.head, { childList: true });
    });

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    expect(
      await page.evaluate(
        () => (window as unknown as { paused: boolean }).paused,
      ),
    ).toBe(false);
    // The other tab: the browser's storage event.
    await expect(other.locator('html')).toHaveClass(/\bdark\b/);
    // Switched, not faded: no colour transition from the old mode (seen as
    // the old colours, then a slow change, on coming back to the tab).
    expect(
      await other.evaluate(
        () =>
          document.getAnimations().filter((a) => a instanceof CSSTransition)
            .length,
      ),
    ).toBe(0);
    await expect(other.locator('html')).toHaveCSS('color-scheme', 'dark');

    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(other.locator('html')).not.toHaveClass(/\bdark\b/);
  });
});
