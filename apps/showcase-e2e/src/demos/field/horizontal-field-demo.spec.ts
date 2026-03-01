import { test, expect } from '@playwright/test';

import { expectNoA11yViolations } from '../../a11y';

test.describe('Horizontal Field Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/field/horizontal-field-demo');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });

  test('should render a labeled username input', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Username' });
    await expect(input).toBeVisible();
  });

  test('should use horizontal orientation', async ({ page }) => {
    const field = page.locator('[data-slot="field"]');
    await expect(field).toHaveAttribute('data-orientation', 'horizontal');
  });
});
