import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/color-picker/${name}-demo`;
const picked = (page: Page) => page.getByTestId('picked');
const picker = (page: Page) => page.locator('[data-slot=color-picker]').first();

async function open(page: Page, name: string) {
  await page.goto(demo(name));
  await expect(picker(page)).toBeVisible();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => open(page, 'color-picker-usage'));

  test('a named group; the area reads its two values', async ({ page }) => {
    await expect(
      page.getByRole('group', { name: 'Brand color' }),
    ).toBeVisible();
    const area = page.getByRole('slider', { name: 'Color' });
    await expect(area).toHaveAttribute('aria-valuetext', '94%, 91%');
    await focus(area);
    await press(page, 'ArrowLeft');
    await expect(area).toHaveAttribute('aria-valuetext', '93%, 91%');
    await expect(picked(page)).toHaveText('#10a6e9');
  });

  test('Page Up: a tenth of the hue; its value in degrees', async ({
    page,
  }) => {
    const hue = page.getByRole('slider', { name: 'Hue' });
    await focus(hue);
    await press(page, 'PageUp');
    await expect(hue).toHaveAttribute('aria-valuetext', '235°');
  });

  test('a click on the area picks there', async ({ page }) => {
    const area = page.getByRole('slider', { name: 'Color' });
    const box = await area.boundingBox();
    await page.mouse.click(
      (box?.x ?? 0) + (box?.width ?? 0) / 2,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect(area).toHaveAttribute('aria-valuetext', '50%, 50%');
  });

  test('any CSS colour typed, taken on Enter; Escape puts the value back', async ({
    page,
  }) => {
    const field = page.getByRole('textbox', { name: 'Hex' });
    await field.fill('rebeccapurple');
    await field.press('Enter');
    await expect(picked(page)).toHaveText('#663399');
    await field.fill('nope');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await field.press('Escape');
    await expect(field).toHaveValue('#663399');
    await expect(field).not.toHaveAttribute('aria-invalid');
  });
});

test('Spaces: HSL, hue × lightness on a canvas, written as hsl()', async ({
  page,
}) => {
  await open(page, 'spaces-color-picker');
  // The demo's hsl() read as itself: no 8-bit round trip, which each browser
  // rounds its own way (Chromium 199.9 80.39%, Firefox 200 80.31% 50.2%).
  await expect(picked(page)).toHaveText('hsl(200 80% 50%)');
  await expect(
    page.locator('[data-slot=color-picker-area] canvas'),
  ).toBeAttached();
  const saturation = page.getByRole('slider', { name: 'Saturation' });
  await expect(saturation).toHaveAttribute('aria-orientation', 'vertical');
  await focus(saturation);
  await press(page, 'Shift+ArrowDown');
  await expect(picked(page)).toHaveText('hsl(200 70% 50%)');
});

test('OKLCH in P3: past the gamut, the nearest colour; let go, there', async ({
  page,
}) => {
  await open(page, 'oklch-color-picker');
  await expect(picked(page)).toHaveText('oklch(0.62 0.19 259)');
  const area = page.getByRole('slider', { name: 'Chroma and lightness' });
  const box = await area.boundingBox();
  // On a whole pixel: Firefox sends the pointer's position in whole pixels,
  // Chromium as given. 30% from the top: lightness about 0.7.
  const y = Math.round((box?.y ?? 0) + (box?.height ?? 0) * 0.3);
  const lightness = 1 - (y - (box?.y ?? 0)) / (box?.height ?? 1);
  await page.mouse.move(
    Math.round((box?.x ?? 0) + (box?.width ?? 0) * 0.95),
    y,
  );
  await page.mouse.down();
  await expect(picker(page)).toHaveAttribute('data-out-of-gamut');
  await page.mouse.up();
  await expect(picker(page)).not.toHaveAttribute('data-out-of-gamut');
  // Chroma lowered to what P3 holds (asked: 0.38).
  await expect(picked(page)).toHaveText(
    new RegExp(`oklch\\(${+lightness.toFixed(4)} 0\\.1\\d+ 259\\)`),
  );
});

test('Presets and channels: a radio group; a channel held to its range', async ({
  page,
}) => {
  await open(page, 'presets-color-picker');
  const blue = page.getByRole('radio', { name: 'Blue' });
  await blue.click();
  await expect(picked(page)).toHaveText('#3b82f6');
  await expect(blue).toHaveAttribute('aria-checked', 'true');
  await press(page, 'ArrowRight');
  await expect(page.getByRole('radio', { name: 'Violet' })).toBeFocused();
  await expect(picked(page)).toHaveText('#8b5cf6');
  const red = page.getByRole('spinbutton', { name: 'R' });
  await red.fill('300');
  await red.press('Enter');
  await expect(red).toHaveValue('255');
  await expect(picked(page)).toHaveText('#ff5cf6');
});

test('Commit: the value follows; valueCommit once let go', async ({ page }) => {
  await open(page, 'commit-color-picker');
  const saved = page.getByTestId('saved');
  const area = page.getByRole('slider', { name: 'Color' });
  const box = await area.boundingBox();
  await page.mouse.move((box?.x ?? 0) + 10, (box?.y ?? 0) + 10);
  await page.mouse.down();
  await page.mouse.move((box?.x ?? 0) + 60, (box?.y ?? 0) + 40, { steps: 4 });
  await expect(picked(page)).not.toHaveText('#f97316');
  await expect(saved).toHaveText('Saved: —');
  await page.mouse.up();
  await expect(saved).not.toHaveText('Saved: —');
  await page.getByRole('button', { name: 'Use purple' }).click();
  await expect(saved).toHaveText('Saved: #663399');
});

test('Read-only: focusable, not changed', async ({ page }) => {
  await open(page, 'read-only-color-picker');
  const area = page.getByRole('slider', { name: 'Color' });
  await expect(area).toHaveAttribute('aria-readonly', 'true');
  await focus(area);
  await press(page, 'ArrowLeft');
  await expect(picked(page)).toHaveText('#22c55e');
});

test('Disabled: not focusable', async ({ page }) => {
  await open(page, 'disabled-color-picker');
  await expect(page.getByRole('slider', { name: 'Color' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await expect(page.getByRole('slider', { name: 'Hue' })).toBeDisabled();
  await expect(page.getByRole('textbox', { name: 'Hex' })).toBeDisabled();
});

test('Form: required, a colour picked, saved', async ({ page }) => {
  await open(page, 'form-color-picker');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText('Pick a color.');
  await focus(page.getByRole('slider', { name: 'Color' }));
  await press(page, 'End');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText(/^Saved #/);
});

test('In a popover: the trigger shows the colour the picker edits', async ({
  page,
}) => {
  await page.goto(demo('popover-color-picker'));
  await page.getByRole('button', { name: 'Brand color' }).click();
  const field = page.getByRole('textbox', { name: 'Hex' });
  await field.fill('#ff0000');
  await field.press('Enter');
  await expect(
    page.getByRole('button', { name: 'Brand color' }).locator('span').first(),
  ).toHaveAttribute('style', /rgb\(255, 0, 0\)|#ff0000/);
});

test('All features: the format select writes the colour again', async ({
  page,
}) => {
  await open(page, 'all-features-color-picker');
  await expect(picked(page)).toHaveText('#0ea5e9');
  const format = page.getByRole('combobox', { name: 'Format' });
  const choose = async (label: string) => {
    await format.click();
    await page.getByRole('option', { name: label, exact: true }).click();
    await expect(page.getByRole('listbox')).toHaveCount(0);
  };
  await choose('HSL');
  await expect(picked(page)).toHaveText(/hsl\(198\.\d+ 88\.\d+% 48\.\d+%\)/);
  await choose('OKLCH');
  await expect(picked(page)).toHaveText(/oklch\(0\.68\d* 0\.14\d* 237\.\d+\)/);
  await choose('RGB');
  await expect(picked(page)).toHaveText('rgb(14 165 233)');
  // A preset: written in the format chosen.
  await page.getByRole('radio', { name: 'Rose' }).click();
  await expect(picked(page)).toHaveText('rgb(225 29 72)');
  // A name typed: taken on Enter, in the format.
  const field = page.getByRole('textbox', { name: 'Color value' });
  await field.fill('rebeccapurple');
  await field.press('Enter');
  await expect(picked(page)).toHaveText('rgb(102 51 153)');
  await expect(field).toHaveValue('rgb(102 51 153)');
});
