import { test, expect } from '@playwright/test';

import { expectNoA11yViolations } from '../../a11y';

test.describe('Basic Field Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/field/basic-field-demo');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await expectNoA11yViolations(page);
  });

  test('should render a labeled email input', async ({ page }) => {
    const input = page.getByRole('textbox', { name: 'Email' });
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('type', 'email');
  });

  test('should render field description', async ({ page }) => {
    const description = page.locator('[data-slot="field-description"]');
    await expect(description).toBeVisible();
    await expect(description).toContainText(
      "We'll never share your email with anyone else.",
    );
  });

  test('should associate input with description via aria-describedby', async ({
    page,
  }) => {
    const input = page.getByRole('textbox', { name: 'Email' });
    const describedby = await input.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();

    const description = page.locator(`#${describedby}`);
    await expect(description).toBeVisible();
  });
});
