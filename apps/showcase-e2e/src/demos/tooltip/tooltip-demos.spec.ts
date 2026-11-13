import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/tooltip/${name}-tooltip-demo`;
const tooltip = (page: Page) => page.getByRole('tooltip');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: hover opens it after the delay; it describes its trigger', async ({
  page,
}) => {
  await page.goto('/demos/tooltip/tooltip-usage-demo');
  const trigger = page.getByRole('button', { name: 'Hover' });
  await trigger.hover();
  // Not at once: after 600ms.
  expect(await tooltip(page).count()).toBe(0);
  await expect(tooltip(page)).toHaveText('Add to library');
  await expect(trigger).toHaveAccessibleDescription('Add to library');
  // On the side it says (top, or bottom when there is no room above).
  const [t, b] = [await box(tooltip(page)), await box(trigger)];
  const below = t.y >= b.y + b.height - 1;
  expect(below || t.y + t.height <= b.y + 1).toBe(true);
  await expect(tooltip(page)).toHaveAttribute(
    'data-side',
    below ? 'bottom' : 'top',
  );
  // Away: closed, no description.
  await page.mouse.move(0, 0);
  await expect(tooltip(page)).toHaveCount(0);
  await expect(trigger).not.toHaveAttribute('aria-describedby');
});

test('Keyboard: focus opens it at once; Escape closes it', async ({ page }) => {
  await page.goto('/demos/tooltip/tooltip-usage-demo');
  await page.getByRole('button', { name: 'Hover' }).waitFor();
  await press(page, 'Tab');
  await expect(tooltip(page)).toBeVisible({ timeout: 300 });
  await press(page, 'Escape');
  await expect(tooltip(page)).toHaveCount(0);
});

test('Hoverable: the pointer moves onto it and it stays; a click closes it', async ({
  page,
}) => {
  await page.goto('/demos/tooltip/tooltip-usage-demo');
  const trigger = page.getByRole('button', { name: 'Hover' });
  await trigger.hover();
  await expect(tooltip(page)).toBeVisible();
  const t = await box(tooltip(page));
  await page.mouse.move(t.x + t.width / 2, t.y + t.height / 2, { steps: 5 });
  // Past the trigger's grace (100ms): time is the point here.
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(300);
  await expect(tooltip(page)).toBeVisible();
  await trigger.hover();
  await trigger.click();
  await expect(tooltip(page)).toHaveCount(0);
});

test('Sides: each where asked', async ({ page }) => {
  await page.goto(demo('sides'));
  const trigger = page.getByRole('button', { name: 'bottom' });
  await trigger.hover();
  await expect(tooltip(page)).toHaveAttribute('data-side', 'bottom');
  // Once its slide-in has ended.
  const b = await box(trigger);
  await expect
    .poll(async () => (await box(tooltip(page))).y)
    .toBeGreaterThanOrEqual(b.y + b.height);
});

test('Keyboard shortcut: rich content, a kbd inside', async ({ page }) => {
  await page.goto(demo('keyboard'));
  await page.getByRole('button', { name: 'Save' }).hover();
  await expect(tooltip(page).locator('kbd')).toHaveText('S');
});

test('Disabled button: softDisabled — announced disabled, yet focusable and hoverable, never pressed', async ({
  page,
}) => {
  await page.goto(demo('disabled'));
  const button = page.getByRole('button', { name: 'Disabled' });
  await expect(button).toHaveAttribute('aria-disabled', 'true');
  await expect(button).not.toHaveAttribute('disabled');
  // The keyboard reaches it, and gets its tooltip.
  await press(page, 'Tab');
  await expect(button).toBeFocused();
  await expect(tooltip(page)).toHaveText(
    'This feature is currently unavailable',
  );
  await press(page, 'Escape');
  // The pointer too.
  await page.mouse.move(0, 0);
  await button.hover();
  await expect(tooltip(page)).toBeVisible();
  // Nothing presses it: the click stops before any handler (no submit, no focus loss).
  // (Playwright waits for an aria-disabled button to be enabled: by position.)
  const b = await box(button);
  await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
  await expect(button).toBeFocused();
});

test('Controlled: opened and closed by the page', async ({ page }) => {
  await page.goto(demo('controlled'));
  await page.getByRole('button', { name: 'Show the tooltip' }).click();
  await expect(tooltip(page)).toHaveText('Opened from outside');
  await page.getByRole('button', { name: 'Hide the tooltip' }).click();
  await expect(tooltip(page)).toHaveCount(0);
});

test('Group: once one has shown, the next opens at once', async ({ page }) => {
  await page.goto(demo('group'));
  await page.getByRole('button', { name: 'Bold' }).hover();
  await expect(tooltip(page)).toHaveText('Bold');
  await page.getByRole('button', { name: 'Italic' }).hover();
  await expect(page.getByRole('tooltip', { name: 'Italic' })).toBeVisible({
    timeout: 300,
  });
  // One at a time: Bold's closed (its leave animation done).
  await expect(tooltip(page)).toHaveCount(1);
  await expect(tooltip(page)).toHaveText('Italic');
});

test('RTL: inline-start is the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const trigger = page.getByRole('button', { name: 'البداية' });
  await trigger.hover();
  await expect(tooltip(page)).toHaveAttribute('data-side', 'right');
  const [t, b] = [await box(tooltip(page)), await box(trigger)];
  expect(t.x).toBeGreaterThanOrEqual(b.x + b.width);
});
