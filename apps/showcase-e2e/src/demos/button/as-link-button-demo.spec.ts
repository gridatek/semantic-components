import { test, expect } from '@playwright/test';

test.describe('As Link Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/as-link-button-demo');
  });

  test('should render all six link buttons', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    await expect(links).toHaveCount(6);
  });

  test('should use anchor elements instead of buttons', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const tagName = await links.nth(i).evaluate((el) => el.tagName);
      expect(tagName).toBe('A');
    }
  });

  test('should not have type attribute on anchor elements', async ({
    page,
  }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).not.toHaveAttribute('type');
    }
  });

  test('should have href attributes', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('href', '#');
    }
  });

  test('should render Default Link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Default' });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/bg-primary/);
  });

  test('should render Outline Link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Outline' });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/border-border/);
  });

  test('should render Secondary Link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Secondary' });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/bg-secondary/);
  });

  test('should render Ghost Link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Ghost' });
    await expect(link).toBeVisible();
  });

  test('should render Destructive Link', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Destructive' });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/text-destructive/);
  });

  test('should render Link variant', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Link' });
    await expect(link).toBeVisible();
    await expect(link).toHaveClass(/underline-offset-4/);
  });

  test('should have data-slot attribute', async ({ page }) => {
    const links = page.locator('a[sc-link]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('data-slot', 'link');
    }
  });
});
