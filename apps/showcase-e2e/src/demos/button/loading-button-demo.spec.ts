import { test, expect } from '@playwright/test';

test.describe('Loading Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/loading-button-demo');
  });

  test('should render the loading button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Please wait' });
    await expect(button).toBeVisible();
  });

  test('should be disabled', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Please wait' });
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should contain a spinner SVG with animate-spin class', async ({
    page,
  }) => {
    const button = page.getByRole('button', { name: 'Please wait' });
    const svg = button.locator('svg');
    await expect(svg).toBeVisible();
    await expect(svg).toHaveClass(/animate-spin/);
  });

  test('should display "Please wait" text', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Please wait' });
    await expect(button).toContainText('Please wait');
  });

  test('should have reduced opacity', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Please wait' });
    const opacity = await button.evaluate(
      (el) => window.getComputedStyle(el).opacity,
    );
    expect(parseFloat(opacity)).toBeLessThan(1);
  });
});
