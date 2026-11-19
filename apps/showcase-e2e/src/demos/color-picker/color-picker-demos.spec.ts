import { type Page, expect, test } from '../../test';

/** The colour, as the form holds it. */
const value = (page: Page) => page.locator('form code');

test.describe('Every part, in a form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/color-picker/all-features-color-picker-demo');
  });

  test('the area: a click, and the keys', async ({ page }) => {
    const area = page.getByRole('slider', {
      name: 'Saturation and brightness',
    });
    const box = await area.boundingBox();
    await page.mouse.click(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.8,
      (box?.y ?? 0) + (box?.height ?? 0) * 0.2,
    );
    await expect(area).toHaveAttribute(
      'aria-valuetext',
      'Saturation 80%, brightness 80%',
    );
    await page.keyboard.press('Shift+ArrowLeft');
    await page.keyboard.press('ArrowDown');
    await expect(area).toHaveAttribute(
      'aria-valuetext',
      'Saturation 70%, brightness 79%',
    );
  });

  test('the text takes any CSS colour', async ({ page }) => {
    const text = page.getByLabel('Colour');
    await text.fill('rebeccapurple');
    await expect(value(page)).toHaveText('#663399');
    await text.fill('oklch(70% 0.15 150)');
    await expect(value(page)).toHaveText('#4cb86a');
    // Not a colour: marked, nothing changes; left, the colour again.
    await text.fill('nope');
    await expect(text).toHaveAttribute('aria-invalid', 'true');
    await expect(value(page)).toHaveText('#4cb86a');
    await text.blur();
    await expect(text).toHaveValue('#4cb86a');
  });

  test('the hue is kept through black', async ({ page }) => {
    const hue = page.getByRole('slider', { name: 'Hue' });
    await hue.fill('200');
    await page.getByLabel('Colour').fill('#000');
    await expect(hue).toHaveValue('200');
  });

  test('the opacity, in the value', async ({ page }) => {
    await page.getByRole('slider', { name: 'Opacity' }).fill('0.25');
    await expect(value(page)).toHaveText('#0ea5e940');
  });

  test('the format: the value written again', async ({ page }) => {
    const format = page.getByLabel('Format');
    await format.selectOption('rgb');
    await expect(value(page)).toHaveText('rgb(14 165 233)');
    await format.selectOption('hsl');
    await expect(value(page)).toHaveText(/^hsl\(\d+ \d+% \d+%\)$/);
    await format.selectOption('oklch');
    await expect(value(page)).toHaveText(/^oklch\(/);
    await format.selectOption('hex');
    await expect(value(page)).toHaveText('#0ea5e9');
  });

  test('the presets: a radio group', async ({ page }) => {
    const sky = page.getByRole('radio', { name: 'Sky' });
    await expect(sky).toHaveAttribute('aria-checked', 'true');
    // Only the checked one is in the tab order.
    await expect(page.locator('[role="radio"][tabindex="0"]')).toHaveCount(1);
    await sky.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('radio', { name: 'Indigo' })).toBeFocused();
    await expect(value(page)).toHaveText('#6366f1');
    await page.getByLabel('Colour').fill('#22c55e');
    await expect(page.getByRole('radio', { name: 'Green' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  test('disabled from the switch, then saved', async ({ page }) => {
    const text = page.getByLabel('Colour');
    await page.getByRole('switch', { name: 'Disabled' }).check();
    await expect(text).toBeDisabled();
    await page.getByRole('switch', { name: 'Disabled' }).uncheck();
    await expect(text).toBeEnabled();
    await page.getByRole('radio', { name: 'Purple' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('status')).toHaveText('Saved: #a855f7');
  });
});
