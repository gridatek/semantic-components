import { test, expect } from '@playwright/test';

test.describe('Variants Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/variants-button-demo');
  });

  test('should render all six variant buttons', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    await expect(buttons).toHaveCount(6);
  });

  test('should render default variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' });
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('data-slot', 'button');
  });

  test('should render secondary variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Secondary' });
    await expect(button).toBeVisible();
  });

  test('should render destructive variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Destructive' });
    await expect(button).toBeVisible();
  });

  test('should render outline variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Outline' });
    await expect(button).toBeVisible();
  });

  test('should render ghost variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Ghost' });
    await expect(button).toBeVisible();
  });

  test('should render link variant button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Link' });
    await expect(button).toBeVisible();
  });

  test('should have type="button" on all buttons', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('type', 'button');
    }
  });

  test('should apply variant-specific classes', async ({ page }) => {
    const defaultBtn = page.getByRole('button', { name: 'Default' });
    await expect(defaultBtn).toHaveClass(/bg-primary/);

    const outlineBtn = page.getByRole('button', { name: 'Outline' });
    await expect(outlineBtn).toHaveClass(/border-border/);

    const secondaryBtn = page.getByRole('button', { name: 'Secondary' });
    await expect(secondaryBtn).toHaveClass(/bg-secondary/);

    const ghostBtn = page.getByRole('button', { name: 'Ghost' });
    await expect(ghostBtn).toHaveClass(/hover:bg-muted/);

    const destructiveBtn = page.getByRole('button', { name: 'Destructive' });
    await expect(destructiveBtn).toHaveClass(/bg-destructive/);

    const linkBtn = page.getByRole('button', { name: 'Link' });
    await expect(linkBtn).toHaveClass(/underline-offset-4/);
  });

  test('should be focusable via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const defaultBtn = page.getByRole('button', { name: 'Default' });
    await expect(defaultBtn).toBeFocused();
  });
});
