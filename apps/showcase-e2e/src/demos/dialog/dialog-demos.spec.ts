import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/dialog/${name}-dialog-demo`;
const usage = '/demos/dialog/dialog-usage-demo';
const dialog = (page: Page) => page.getByRole('dialog');

/** Opens the usage demo's dialog; returns its trigger. */
async function open(page: Page) {
  await page.goto(usage);
  const trigger = page.getByRole('button', { name: 'Open Dialog' });
  await trigger.click();
  await expect(dialog(page)).toBeVisible();
  return trigger;
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a modal dialog, centred, named and described; the ✕ in its corner', async ({
  page,
}) => {
  const trigger = await open(page);
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  const d = dialog(page);
  await expect(d).toHaveAttribute('aria-modal', 'true');
  await expect(
    page.getByRole('dialog', { name: 'Edit profile' }),
  ).toBeVisible();
  await expect(d).toHaveAccessibleDescription(/Make changes to your profile/);
  const offset = await d.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      dx: Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2),
      dy: Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2),
    };
  });
  expect(offset.dx).toBeLessThanOrEqual(2);
  expect(offset.dy).toBeLessThanOrEqual(2);
  // The ✕, straight in the dialog: at its top end corner.
  const [panel, x] = [
    await box(d),
    await box(page.getByRole('button', { name: 'Close' })),
  ];
  expect(panel.x + panel.width - (x.x + x.width)).toBeLessThan(24);
  expect(x.y - panel.y).toBeLessThan(24);
});

test('Closing: the ✕, Cancel, Escape, a click outside — focus back on the trigger', async ({
  page,
}) => {
  const trigger = await open(page);
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(dialog(page)).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(dialog(page)).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  // Focus in the dialog first: on its first button, the ✕.
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await press(page, 'Escape');
  await expect(dialog(page)).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  // Outside it: on the backdrop.
  await page
    .locator('.cdk-overlay-backdrop')
    .click({ position: { x: 5, y: 5 } });
  await expect(dialog(page)).toBeHidden();
});

test('Save: your code, then the dialog closes through [(open)]', async ({
  page,
}) => {
  await open(page);
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(dialog(page)).toBeHidden();
});

test('Focus stays in the dialog while it is open', async ({ page }) => {
  await open(page);
  for (let i = 0; i < 8; i++) await press(page, 'Tab');
  expect(
    await page.evaluate(
      () => !!document.activeElement?.closest('[role=dialog]'),
    ),
  ).toBe(true);
});

test('Custom Close Button: a close in the footer stays there, and closes', async ({
  page,
}) => {
  await page.goto(demo('close-button'));
  await page.getByRole('button', { name: 'Share' }).click();
  const close = page.locator('[scDialogFooter] button');
  await expect(close).toHaveCSS('position', 'static');
  await close.click();
  await expect(dialog(page)).toBeHidden();
});

test('No Close Button: closed by Escape', async ({ page }) => {
  await page.goto(demo('no-close-button'));
  await page.getByRole('button', { name: 'No Close Button' }).click();
  await expect(dialog(page)).toBeVisible();
  await expect(dialog(page).getByRole('button')).toHaveCount(0);
  await press(page, 'Escape');
  await expect(dialog(page)).toBeHidden();
});

test('Sticky Footer: the content scrolls, the footer stays in view', async ({
  page,
}) => {
  await page.goto(demo('sticky-footer'));
  await page.getByRole('button', { name: 'Sticky Footer' }).click();
  const scroller = dialog(page).locator('.overflow-y-auto');
  expect(
    await scroller.evaluate((el) => el.scrollHeight > el.clientHeight),
  ).toBe(true);
  await expect(page.locator('[scDialogFooter]')).toBeInViewport();
});

test('RTL: the dialog takes the direction and language of where it opens; the ✕ on the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'فتح الحوار' }).click();
  const d = dialog(page);
  await expectRtl(d);
  await expect(d).toHaveAttribute('lang', 'ar');
  const [panel, x] = [
    await box(d),
    await box(page.getByRole('button', { name: 'إغلاق' })),
  ];
  expect(x.x - panel.x).toBeLessThan(24);
});

test('On a phone: the dialog fits @mobile', async ({ page }) => {
  await open(page);
  await expectNoHorizontalScroll(page);
  const d = await box(dialog(page));
  expect(d.width).toBeLessThanOrEqual(page.viewportSize()!.width);
});
