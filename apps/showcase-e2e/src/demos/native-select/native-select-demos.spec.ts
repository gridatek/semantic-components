import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/native-select/${name}-native-select-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a real select, named by its label; the chevron hidden, at its end', async ({
  page,
}) => {
  await page.goto('/demos/native-select/native-select-usage-demo');
  const select = page.getByRole('combobox', { name: 'Status' });
  await select.selectOption('done');
  await expect(select).toHaveValue('done');
  const icon = page.locator('svg[scNativeSelectIcon]');
  await expect(icon).toHaveAttribute('aria-hidden', 'true');
  const [s, i] = [await box(select), await box(icon)];
  // Inside the select, at its end.
  expect(i.x).toBeGreaterThan(s.x + s.width / 2);
  expect(i.x + i.width).toBeLessThanOrEqual(s.x + s.width);
});

test('Groups: options under their group labels', async ({ page }) => {
  await page.goto(demo('groups'));
  await expect(page.locator('optgroup')).toHaveCount(3);
  const select = page.getByRole('combobox', { name: 'Department' });
  await select.selectOption('backend');
  await expect(select).toHaveValue('backend');
});

test('Disabled: disabled, its container dimmed', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('combobox', { name: 'Priority' })).toBeDisabled();
  await expect(page.locator('[scNativeSelectContainer]')).toHaveCSS(
    'opacity',
    '0.5',
  );
});

test('Invalid: aria-invalid, its error read with it; valid once chosen', async ({
  page,
}) => {
  await page.goto(demo('invalid'));
  const select = page.getByRole('combobox', { name: 'Fruit' });
  await expect(select).toHaveAttribute('aria-invalid', 'true');
  await expect(select).toHaveAccessibleDescription('Please select a fruit.');
  await select.selectOption('apple');
  await expect(select).not.toHaveAttribute('aria-invalid');
});

test('Sizes: sm is shorter; the container carries its size', async ({
  page,
}) => {
  await page.goto(demo('sizes'));
  const [normal, small] = [
    await box(page.getByRole('combobox', { name: 'Default' })),
    await box(page.getByRole('combobox', { name: 'Small' })),
  ];
  expect(small.height).toBeLessThan(normal.height);
  await expect(
    page.locator('[scNativeSelectContainer]').nth(1),
  ).toHaveAttribute('data-size', 'sm');
});

test('RTL: the chevron at the left end', async ({ page }) => {
  await page.goto(demo('rtl'));
  const [s, i] = [
    await box(page.getByRole('combobox')),
    await box(page.locator('svg[scNativeSelectIcon]')),
  ];
  expect(i.x + i.width).toBeLessThan(s.x + s.width / 2);
});
