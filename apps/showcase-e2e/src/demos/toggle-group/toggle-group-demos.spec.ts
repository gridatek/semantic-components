import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/toggle-group/${name}-toggle-group-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: several pressed at a time (aria-pressed)', async ({ page }) => {
  await page.goto('/demos/toggle-group/toggle-group-usage-demo');
  const group = page.getByRole('group', { name: 'Text formatting' });
  await group.getByRole('button', { name: 'Bold' }).click();
  await group.getByRole('button', { name: 'Italic' }).click();
  for (const name of ['Bold', 'Italic'])
    await expect(group.getByRole('button', { name })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
});

test('One Tab stop; the arrows move between the items, Home and End to the ends', async ({
  page,
}) => {
  await page.goto('/demos/toggle-group/toggle-group-usage-demo');
  const bold = page.getByRole('button', { name: 'Bold' });
  const italic = page.getByRole('button', { name: 'Italic' });
  const underline = page.getByRole('button', { name: 'Underline' });
  await expect(bold).toHaveAttribute('tabindex', '0');
  await expect(italic).toHaveAttribute('tabindex', '-1');
  await bold.focus();
  await press(page, 'ArrowRight');
  await expect(italic).toBeFocused();
  await expect(italic).toHaveAttribute('tabindex', '0');
  await press(page, 'End');
  await expect(underline).toBeFocused();
  await press(page, 'ArrowRight');
  // loopFocus: back to the first.
  await expect(bold).toBeFocused();
  await press(page, 'Space');
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
});

test('Single: one at a time, a second press releases it', async ({ page }) => {
  await page.goto(demo('single'));
  const start = page.getByRole('button', { name: 'Align start' });
  const center = page.getByRole('button', { name: 'Align center' });
  await center.click();
  await expect(center).toHaveAttribute('aria-pressed', 'true');
  await expect(start).toHaveAttribute('aria-pressed', 'false');
  await center.click();
  await expect(page.getByText('Alignment: none')).toBeVisible();
});

test('Multiple: the value lists the pressed ones', async ({ page }) => {
  await page.goto(demo('multiple'));
  await page.getByRole('button', { name: 'Underline' }).click();
  await expect(page.getByText('Formatting: bold, underline')).toBeVisible();
});

test('Vertical: Up and Down move between the items', async ({ page }) => {
  await page.goto(demo('vertical'));
  await page.getByRole('button', { name: 'Bold' }).focus();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('button', { name: 'Italic' })).toBeFocused();
});

test('Disabled: every item out of reach', async ({ page }) => {
  await page.goto(demo('disabled'));
  for (const name of ['Bold', 'Italic', 'Underline'])
    await expect(page.getByRole('button', { name })).toBeDisabled();
});

test('Font weight: one weight, shown below', async ({ page }) => {
  await page.goto(demo('font-weight'));
  await page.getByRole('button', { name: 'Bold' }).click();
  await expect(page.getByText('font-bold')).toBeVisible();
});

test('RTL: ArrowLeft moves to the next item', async ({ page }) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'قائمة' }).focus();
  await press(page, 'ArrowLeft');
  await expect(page.getByRole('button', { name: 'شبكة' })).toBeFocused();
});
