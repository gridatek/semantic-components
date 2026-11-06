import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/preview-card/${name}-preview-card-demo`;
const card = (page: Page) => page.locator('[scPreviewCard]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: hover opens it below its link; no role, no link to it', async ({
  page,
}) => {
  await page.goto('/demos/preview-card/preview-card-usage-demo');
  const trigger = page.getByRole('link', { name: 'Hover Here' });
  await trigger.hover();
  await expect(card(page)).toContainText('@nextjs');
  await expect(trigger).toHaveAttribute('data-popup-open', '');
  await expect(card(page)).not.toHaveAttribute('role');
  await expect(trigger).not.toHaveAttribute('aria-describedby');
  await expect(trigger).not.toHaveAttribute('aria-expanded');
  await expect(card(page)).toHaveAttribute('data-side', 'bottom');
  const b = await box(trigger);
  await expect
    .poll(async () => (await box(card(page))).y)
    .toBeGreaterThanOrEqual(b.y + b.height);
  await page.mouse.move(0, 0);
  await expect(card(page)).toHaveCount(0);
  await expect(trigger).not.toHaveAttribute('data-popup-open');
});

test('Not at once: after the trigger’s delay', async ({ page }) => {
  await page.goto(demo('sides'));
  await page.getByRole('button', { name: 'top' }).hover();
  await expect(card(page)).toHaveCount(0, { timeout: 100 });
  await expect(card(page)).toBeVisible();
});

test('Hoverable: the pointer moves onto it and it stays', async ({ page }) => {
  await page.goto('/demos/preview-card/preview-card-usage-demo');
  await page.getByRole('link', { name: 'Hover Here' }).hover();
  await expect(card(page)).toBeVisible();
  const c = await box(card(page));
  await page.mouse.move(c.x + c.width / 2, c.y + c.height / 2, { steps: 5 });
  // Past the close delay (100ms): time is the point here.
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(400);
  await expect(card(page)).toBeVisible();
});

test('Keyboard: focus opens it at once, it takes no focus; Escape closes it', async ({
  page,
}) => {
  await page.goto('/demos/preview-card/preview-card-usage-demo');
  const trigger = page.getByRole('link', { name: 'Hover Here' });
  await trigger.waitFor();
  await press(page, 'Tab');
  await expect(trigger).toBeFocused();
  await expect(card(page)).toBeVisible({ timeout: 300 });
  await press(page, 'Escape');
  await expect(card(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('A press outside closes it', async ({ page }) => {
  await page.goto('/demos/preview-card/preview-card-usage-demo');
  await page.getByRole('link', { name: 'Hover Here' }).waitFor();
  await press(page, 'Tab');
  await expect(card(page)).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(card(page)).toHaveCount(0);
});

test('Sides: each where asked', async ({ page }) => {
  await page.goto(demo('sides'));
  for (const side of ['left', 'bottom', 'right'] as const) {
    const trigger = page.getByRole('button', { name: side });
    await trigger.hover();
    await expect(card(page)).toHaveAttribute('data-side', side);
    const b = await box(trigger);
    await expect
      .poll(async () => {
        const c = await box(card(page));
        return {
          left: c.x + c.width <= b.x + 1,
          bottom: c.y >= b.y + b.height - 1,
          right: c.x >= b.x + b.width - 1,
        }[side];
      })
      .toBe(true);
    await page.mouse.move(0, 0);
    await expect(card(page)).toHaveCount(0);
  }
});

test('In text: the link in its sentence; the card with its picture', async ({
  page,
}) => {
  await page.goto(demo('in-text'));
  await page.getByRole('link', { name: 'waterfall' }).hover();
  await expect(card(page).getByRole('img')).toBeVisible();
});

test('RTL: inline-start is the right; its text right to left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const trigger = page.getByRole('button', { name: 'بداية السطر' });
  await trigger.hover();
  await expect(card(page)).toHaveAttribute('data-side', 'inline-start');
  const b = await box(trigger);
  await expect
    .poll(async () => (await box(card(page))).x)
    .toBeGreaterThanOrEqual(b.x + b.width - 1);
});
