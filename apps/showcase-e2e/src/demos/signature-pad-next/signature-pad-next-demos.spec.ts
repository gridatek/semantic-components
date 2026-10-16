import { type Page, expect, test } from '@playwright/test';

const surface = (page: Page) =>
  page.locator('[data-slot="signature-pad-surface"]').first();
const strokes = (page: Page) => surface(page).locator('path');

/** A stroke across the surface, from `from` to `to` (fractions of it). */
async function draw(page: Page, from = 0.2, to = 0.7) {
  const box = await surface(page).boundingBox();
  if (!box) throw new Error('no surface');
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width * from, y);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) {
    await page.mouse.move(
      box.x + box.width * (from + ((to - from) * i) / 12),
      y + (i % 2 ? -12 : 12),
    );
  }
  await page.mouse.up();
}

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/signature-pad-next/basic-signature-pad-next-demo');
  });

  test('draws, undoes, redoes and clears', async ({ page }) => {
    const undo = page.getByRole('button', { name: 'Undo' });
    const redo = page.getByRole('button', { name: 'Redo' });
    const clear = page.getByRole('button', { name: 'Clear' });
    await expect(undo).toBeDisabled();
    await expect(clear).toBeDisabled();

    await draw(page);
    await draw(page, 0.3, 0.9);
    await expect(strokes(page)).toHaveCount(2);
    await undo.click();
    await expect(strokes(page)).toHaveCount(1);
    await redo.click();
    await expect(strokes(page)).toHaveCount(2);
    await clear.click();
    await expect(strokes(page)).toHaveCount(0);
    // Clearing is undoable too.
    await undo.click();
    await expect(strokes(page)).toHaveCount(2);
  });

  test('the keys, focused', async ({ page }) => {
    await draw(page);
    await expect(surface(page)).toBeFocused();
    await page.keyboard.press('Control+z');
    await expect(strokes(page)).toHaveCount(0);
    await page.keyboard.press('Control+Shift+z');
    await expect(strokes(page)).toHaveCount(1);
    await page.keyboard.press('Delete');
    await expect(strokes(page)).toHaveCount(0);
  });
});

test('Pens: the colour and width chosen', async ({ page }) => {
  await page.goto('/demos/signature-pad-next/pens-signature-pad-next-demo');
  const blue = page.getByRole('button', { name: 'Blue' });
  await blue.click();
  await expect(blue).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Ink' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await draw(page);
  await expect(strokes(page)).toHaveAttribute('fill', '#1d4ed8');
});

test('Draw or type: a typed name signs', async ({ page }) => {
  await page.goto('/demos/signature-pad-next/type-signature-pad-next-demo');
  await expect(page.getByText('Not signed')).toBeVisible();
  await page.getByRole('tab', { name: 'Type' }).click();
  await page.getByLabel('Type your name').fill('Ada Lovelace');
  await expect(page.getByText('Signed', { exact: true })).toBeVisible();
  // Shown on the surface too.
  await page.getByRole('tab', { name: 'Draw' }).click();
  await expect(surface(page).locator('text')).toHaveText('Ada Lovelace');
});

test('Form: required, then signed', async ({ page }) => {
  await page.goto('/demos/signature-pad-next/form-signature-pad-next-demo');
  await page.getByRole('button', { name: 'Sign', exact: true }).click();
  await expect(page.getByText('Sign above.')).toBeVisible();
  await expect(surface(page)).toHaveAttribute('data-invalid', 'true');
  await page.getByLabel('Full name').fill('Ada Lovelace');
  await draw(page);
  await expect(page.getByText('Sign above.')).toBeHidden();
  await page.getByRole('button', { name: 'Sign', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Signed by Ada Lovelace.');
});

test('Export: drawn again, and exported trimmed', async ({ page }) => {
  await page.goto('/demos/signature-pad-next/export-signature-pad-next-demo');
  await draw(page);
  // The read-only copy draws the same value.
  await expect(
    page.getByRole('img', { name: 'Signature, read-only' }).locator('path'),
  ).toHaveCount(1);
  await expect(
    page.getByRole('img', { name: 'The signature, as exported' }),
  ).toBeVisible();

  const png = page.waitForEvent('download');
  await page.getByRole('button', { name: 'PNG' }).click();
  expect((await png).suggestedFilename()).toBe('signature.png');

  const svg = page.waitForEvent('download');
  await page.getByRole('button', { name: 'SVG' }).click();
  const file = await svg;
  const text = await (await file.createReadStream()).toArray();
  expect(Buffer.concat(text).toString()).toMatch(
    /^<svg[^>]+viewBox="[^"]+"><path d="M /,
  );
});
