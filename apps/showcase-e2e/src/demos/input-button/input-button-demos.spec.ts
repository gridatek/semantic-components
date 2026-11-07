import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/input-button/${name}-input-button-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a button named by its text and its shortcut’s names', async ({
  page,
}) => {
  await page.goto('/demos/input-button/input-button-usage-demo');
  const button = page.getByRole('button', { name: /Search\.\.\./ });
  await expect(button).toHaveAttribute('type', 'button');
  await expect(button).toHaveAccessibleName(/Command/);
});

test('Icon only: named by its sr-only text', async ({ page }) => {
  await page.goto(demo('icon'));
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
});

test('RTL: the icon at the right, the shortcut at the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const [icon, key] = [
    (await page.locator('button[scInputButton] svg').boundingBox())?.x ?? 0,
    (await page.locator('button[scInputButton] kbd').boundingBox())?.x ?? 0,
  ];
  expect(icon).toBeGreaterThan(key);
});
