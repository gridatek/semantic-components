import { test, expect } from '@playwright/test';

import { expectNoA11yViolations } from '../../a11y';

test.describe('Fieldset Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/field/fieldset-demo');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });

  test('should render a fieldset with legend', async ({ page }) => {
    const fieldset = page.locator('fieldset');
    await expect(fieldset).toBeVisible();

    const legend = page.locator('legend');
    await expect(legend).toContainText('Personal Information');
  });

  test('should render three input fields', async ({ page }) => {
    const inputs = page.locator('input[scInput]');
    await expect(inputs).toHaveCount(3);
  });

  test('should render labels for all fields', async ({ page }) => {
    for (const name of ['First Name', 'Last Name', 'Email']) {
      const label = page.locator('label', { hasText: name });
      await expect(label).toBeVisible();
    }
  });
});
