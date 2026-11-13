import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/toggle/${name}-toggle-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a press keeps it pressed (aria-pressed); its name stays', async ({
  page,
}) => {
  await page.goto('/demos/toggle/toggle-usage-demo');
  const bookmark = page.getByRole('button', { name: 'Bookmark' });
  await expect(bookmark).toHaveAttribute('aria-pressed', 'false');
  await bookmark.click();
  await expect(bookmark).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Bookmark' })).toBeVisible();
});

test('Outline: Space and Enter press it', async ({ page }) => {
  await page.goto(demo('outline'));
  const italic = page.getByRole('button', { name: 'Italic' });
  await italic.focus();
  await press(page, ' ');
  await expect(italic).toHaveAttribute('aria-pressed', 'true');
  await press(page, 'Enter');
  await expect(italic).toHaveAttribute('aria-pressed', 'false');
});

test('With text: named by its text', async ({ page }) => {
  await page.goto(demo('with-text'));
  await expect(page.getByRole('button', { name: 'Italic' })).toBeVisible();
});

test('Sizes: sm, default, lg grow', async ({ page }) => {
  await page.goto(demo('sizes'));
  const [sm, md, lg] = [
    await box(page.getByRole('button', { name: 'Small' })),
    await box(page.getByRole('button', { name: 'Default' })),
    await box(page.getByRole('button', { name: 'Large' })),
  ];
  expect(sm.height).toBeLessThan(md.height);
  expect(md.height).toBeLessThan(lg.height);
});

test('Disabled: out of reach, a press does nothing', async ({ page }) => {
  await page.goto(demo('disabled'));
  const disabled = page.getByRole('button', { name: 'Disabled', exact: true });
  await expect(disabled).toBeDisabled();
  await expect(disabled).toHaveAttribute('aria-pressed', 'false');
});

test('Toolbar: each toggle on its own', async ({ page }) => {
  await page.goto(demo('toolbar'));
  const bold = page.getByRole('button', { name: 'Toggle bold' });
  const italic = page.getByRole('button', { name: 'Toggle italic' });
  // Bold starts pressed; pressing italic leaves it so.
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
  await expect(italic).toHaveAttribute('aria-pressed', 'false');
  await italic.click();
  await expect(italic).toHaveAttribute('aria-pressed', 'true');
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
  await bold.click();
  await expect(bold).toHaveAttribute('aria-pressed', 'false');
  await expect(italic).toHaveAttribute('aria-pressed', 'true');
});

test('RTL: the icon at the start, on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const toggle = page.getByRole('button', { name: 'إشارة مرجعية' });
  const [button, icon] = [await box(toggle), await box(toggle.locator('svg'))];
  expect(icon.x).toBeGreaterThan(button.x + button.width / 2);
});
