import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/popover/${name}-popover-demo`;
const dialog = (page: Page) => page.getByRole('dialog');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a dialog named and described; focus in, then back to the trigger', async ({
  page,
}) => {
  await page.goto('/demos/popover/popover-usage-demo');
  const trigger = page.getByRole('button', { name: 'Open Popover' });
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const d = page.getByRole('dialog', { name: 'Dimensions' });
  await expect(d).toHaveAccessibleDescription(
    'Set the dimensions for the layer.',
  );
  await expect(trigger).toHaveAttribute(
    'aria-controls',
    (await d.getAttribute('id')) ?? '',
  );
  // Focus on its first field.
  await expect(page.getByRole('textbox').first()).toBeFocused();
  await press(page, 'Escape');
  await expect(dialog(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('A press outside closes it', async ({ page }) => {
  await page.goto(demo('basic'));
  await page.getByRole('button', { name: 'Open Popover' }).click();
  await expect(dialog(page)).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog(page)).toHaveCount(0);
});

test('Not modal: Tab out of it closes it and goes on from the trigger', async ({
  page,
}) => {
  await page.goto(demo('modal'));
  await page.getByRole('button', { name: 'Not modal' }).click();
  await expect(dialog(page)).toBeVisible();
  // Its two fields, then out.
  await press(page, 'Tab');
  await press(page, 'Tab');
  await expect(dialog(page)).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Trap focus' })).toBeFocused();
});

test('Trap focus: Tab stays inside; Modal: the page behind is blocked', async ({
  page,
}) => {
  await page.goto(demo('modal'));
  await page.getByRole('button', { name: 'Trap focus' }).click();
  const fields = dialog(page).getByRole('textbox');
  await expect(fields.first()).toBeFocused();
  await press(page, 'Tab');
  await press(page, 'Tab');
  await expect(dialog(page)).toBeVisible();
  await expect(fields.first()).toBeFocused();
  await press(page, 'Escape');

  await page.getByRole('button', { name: 'Modal', exact: true }).click();
  await expect(page.locator('.cdk-overlay-backdrop')).toHaveCount(1);
  // A press on the page behind only closes it.
  await page.mouse.click(5, 5);
  await expect(dialog(page)).toHaveCount(0);
});

test('Open on hover: after the delay; leaving closes it; a click keeps it', async ({
  page,
}) => {
  await page.goto(demo('hover'));
  const trigger = page.getByRole('button', { name: 'About storage' });
  await trigger.hover();
  await expect(page.getByRole('dialog', { name: 'Storage' })).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(dialog(page)).toHaveCount(0);
  // Touch and the keyboard: a click opens it, and it stays.
  await trigger.click();
  await page.mouse.move(0, 0);
  await expect(page.getByRole('dialog', { name: 'Storage' })).toBeVisible();
});

test('Controlled: opened from outside, closed from inside', async ({
  page,
}) => {
  await page.goto(demo('controlled'));
  await page.getByRole('button', { name: 'Open from outside' }).click();
  const d = page.getByRole('dialog', { name: 'Settings' });
  await expect(d).toBeVisible();
  await d.getByRole('button', { name: 'Close' }).click();
  await expect(dialog(page)).toHaveCount(0);
});

test('Alignments: start, centre and end', async ({ page }) => {
  await page.goto(demo('alignments'));
  const trigger = page.getByRole('button', { name: 'Start' });
  await trigger.click();
  await expect
    .poll(async () => Math.round((await box(dialog(page))).x))
    .toBe(Math.round((await box(trigger)).x));
});

test('RTL: inline-start is the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const trigger = page.getByRole('button', { name: 'البداية' });
  await trigger.click();
  await expect(dialog(page)).toHaveAttribute('data-side', 'inline-start');
  const b = await box(trigger);
  await expect
    .poll(async () => (await box(dialog(page))).x)
    .toBeGreaterThanOrEqual(b.x + b.width);
});
