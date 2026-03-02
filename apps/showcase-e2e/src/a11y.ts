import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

export async function expectNoA11yViolations(page: Page) {
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    .analyze();
  expect(results.violations).toEqual([]);
}
