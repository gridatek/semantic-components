import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

/** Rules that require full-page structure (landmarks, headings) — not applicable to isolated demo routes. */
const FULL_PAGE_RULES = ['landmark-one-main', 'page-has-heading-one', 'region'];

export async function expectNoA11yViolations(page: Page) {
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    .analyze();
  expect(results.violations).toEqual([]);
}

export async function expectNoA11yViolationsForDemo(page: Page) {
  const results = await new AxeBuilder({ page })
    .disableRules(FULL_PAGE_RULES)
    .analyze();
  expect(results.violations).toEqual([]);
}
