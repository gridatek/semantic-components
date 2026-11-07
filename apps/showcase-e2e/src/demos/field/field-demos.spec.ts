import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/field/${name}-field-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: each control named by its label; the selects’ labels in line with the input’s', async ({
  page,
}) => {
  await page.goto('/demos/field/field-usage-demo');
  await expect(
    page.getByRole('textbox', { name: 'Name on Card' }),
  ).toBeVisible();
  await expect(
    page.getByRole('textbox', { name: 'Card Number' }),
  ).toHaveAccessibleDescription('Enter your 16-digit card number');
  await expect(page.getByRole('combobox', { name: 'Month' })).toBeVisible();
  await expect(
    page.getByRole('checkbox', { name: 'Same as shipping address' }),
  ).toBeChecked();
  const [month, cvv] = [
    await box(page.getByText('Month', { exact: true })),
    await box(page.getByText('CVV', { exact: true })),
  ];
  expect(Math.abs(month.y - cvv.y)).toBeLessThan(2);
});

test('Fieldset: named by its legend', async ({ page }) => {
  await page.goto(demo('fieldset'));
  await expect(
    page.getByRole('group', { name: 'Address Information' }),
  ).toBeVisible();
});

test('Radio: one picked, the arrows move it', async ({ page }) => {
  await page.goto(demo('radio'));
  const monthly = page.getByRole('radio', { name: 'Monthly ($9.99/month)' });
  await expect(monthly).toBeChecked();
  await monthly.focus();
  await press(page, 'ArrowDown');
  await expect(
    page.getByRole('radio', { name: 'Yearly ($99.99/year)' }),
  ).toBeChecked();
});

test('Choice card: a press on the card picks its radio', async ({ page }) => {
  await page.goto(demo('choice-card'));
  await page.getByText('Virtual Machine').click();
  await expect(
    page.getByRole('radio', { name: /Virtual Machine/ }),
  ).toBeChecked();
});

test('Switch: the whole row toggles it', async ({ page }) => {
  await page.goto(demo('switch'));
  const sw = page.getByRole('switch', { name: 'Multi-factor authentication' });
  await page.getByText('Multi-factor authentication').click();
  await expect(sw).toBeChecked();
});

test('Slider: its value in the description', async ({ page }) => {
  await page.goto(demo('slider'));
  await page.getByRole('slider', { name: 'Price limit' }).focus();
  await press(page, 'End');
  await expect(page.locator('[scFieldDescription]')).toContainText('1000');
});

test('Responsive: stacked when narrow, side by side when wide', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(demo('responsive'));
  const field = page.locator('[scField]').first();
  await expect(field).toHaveCSS('flex-direction', 'column');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(field).toHaveCSS('flex-direction', 'row');
});
