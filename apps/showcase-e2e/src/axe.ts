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
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    .analyze();
  expect(results.violations).toEqual([]);
}
