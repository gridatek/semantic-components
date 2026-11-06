import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a separator across, one pixel high, full width', async ({
  page,
}) => {
  await page.goto('/demos/separator/separator-usage-demo');
  const line = page.getByRole('separator');
  await expect(line).toHaveAttribute('aria-orientation', 'horizontal');
  const [b, parent] = [
    await box(line),
    await box(page.locator('[scSeparator] >> xpath=..')),
  ];
  expect(b.height).toBe(1);
  expect(Math.round(b.width)).toBe(Math.round(parent.width));
});

test('Vertical: up and down, one pixel wide, as tall as its row', async ({
  page,
}) => {
  await page.goto('/demos/separator/vertical-separator-demo');
  const lines = page.getByRole('separator');
  await expect(lines).toHaveCount(2);
  await expect(lines.first()).toHaveAttribute('aria-orientation', 'vertical');
  const [b, row] = [
    await box(lines.first()),
    await box(page.locator('[scSeparator] >> xpath=..').first()),
  ];
  expect(b.width).toBe(1);
  expect(Math.round(b.height)).toBe(Math.round(row.height));
});

test('Menu: the last column and its line only from md up', async ({ page }) => {
  await page.setViewportSize({ width: 500, height: 600 });
  await page.goto('/demos/separator/menu-separator-demo');
  await expect(page.getByRole('separator')).toHaveCount(1);
  await page.setViewportSize({ width: 1024, height: 600 });
  await expect(page.getByRole('separator')).toHaveCount(2);
});
