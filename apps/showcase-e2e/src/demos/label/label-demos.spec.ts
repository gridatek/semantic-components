import { collectErrors } from '../../interaction';
import { box as boxOf } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/label/${name}-label-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a press on the label toggles its checkbox', async ({ page }) => {
  await page.goto('/demos/label/label-usage-demo');
  const box = page.getByRole('checkbox', {
    name: 'Accept terms and conditions',
  });
  await expect(box).not.toBeChecked();
  await page.locator('label[scLabel]').click();
  await expect(box).toBeChecked();
});

test('In a field: it names the field’s input', async ({ page }) => {
  await page.goto(demo('field'));
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});

test('Choice card: the whole card picks; checked, it is tinted', async ({
  page,
}) => {
  await page.goto(demo('choice-card'));
  const card = page.locator('label[scLabel]');
  const box = page.getByRole('checkbox');
  await expect(card).toHaveCSS('border-top-style', 'solid');
  const before = await card.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await card.click();
  await expect(box).toBeChecked();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(before);
});

test('RTL: the box at the right, the text after it', async ({ page }) => {
  await page.goto(demo('rtl'));
  const [box, label] = [
    await boxOf(page.locator('[scField orientation="horizontal"]')),
    await boxOf(page.locator('label[scLabel]')),
  ];
  expect(label.x).toBeLessThan(box.x + box.width);
});
