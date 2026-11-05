import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/marker/${name}-marker-demo`;
const markers = (page: Page) => page.locator('[data-slot="marker"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: notes, a status announced, a labeled divider; icons hidden', async ({
  page,
}) => {
  await page.goto('/demos/marker/marker-usage-demo');
  await expect(markers(page)).toHaveCount(4);
  await expect(page.getByRole('status').first()).toHaveText('Thinking...');
  await expect(
    page.locator('[data-slot="marker-icon"]').first(),
  ).toHaveAttribute('aria-hidden', 'true');
});

test('Variants: each one marked; the separator draws a line each side', async ({
  page,
}) => {
  await page.goto(demo('variants'));
  const variants = await markers(page).evaluateAll((all) =>
    all.map((m) => m.getAttribute('data-variant')),
  );
  expect(variants).toEqual(['default', 'separator', 'border']);
  const lines = await markers(page)
    .nth(1)
    .evaluate((m) => [
      getComputedStyle(m, '::before').height,
      getComputedStyle(m, '::after').height,
    ]);
  expect(lines).toEqual(['1px', '1px']);
  await expect(markers(page).nth(2)).toHaveCSS('border-bottom-width', '1px');
  // A labeled divider: no separator role (its label would be lost).
  await expect(page.getByRole('separator')).toHaveCount(0);
});

test('Status and Shimmer: announced; the streaming text shimmers', async ({
  page,
}) => {
  await page.goto(demo('status'));
  await expect(
    page.getByRole('status').filter({ hasText: 'Compacting conversation' }),
  ).toBeVisible();

  await page.goto(demo('shimmer'));
  await expect(
    page.locator('[data-slot="marker-content"]').first(),
  ).not.toHaveCSS('animation-name', 'none');
});

test('With icon: beside the content, or above it', async ({ page }) => {
  await page.goto(demo('icon'));
  const stacked = markers(page).nth(2);
  const [icon, content] = [
    await box(stacked.locator('[data-slot="marker-icon"]')),
    await box(stacked.locator('[data-slot="marker-content"]')),
  ];
  expect(icon.y + icon.height).toBeLessThanOrEqual(content.y + 1);
});

test('Links and buttons: named by their content; a button of type button', async ({
  page,
}) => {
  await page.goto(demo('links-buttons'));
  await expect(
    page.getByRole('link', { name: 'View the pull request' }),
  ).toHaveAttribute('href', '#links-and-buttons');
  const revert = page.getByRole('button', { name: 'Revert this change' });
  await expect(revert).toHaveAttribute('type', 'button');
  await revert.click();
  await expect(page.getByText('Reverted.')).toBeVisible();
});

test('RTL: the icon on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const first = markers(page).first();
  await expectRtl(first);
  const [icon, content] = [
    await box(first.locator('[data-slot="marker-icon"]')),
    await box(first.locator('[data-slot="marker-content"]')),
  ];
  expect(icon.x).toBeGreaterThan(content.x);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['variants', 'separator', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
