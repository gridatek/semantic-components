import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/slider-next/${name}-slider-next-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named slider; the arrows move it, End to its end', async ({
  page,
}) => {
  await page.goto('/demos/slider-next/slider-next-usage-demo');
  const volume = page.getByRole('slider', { name: 'Volume' });
  await expect(volume).toHaveValue('75');
  await volume.focus();
  await press(page, 'ArrowRight');
  await expect(volume).toHaveValue('76');
  await press(page, 'End');
  await expect(volume).toHaveValue('100');
});

test('Usage: the range follows the value (Chrome draws it from it)', async ({
  page,
}) => {
  await page.goto('/demos/slider-next/slider-next-usage-demo');
  const volume = page.getByRole('slider', { name: 'Volume' });
  const fraction = () =>
    volume.evaluate((el) =>
      (el as HTMLElement).style.getPropertyValue('--sc-slider-value'),
    );
  expect(await fraction()).toBe('0.75');
  await volume.focus();
  await press(page, 'Home');
  await expect.poll(fraction).toBe('0');
});

test('Controlled: its value beside its label, by its step', async ({
  page,
}) => {
  await page.goto(demo('controlled'));
  const temperature = page.getByRole('slider', { name: 'Temperature' });
  await temperature.focus();
  await press(page, 'ArrowRight');
  await expect(page.getByText('0.4', { exact: true })).toBeVisible();
});

test('Disabled: out of reach', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('slider', { name: 'Volume' })).toBeDisabled();
});

test('Vertical: says so; ArrowUp raises it', async ({ page }) => {
  await page.goto(demo('vertical'));
  const bass = page.getByRole('slider', { name: 'Bass' });
  await expect(bass).toHaveAttribute('aria-orientation', 'vertical');
  const box = (await bass.boundingBox())!;
  expect(box.height).toBeGreaterThan(box.width);
  await bass.focus();
  await press(page, 'ArrowUp');
  await expect(bass).toHaveValue('51');
});

test('Form: the model follows', async ({ page }) => {
  await page.goto(demo('form'));
  const volume = page.getByRole('slider', { name: /Volume/ });
  await volume.focus();
  await press(page, 'End');
  await expect(page.locator('pre')).toContainText('"volume": 100');
});

test('RTL: ArrowLeft raises it', async ({ page }) => {
  await page.goto(demo('rtl'));
  const volume = page.getByRole('slider', { name: 'مستوى الصوت' });
  await volume.focus();
  await press(page, 'ArrowLeft');
  await expect(volume).toHaveValue('76');
});
