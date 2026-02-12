import { test, expect } from '@playwright/test';

test.describe('Sizes Button Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/button/sizes-button-demo');
  });

  test('should render all four size buttons', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    await expect(buttons).toHaveCount(4);
  });

  test('should render large button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Large' });
    await expect(button).toBeVisible();
  });

  test('should render default size button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Default' });
    await expect(button).toBeVisible();
  });

  test('should render small button', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Small' });
    await expect(button).toBeVisible();
  });

  test('should render icon-only button with SVG', async ({ page }) => {
    const buttons = page.locator('button[sc-button]');
    const iconButton = buttons.nth(3);
    await expect(iconButton).toBeVisible();
    await expect(iconButton.locator('svg')).toBeVisible();
  });

  test('should apply correct size classes', async ({ page }) => {
    const lgButton = page.getByRole('button', { name: 'Large' });
    await expect(lgButton).toHaveClass(/h-9/);

    const defaultButton = page.getByRole('button', { name: 'Default' });
    await expect(defaultButton).toHaveClass(/h-8/);

    const smButton = page.getByRole('button', { name: 'Small' });
    await expect(smButton).toHaveClass(/h-7/);

    const iconButton = page.locator('button[sc-button]').nth(3);
    await expect(iconButton).toHaveClass(/size-8/);
  });

  test('should have different heights for different sizes', async ({
    page,
  }) => {
    const lgButton = page.getByRole('button', { name: 'Large' });
    const defaultButton = page.getByRole('button', { name: 'Default' });
    const smButton = page.getByRole('button', { name: 'Small' });

    const lgBox = await lgButton.boundingBox();
    const defaultBox = await defaultButton.boundingBox();
    const smBox = await smButton.boundingBox();

    expect(lgBox!.height).toBeGreaterThan(defaultBox!.height);
    expect(defaultBox!.height).toBeGreaterThan(smBox!.height);
  });
});
