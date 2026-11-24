import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/native-dialog/${name}-native-dialog-demo`;
const usage = '/demos/native-dialog/native-dialog-usage-demo';
/** The `<dialog>`: the whole screen, shown as a modal. */
const dialog = (page: Page) => page.getByRole('dialog');
/** Its panel: the Dialog's look, the content in it. */
const panel = (page: Page) =>
  dialog(page).locator(':scope > div:not([scBackdrop])');

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

test('Usage: a native modal dialog, named and described; the panel centred, the ✕ in its corner', async ({
  page,
}) => {
  const trigger = await open(page);
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  const d = dialog(page);
  await expect.poll(() => d.evaluate((el) => el.matches(':modal'))).toBe(true);
  await expect(
    page.getByRole('dialog', { name: 'Edit profile' }),
  ).toBeVisible();
  await expect(d).toHaveAccessibleDescription(/Make changes to your profile/);
  // Focus starts on Name (autofocus).
  await expect(
    page.getByRole('textbox', { name: 'Name', exact: true }),
  ).toBeFocused();
  const p = panel(page);
  await expect
    .poll(() =>
      p.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return Math.max(
          Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2),
          Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2),
        );
      }),
    )
    .toBeLessThanOrEqual(2);
  // The ✕, straight in the panel: at its top end corner.
  const [b, x] = [
    await box(p),
    await box(page.getByRole('button', { name: 'Close' })),
  ];
  expect(b.x + b.width - (x.x + x.width)).toBeLessThan(24);
  expect(x.y - b.y).toBeLessThan(24);
  // The style's backdrop behind it.
  await expect(d.locator(':scope > [scBackdrop]')).toBeVisible();
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
  await expect(
    page.getByRole('textbox', { name: 'Name', exact: true }),
  ).toBeFocused();
  await press(page, 'Escape');
  await expect(dialog(page)).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(panel(page)).toBeVisible();
  // Outside the panel: the screen around it.
  await page.mouse.click(5, 5);
  await expect(dialog(page)).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Save: your code, then the dialog closes through [(open)]', async ({
  page,
}) => {
  await open(page);
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(dialog(page)).toBeHidden();
});

test('Focus stays in the dialog while it is open; the page behind is inert', async ({
  page,
}) => {
  await open(page);
  for (let i = 0; i < 8; i++) await press(page, 'Tab');
  expect(
    await page.evaluate(() => !!document.activeElement?.closest('dialog')),
  ).toBe(true);
});

test('Custom Close Button: a close in the footer stays there, and closes', async ({
  page,
}) => {
  await page.goto(demo('close-button'));
  await page.getByRole('button', { name: 'Share' }).click();
  const close = page.locator('[scNativeDialogFooter] button');
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

test('Short content: the panel still opens at its full width', async ({
  page,
}) => {
  // As wide as the style's max (sm:max-w-sm, 384px, in nova).
  await page.goto(demo('no-close-button'));
  await page.getByRole('button', { name: 'No Close Button' }).click();
  await expect.poll(async () => (await box(panel(page))).width).toBe(384);
});

test('Sticky Footer: the body scrolls, the footer stays in view', async ({
  page,
}) => {
  await page.goto(demo('sticky-footer'));
  await page.getByRole('button', { name: 'Sticky Footer' }).click();
  const body = page.locator('[scNativeDialogBody]');
  await expect(body).toBeVisible();
  expect(await body.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(
    true,
  );
  await expect(page.locator('[scNativeDialogFooter]')).toBeInViewport();
});

test('RTL: the dialog takes the direction and language of where it is; the ✕ on the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'فتح الحوار' }).click();
  const d = dialog(page);
  await expectRtl(d);
  expect(
    await d.evaluate((el) => el.closest('[lang]')?.getAttribute('lang')),
  ).toBe('ar');
  const [b, x] = [
    await box(panel(page)),
    await box(page.getByRole('button', { name: 'إغلاق' })),
  ];
  expect(x.x - b.x).toBeLessThan(24);
});

test('On a phone: the dialog fits @mobile', async ({ page }) => {
  await open(page);
  await expectNoHorizontalScroll(page);
  const p = await box(panel(page));
  expect(p.width).toBeLessThanOrEqual(page.viewportSize()!.width);
});
