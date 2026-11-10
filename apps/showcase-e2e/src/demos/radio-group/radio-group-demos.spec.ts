import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/radio-group/${name}-radio-group-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named group, one picked; the arrows move the choice', async ({
  page,
}) => {
  await page.goto('/demos/radio-group/radio-group-usage-demo');
  await expect(page.getByRole('radiogroup', { name: 'Spacing' })).toBeVisible();
  const comfortable = page.getByRole('radio', { name: 'Comfortable' });
  await expect(comfortable).toBeChecked();
  await comfortable.focus();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('radio', { name: 'Compact' })).toBeChecked();
});

test('Checked: its dot shows', async ({ page }) => {
  await page.goto('/demos/radio-group/radio-group-usage-demo');
  const dot = (name: string) =>
    page
      .getByRole('radio', { name })
      .evaluate((el) => getComputedStyle(el, '::before').width);
  // Checked: the preset's dot size; unchecked: nothing drawn.
  expect(await dot('Comfortable')).not.toBe('0px');
  expect(await dot('Default')).toBe('0px');
});

test('Description: read with its radio', async ({ page }) => {
  await page.goto(demo('description'));
  await expect(
    page.getByRole('radio', { name: 'Compact' }),
  ).toHaveAccessibleDescription('Minimal spacing for dense layouts.');
});

test('Choice card: a press on the card picks its radio', async ({ page }) => {
  await page.goto(demo('choice-card'));
  await page.getByText('Enterprise', { exact: true }).click();
  await expect(page.getByRole('radio', { name: /Enterprise/ })).toBeChecked();
});

test('Disabled: the arrows skip it', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('radio', { name: 'Disabled' })).toBeDisabled();
  await page.getByRole('radio', { name: 'Option 3' }).focus();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('radio', { name: 'Option 2' })).toBeChecked();
});

test('Invalid: each radio marked, once touched', async ({ page }) => {
  await page.goto(demo('invalid'));
  await expect(page.getByRole('radio', { name: 'SMS only' })).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('RTL: the radio at the right of its text', async ({ page }) => {
  await page.goto(demo('rtl'));
  const [radio, label] = [
    await box(page.getByRole('radio', { name: 'مريح' })),
    await box(page.getByText('مريح', { exact: true })),
  ];
  expect(radio.x).toBeGreaterThan(label.x);
});
