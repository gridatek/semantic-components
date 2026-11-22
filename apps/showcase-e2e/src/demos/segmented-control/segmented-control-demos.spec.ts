import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/segmented-control/${name}-demo`;
const radio = (page: Page, name: string) =>
  page.getByRole('radio', { name, exact: true });
const indicator = (page: Page) =>
  page.locator('[data-slot=segmented-control-indicator]').first();
const picked = (page: Page) => page.getByTestId('picked');

/** The indicator's box against an item's (laid out, not animated). */
const over = (page: Page, name: string) =>
  expect
    .poll(async () => {
      const item = await radio(page, name).boundingBox();
      const box = await indicator(page).boundingBox();
      return (
        Math.abs((item?.x ?? 0) - (box?.x ?? 0)) < 1 &&
        Math.abs((item?.width ?? 0) - (box?.width ?? 0)) < 1
      );
    })
    .toBe(true);

async function open(page: Page, name: string) {
  await page.goto(demo(name));
  await expect(page.getByRole('radio').first()).toBeVisible();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => open(page, 'segmented-control-usage'));

  test('a radio group named by its field; the indicator on the checked', async ({
    page,
  }) => {
    await expect(page.getByRole('radiogroup', { name: 'View' })).toBeVisible();
    await expect(radio(page, 'List')).toHaveAttribute('aria-checked', 'true');
    await expect(indicator(page)).toHaveAttribute(
      'data-activation-direction',
      'none',
    );
    await over(page, 'List');
  });

  test('one Tab stop; the arrows move and check, both ways, wrapping', async ({
    page,
  }) => {
    await page.keyboard.press('Tab');
    await expect(radio(page, 'List')).toBeFocused();
    await press(page, 'ArrowRight');
    await expect(radio(page, 'Grid')).toBeFocused();
    await expect(picked(page)).toHaveText('grid');
    await press(page, 'ArrowDown');
    await expect(picked(page)).toHaveText('board');
    await press(page, 'ArrowRight');
    await expect(picked(page)).toHaveText('list');
    await press(page, 'End');
    await expect(picked(page)).toHaveText('board');
    await expect(indicator(page)).toHaveAttribute(
      'data-activation-direction',
      'right',
    );
    await over(page, 'Board');
    await expect(radio(page, 'Grid')).toHaveAttribute('tabindex', '-1');
  });

  test('a click checks; the indicator slides to it', async ({ page }) => {
    await radio(page, 'Grid').click();
    await expect(picked(page)).toHaveText('grid');
    await over(page, 'Grid');
  });
});

test('Icons: items named by their sr-only text', async ({ page }) => {
  await open(page, 'icons-segmented-control');
  await expect(
    page.getByRole('radiogroup', { name: 'Text alignment' }),
  ).toBeVisible();
  await radio(page, 'Center').click();
  await expect(radio(page, 'Center')).toHaveAttribute('aria-checked', 'true');
});

test('Vertical: stacked, the arrows still move both ways', async ({ page }) => {
  await open(page, 'vertical-segmented-control');
  await expect(page.getByRole('radiogroup')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  await focus(radio(page, 'Middle'));
  await press(page, 'ArrowDown');
  await expect(picked(page)).toHaveText('bottom');
  await press(page, 'ArrowLeft');
  await expect(picked(page)).toHaveText('middle');
});

test('Disabled: the whole control, or one item skipped', async ({ page }) => {
  await open(page, 'disabled-segmented-control');
  await expect(radio(page, 'Light')).toBeDisabled();
  await expect(radio(page, 'Lifetime')).toBeDisabled();
  await radio(page, 'Yearly').click();
  await press(page, 'ArrowRight');
  await expect(radio(page, 'Monthly')).toHaveAttribute('aria-checked', 'true');
});

test('Read-only: the arrows move focus, nothing checked', async ({ page }) => {
  await open(page, 'read-only-segmented-control');
  await focus(radio(page, 'Pro'));
  await press(page, 'ArrowRight');
  await expect(radio(page, 'Team')).toBeFocused();
  await expect(picked(page)).toHaveText('pro');
  await radio(page, 'Free').click();
  await expect(picked(page)).toHaveText('pro');
});

test('Form: required; nothing checked, no indicator', async ({ page }) => {
  await open(page, 'form-segmented-control');
  await expect(indicator(page)).toBeHidden();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText('Choose a density.');
  await page.keyboard.press('Shift+Tab');
  await radio(page, 'Spacious').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved: spacious.');
});

test('RTL: ← moves on, the indicator follows', async ({ page }) => {
  await open(page, 'rtl-segmented-control');
  await focus(radio(page, 'قائمة'));
  await press(page, 'ArrowLeft');
  await expect(radio(page, 'شبكة')).toHaveAttribute('aria-checked', 'true');
  await over(page, 'شبكة');
});
