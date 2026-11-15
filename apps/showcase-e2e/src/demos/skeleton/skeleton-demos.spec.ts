import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: it pulses; your shape wins over the preset’s corners', async ({
  page,
}) => {
  await page.goto('/demos/skeleton/skeleton-usage-demo');
  const avatar = page.locator('[scSkeleton]').first();
  await expect(avatar).toHaveCSS('animation-name', 'pulse');
  // rounded-full over the preset's corners: a circle. Its radius is
  // calc(infinity * 1px), each browser's largest length, as each writes it:
  // Chromium's 3.35544e+07px, Firefox's 3.40282e38px, WebKit's in full.
  const radius = await avatar.evaluate((el) =>
    parseFloat(getComputedStyle(el).borderTopLeftRadius),
  );
  expect(radius).toBeGreaterThanOrEqual(9999);
});

test('Reduced motion: it stands still', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demos/skeleton/skeleton-usage-demo');
  await expect(page.locator('[scSkeleton]').first()).toHaveCSS(
    'animation-name',
    'none',
  );
});

test('Card: in the card’s own parts', async ({ page }) => {
  await page.goto('/demos/skeleton/card-skeleton-demo');
  await expect(page.locator('[scCard] [scSkeleton]')).toHaveCount(3);
});

test('Table: five rows of three', async ({ page }) => {
  await page.goto('/demos/skeleton/table-skeleton-demo');
  await expect(page.locator('[scSkeleton]')).toHaveCount(15);
});
