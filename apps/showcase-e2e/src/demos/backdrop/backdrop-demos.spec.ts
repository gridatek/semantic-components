import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: fades in when shown, out when it goes, then is removed', async ({
  page,
}) => {
  await page.goto('/demos/backdrop/backdrop-usage-demo');
  const backdrop = page.locator('[scBackdrop]');
  const toggle = page.getByRole('button', { name: 'Backdrop' });
  await expect(backdrop).toHaveCount(0);

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(backdrop).toHaveCount(1);
  await expect(backdrop).toHaveCSS('opacity', '1');
  // It takes no clicks: the button under it still answers.
  await expect(backdrop).toHaveCSS('pointer-events', 'none');

  // Kept while it fades out, then removed.
  await toggle.click();
  await expect(backdrop).toHaveClass(/\banimate-out\b/);
  await expect(backdrop).toHaveCount(0);
});

test('Custom Shade: your classes over the preset’s', async ({ page }) => {
  await page.goto('/demos/backdrop/custom-backdrop-demo');
  await page.getByRole('button', { name: 'Tinted backdrop' }).click();
  const backdrop = page.locator('[scBackdrop]');
  await expect(backdrop).toHaveClass(/(^|\s)bg-primary\/20(\s|$)/);
  await expect(backdrop).not.toHaveClass(/(^|\s)bg-black\/\d+(\s|$)/);
  await expect(backdrop).toHaveCSS('position', 'absolute');
});
