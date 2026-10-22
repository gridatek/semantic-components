import { expect, test } from '@playwright/test';

const demo = (name: string) => `/demos/stat-card/${name}-stat-card-demo`;

test('Basic: a description list, its value and signed change', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const card = page.locator('dl[data-slot="stat-card"]');
  await expect(card.locator('dt')).toHaveText('Revenue');
  await expect(card.locator('[data-slot="stat-card-value"]')).toHaveText(
    '$45,231.89',
  );
  const change = card.locator('[data-slot="stat-card-change"]');
  await expect(change).toHaveText('+20.1%');
  await expect(change).toHaveAttribute('data-trend', 'up');
  await expect(change).toHaveAttribute('data-good', 'true');
});

test('Formats: in the card’s locale', async ({ page }) => {
  await page.goto(demo('formats'));
  const values = page.locator('[data-slot="stat-card-value"]');
  await expect(values).toHaveText([
    /^1,3\s?Mio\.$/,
    /^512,4\s?GB$/,
    /^89,50\s?€$/,
  ]);
  await expect(page.locator('[data-slot="stat-card-change"]')).toHaveText([
    /^\+86\.000$/,
    /^\+12,5\s?GB$/,
    /^-2,10\s?€$/,
  ]);
});

test('Good direction: down is good news, unchanged is neither', async ({
  page,
}) => {
  await page.goto(demo('good'));
  const changes = page.locator('[data-slot="stat-card-change"]');
  await expect(changes.nth(0)).toHaveAttribute('data-trend', 'down');
  await expect(changes.nth(0)).toHaveAttribute('data-good', 'true');
  await expect(changes.nth(1)).toHaveAttribute('data-trend', 'up');
  await expect(changes.nth(1)).toHaveAttribute('data-good', 'false');
  await expect(changes.nth(2)).toHaveAttribute('data-trend', 'none');
  await expect(changes.nth(2)).not.toHaveAttribute('data-good');
  await expect(changes.nth(2)).toHaveText('0');
  // Colour from the theme: good and bad differ, unchanged is muted.
  const colour = (n: number) =>
    changes.nth(n).evaluate((el) => getComputedStyle(el).color);
  expect(await colour(0)).not.toBe(await colour(1));
});

test('Text value: your text, without a number', async ({ page }) => {
  await page.goto(demo('text'));
  await expect(page.locator('[data-slot="stat-card-value"]')).toHaveText(
    'All systems normal',
  );
});
