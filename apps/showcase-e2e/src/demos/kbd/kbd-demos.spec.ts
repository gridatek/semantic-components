import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/kbd/${name}-kbd-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: keys in groups; a symbol named for screen readers', async ({
  page,
}) => {
  await page.goto('/demos/kbd/kbd-usage-demo');
  await expect(page.locator('[data-slot="kbd-group"]')).toHaveCount(3);
  const command = page.locator('[data-slot="kbd"]').first();
  await expect(command).toHaveText('⌘ Command');
  await expect(command.locator('.sr-only')).toHaveText(' Command');
});

test('Group: the keys inline, in a sentence', async ({ page }) => {
  await page.goto(demo('group'));
  const keys = page.locator('[data-slot="kbd"]');
  const [first, second] = [await box(keys.nth(0)), await box(keys.nth(1))];
  expect(Math.abs(first.y - second.y)).toBeLessThan(2);
  expect(second.x).toBeGreaterThan(first.x);
});

test('Button: the key at its end, the button padded for it', async ({
  page,
}) => {
  await page.goto(demo('button'));
  const button = page.getByRole('button', { name: /^Accept/ });
  const [b, key] = [
    await box(button),
    await box(button.locator('[data-slot="kbd"]')),
  ];
  expect(b.x + b.width - (key.x + key.width)).toBeLessThan(12);
});

test('Input group: the shortcut at the field’s end', async ({ page }) => {
  await page.goto(demo('input-group'));
  const [field, key] = [
    await box(page.getByRole('textbox', { name: 'Search' })),
    await box(page.locator('[data-slot="kbd"]').last()),
  ];
  expect(key.x).toBeGreaterThan(field.x);
});

test('RTL: the keys from the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const keys = page.locator('[data-slot="kbd"]');
  await expectRtl(keys.first());
  const [first, second] = [await box(keys.nth(0)), await box(keys.nth(1))];
  expect(first.x).toBeGreaterThan(second.x);
});
