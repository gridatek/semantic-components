import { type Locator, type Page, expect, test } from '../../test';

const pad = (page: Page, name = 'Signature') =>
  page.getByRole('img', { name, exact: true });
const ink = (target: Locator) => target.locator('svg path');

/** A wave across the pad, with the mouse. */
async function sign(page: Page, target: Locator, dy = 0): Promise<void> {
  const box = await target.boundingBox();
  if (!box) throw new Error('no pad');
  const y = box.y + box.height / 2 + dy;
  await page.mouse.move(box.x + 30, y);
  await page.mouse.down();
  for (let i = 1; i <= 20; i++) {
    await page.mouse.move(box.x + 30 + i * 12, y - Math.sin(i / 2) * 20);
  }
  await page.mouse.up();
}

const AGREE = 'Sign below to agree:';

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/signature-pad/signature-pad-usage-demo');
    await expect(pad(page, AGREE)).toBeVisible();
  });

  test('named by the line above it; Clear and Save once signed', async ({
    page,
  }) => {
    const clear = page.getByRole('button', { name: 'Clear' });
    const save = page.getByRole('button', { name: 'Save' });
    await expect(pad(page, AGREE)).toHaveAttribute('data-empty', '');
    await expect(clear).toBeDisabled();
    await expect(save).toBeDisabled();
    await sign(page, pad(page, AGREE));
    await expect(ink(pad(page, AGREE))).toHaveCount(1);
    await save.click();
    await expect(page.getByRole('status')).toHaveText('Signature saved.');
    await clear.click();
    await expect(ink(pad(page, AGREE))).toHaveCount(0);
    await expect(page.getByRole('status')).toHaveCount(0);
    await expect(save).toBeDisabled();
  });

  test('a tap is a dot; Clear takes all', async ({ page }) => {
    await pad(page, AGREE).click();
    await expect(ink(pad(page, AGREE))).toHaveCount(1);
    await sign(page, pad(page, AGREE), 20);
    await expect(ink(pad(page, AGREE))).toHaveCount(2);
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(ink(pad(page, AGREE))).toHaveCount(0);
  });

  test('focused: Ctrl + Z takes the last stroke back, Delete clears', async ({
    page,
  }) => {
    await sign(page, pad(page, AGREE), -20);
    await sign(page, pad(page, AGREE), 20);
    await expect(ink(pad(page, AGREE))).toHaveCount(2);
    await expect(pad(page, AGREE)).toBeFocused();
    await page.keyboard.press('Control+z');
    await expect(ink(pad(page, AGREE))).toHaveCount(1);
    await page.keyboard.press('Delete');
    await expect(ink(pad(page, AGREE))).toHaveCount(0);
  });
});

test('Form: required — the error, then signed and shown back', async ({
  page,
}) => {
  await page.goto('/demos/signature-pad/form-signature-pad-demo');
  await expect(pad(page)).toBeVisible();
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByText('Sign above.')).toBeVisible();
  await expect(pad(page)).toHaveAttribute('aria-invalid', 'true');

  await page.getByRole('textbox', { name: 'Full name' }).fill('Ada');
  await sign(page, pad(page));
  await expect(pad(page)).not.toHaveAttribute('aria-invalid', /.*/);
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  const status = page.getByRole('status');
  await expect(status).toContainText('Signed by Ada');
  await expect(
    status.getByRole('img', { name: 'The signature' }),
  ).toBeVisible();
});

test('Pen: the strokes take the colour and width chosen', async ({ page }) => {
  await page.goto('/demos/signature-pad/pen-signature-pad-demo');
  await expect(pad(page)).toBeVisible();
  await page.getByRole('button', { name: 'Blue' }).click();
  await sign(page, pad(page));
  await expect(ink(pad(page))).toHaveAttribute('fill', '#2563eb');
});

test('Export: a trimmed PNG and an SVG, downloaded', async ({ page }) => {
  await page.goto('/demos/signature-pad/export-signature-pad-demo');
  await expect(pad(page)).toBeVisible();
  await sign(page, pad(page));

  const png = page.waitForEvent('download');
  await page.getByRole('button', { name: 'PNG' }).click();
  expect((await png).suggestedFilename()).toBe('signature.png');
  const preview = page.getByRole('img', { name: 'The signature, as exported' });
  await expect
    .poll(() => preview.evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);

  const svg = page.waitForEvent('download');
  await page.getByRole('button', { name: 'SVG' }).click();
  expect((await svg).suggestedFilename()).toBe('signature.svg');
});

test('Read-only and disabled: a saved one drawn again, nothing added', async ({
  page,
}) => {
  await page.goto('/demos/signature-pad/readonly-signature-pad-demo');
  const readonly = pad(page, 'Read-only');
  const disabled = pad(page, 'Disabled');
  await expect(ink(readonly)).toHaveCount(2);
  await expect(ink(disabled)).toHaveCount(2);
  await sign(page, readonly);
  await expect(ink(readonly)).toHaveCount(2);
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await expect(disabled).not.toHaveAttribute('tabindex', /.*/);
});

test('Type instead: one or the other, the typed name signs', async ({
  page,
}) => {
  await page.goto('/demos/signature-pad/type-signature-pad-demo');
  await expect(pad(page, 'Draw your signature')).toBeVisible();
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(
    page.getByText('Sign above, or type your name below.'),
  ).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Or type your full name' })
    .fill('Ada Lovelace');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Signed as “Ada Lovelace”.',
  );
});

test('RTL: named in Arabic, the ink as anywhere', async ({ page }) => {
  await page.goto('/demos/signature-pad/rtl-signature-pad-demo');
  const arabic = pad(page, 'التوقيع');
  await expect(arabic).toBeVisible();
  await sign(page, arabic);
  await expect(ink(arabic)).toHaveCount(1);
  await page.getByRole('button', { name: 'تراجع' }).click();
  await expect(ink(arabic)).toHaveCount(0);
});

test('RTL: the hint above the pad describes it', async ({ page }) => {
  await page.goto('/demos/signature-pad/rtl-signature-pad-demo');
  await expect(pad(page, 'التوقيع')).toHaveAccessibleDescription(
    'وقّع في المربع أدناه',
  );
});
