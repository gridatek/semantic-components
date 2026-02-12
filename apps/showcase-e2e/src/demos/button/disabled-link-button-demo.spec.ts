import { test, expect } from '@playwright/test';

test.describe('Disabled Link Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/disabled-link-button-demo');
  });

  test('should render all four disabled link buttons', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    await expect(links).toHaveCount(4);
  });

  test('should have aria-disabled on all link buttons', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('aria-disabled', 'true');
    }
  });

  test('should render disabled default link button', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Default' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled secondary link button', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Secondary' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled destructive link button', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Destructive' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  test('should render disabled outline link button', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Outline' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have reduced opacity when disabled', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const opacity = await links
        .nth(i)
        .evaluate((el) => window.getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBeLessThan(1);
    }
  });

  test('should use anchor elements', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const tagName = await links.nth(i).evaluate((el) => el.tagName);
      expect(tagName).toBe('A');
    }
  });

  test('should have data-slot attribute', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('data-slot', 'link');
    }
  });
});
