import { collectErrors, press } from '../../interaction';
import { box, openStill } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/alert-dialog/${name}-alert-dialog-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: an alertdialog named and described; Cancel focused first', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  const trigger = page.getByRole('button', { name: 'Show Dialog' });
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  await trigger.click();
  const dialog = page.getByRole('alertdialog', {
    name: 'Are you absolutely sure?',
  });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(dialog).toHaveAccessibleDescription(
    /This action cannot be undone/,
  );
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

test('Keyboard: Tab stays in the dialog; Escape closes it, focus back on the trigger', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  const trigger = page.getByRole('button', { name: 'Show Dialog' });
  await trigger.click();
  const dialog = page.getByRole('alertdialog');
  const cancel = dialog.getByRole('button', { name: 'Cancel' });
  const action = dialog.getByRole('button', { name: 'Continue' });
  await expect(cancel).toBeFocused();
  await press(page, 'Tab');
  await expect(action).toBeFocused();
  await press(page, 'Tab');
  await expect(cancel).toBeFocused();
  await press(page, 'Shift+Tab');
  await expect(action).toBeFocused();

  await press(page, 'Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('A click outside keeps it open; the action closes it', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  await page.getByRole('button', { name: 'Show Dialog' }).click();
  const dialog = page.getByRole('alertdialog');
  await page.mouse.click(5, 5);
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Continue' }).click();
  await expect(dialog).toBeHidden();
});

test('Small: narrower, its two buttons side by side', async ({ page }) => {
  await openStill(page, demo('small'));
  await page.getByRole('button', { name: 'Show Dialog' }).click();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toHaveAttribute('data-size', 'sm');
  const [cancel, allow] = [
    await box(dialog.getByRole('button', { name: "Don't allow" })),
    await box(dialog.getByRole('button', { name: 'Allow', exact: true })),
  ];
  expect(Math.abs(cancel.y - allow.y)).toBeLessThan(1);
  expect((await box(dialog)).width).toBeLessThanOrEqual(321);
});

test('Media: the icon beside the title', async ({ page }) => {
  await openStill(page, demo('media'));
  await page.getByRole('button', { name: 'Share Project' }).click();
  const dialog = page.getByRole('alertdialog');
  const [media, title] = [
    await box(dialog.locator('[scAlertDialogMedia]')),
    await box(dialog.getByRole('heading')),
  ];
  expect(title.x).toBeGreaterThan(media.x + media.width);
});

test('Small with Media: the icon above the title', async ({ page }) => {
  await openStill(page, demo('small-media'));
  await page.getByRole('button', { name: 'Show Dialog' }).click();
  const dialog = page.getByRole('alertdialog');
  const [media, title] = [
    await box(dialog.locator('[scAlertDialogMedia]')),
    await box(dialog.getByRole('heading')),
  ];
  expect(title.y).toBeGreaterThan(media.y + media.height - 1);
});

test('Destructive: the action in the destructive look', async ({ page }) => {
  await openStill(page, demo('destructive'));
  await page.getByRole('button', { name: 'Delete Chat' }).click();
  const dialog = page.getByRole('alertdialog', { name: 'Delete chat?' });
  const [del, cancel] = [
    dialog.getByRole('button', { name: 'Delete' }),
    dialog.getByRole('button', { name: 'Cancel' }),
  ];
  const color = (el: typeof del) =>
    el.evaluate((node) => getComputedStyle(node).color);
  expect(await color(del)).not.toBe(await color(cancel));
});

test('RTL: right to left, the icon on the right', async ({ page }) => {
  await openStill(page, demo('rtl'));
  await page.getByRole('button', { name: 'مشاركة المشروع' }).click();
  const dialog = page.getByRole('alertdialog', { name: 'مشاركة هذا المشروع؟' });
  await expectRtl(dialog);
  const [media, title] = [
    await box(dialog.locator('[scAlertDialogMedia]')),
    await box(dialog.getByRole('heading')),
  ];
  expect(media.x).toBeGreaterThan(title.x);
});

test('On a phone: the dialog fits, its buttons stacked @mobile', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  await page.getByRole('button', { name: 'Show Dialog' }).tap();
  const dialog = page.getByRole('alertdialog');
  await expect(dialog).toBeVisible();
  await expectNoHorizontalScroll(page);
  const [cancel, action] = [
    await box(dialog.getByRole('button', { name: 'Cancel' })),
    await box(dialog.getByRole('button', { name: 'Continue' })),
  ];
  // Stacked: the action above Cancel (flex-col-reverse).
  expect(cancel.y).toBeGreaterThan(action.y);
});
