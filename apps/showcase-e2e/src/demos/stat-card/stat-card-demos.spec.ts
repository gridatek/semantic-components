import { type Page, expect, test } from '../../test';

/** A stat's card, by its label. */
const card = (page: Page, label: string) =>
  page
    .locator('[scCard]')
    .filter({ has: page.getByText(label, { exact: true }) });
/** Its numbers, as screen readers get them: the value, the change. */
const numbers = (page: Page, label: string) =>
  card(page, label).locator('[scNumberTicker] .sr-only');
/** Its change's line. */
const change = (page: Page, label: string) =>
  card(page, label).locator('dd').nth(1);

test('Usage: a label, its value and its change, written in the locale', async ({
  page,
}) => {
  await page.goto('/demos/stat-card/stat-card-usage-demo');
  await expect(card(page, 'Revenue').locator('dt')).toHaveText('Revenue');
  await expect(numbers(page, 'Revenue')).toHaveText(['$45,231.89', '+20.1%']);
  await expect(change(page, 'Revenue')).toHaveClass(/text-success/);
});

test('Dashboard: a rise in success, a fall in destructive, no change muted', async ({
  page,
}) => {
  await page.goto('/demos/stat-card/dashboard-stat-card-demo');
  await expect(page.locator('[scCard]')).toHaveCount(4);
  await expect(numbers(page, 'Subscriptions')).toHaveText(['2,350', '+180']);
  await expect(change(page, 'Sales')).toHaveClass(/text-destructive/);
  await expect(numbers(page, 'Sales')).toHaveText(['12,234', '-4.3%']);
  await expect(change(page, 'Active now')).toHaveClass(/text-muted-foreground/);
  await expect(numbers(page, 'Active now')).toHaveText(['573', '0']);
});

test('Good news: down is good for costs, up is bad for errors — said in words too', async ({
  page,
}) => {
  await page.goto('/demos/stat-card/good-stat-card-demo');
  await expect(change(page, 'Cloud costs')).toHaveClass(/text-success/);
  await expect(change(page, 'Cloud costs')).toContainText('(good)');
  await expect(change(page, 'Errors')).toHaveClass(/text-destructive/);
  await expect(change(page, 'Errors')).toContainText('(bad)');
});

test('RTL: labelled in Arabic, its numbers written for it', async ({
  page,
}) => {
  await page.goto('/demos/stat-card/rtl-stat-card-demo');
  await expect(numbers(page, 'الإيرادات')).toHaveCount(2);
  await expect(card(page, 'الإيرادات').locator('dt')).toHaveText('الإيرادات');
});
