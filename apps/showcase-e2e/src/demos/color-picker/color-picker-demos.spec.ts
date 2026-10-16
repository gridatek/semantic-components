import { type Page, expect, test } from '@playwright/test';

const value = (page: Page) => page.locator('pre').first();

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/color-picker/basic-color-picker-demo');
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

  test('the field takes any CSS colour', async ({ page }) => {
    const field = page.getByLabel('Colour');
    await field.fill('rebeccapurple');
    await expect(value(page)).toHaveText('#663399');
    await field.fill('oklch(70% 0.15 150)');
    await expect(value(page)).toHaveText('#4cb86a');
    // Not a colour: marked, nothing changes; left, the colour again.
    await field.fill('nope');
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(value(page)).toHaveText('#4cb86a');
    await field.blur();
    await expect(field).toHaveValue('#4cb86a');
  });

  test('the hue is kept through black', async ({ page }) => {
    const hue = page.getByRole('slider', { name: 'Hue' });
    await hue.fill('200');
    await page.getByLabel('Colour').fill('#000');
    await expect(hue).toHaveValue('200');
  });
});

test('Alpha: in the value', async ({ page }) => {
  await page.goto('/demos/color-picker/alpha-color-picker-demo');
  await page.getByRole('slider', { name: 'Opacity' }).fill('0.25');
  await expect(value(page)).toHaveText('#8b5cf640');
});

test('Formats: the value written again', async ({ page }) => {
  await page.goto('/demos/color-picker/formats-color-picker-demo');
  await page.getByRole('radio', { name: 'hex' }).check();
  await expect(value(page)).toHaveText('#2b7fff');
  await page.getByRole('radio', { name: 'rgb' }).check();
  await expect(value(page)).toHaveText('rgb(43 127 255)');
  await page.getByRole('radio', { name: 'hsl' }).check();
  await expect(value(page)).toHaveText('hsl(216 100% 58%)');
});

test('Swatches: a radio group', async ({ page }) => {
  await page.goto('/demos/color-picker/swatches-color-picker-demo');
  const green = page.getByRole('radio', { name: 'Green' });
  await expect(green).toHaveAttribute('aria-checked', 'true');
  // Only the checked one is in the tab order.
  await expect(page.locator('[role="radio"][tabindex="0"]')).toHaveCount(1);
  await green.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('radio', { name: 'Cyan' })).toBeFocused();
  await expect(value(page)).toHaveText('#06b6d4');
  await page.getByLabel('Colour').fill('#3b82f6');
  await expect(page.getByRole('radio', { name: 'Blue' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
});

test('Popover in a form: required, then chosen', async ({ page }) => {
  await page.goto('/demos/color-picker/form-color-picker-demo');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Choose a colour.')).toBeVisible();
  // No colour: no preset is checked, not even black.
  await page.getByRole('button', { name: 'Brand colour' }).click();
  await expect(page.locator('[role="radio"][aria-checked="true"]')).toHaveCount(
    0,
  );
  const violet = page.getByRole('radio', { name: 'Violet' });
  await violet.click();
  await expect(violet).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved: #8b5cf6');
});
