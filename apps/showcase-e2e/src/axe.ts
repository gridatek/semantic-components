import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

/**
 * No axe violations on the page. `dark`: in dark mode — the browser's color
 * scheme dark, which the theme follows by default (the `.dark` class).
 */
export async function expectNoA11yViolations(
  page: Page,
  { dark = false }: { dark?: boolean } = {},
) {
  if (dark) {
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  }
  // Settled: the page's code loaded (its route is lazy) — network idle, but
  // not forever: a page loading images (or Firefox) may never get there —
  // the page shown (its heading), its fonts in, and what fades or slides in
  // arrived: colours measured mid-fade fail contrast.
  await page
    .waitForLoadState('networkidle', { timeout: 10_000 })
    .catch(() => undefined);
  await page.locator('h1').first().waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    const finite = document
      .getAnimations()
      .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity);
    await Promise.race([
      Promise.allSettled(finite.map((a) => a.finished)),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  });
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    .analyze();
  expect(results.violations).toEqual([]);
}
