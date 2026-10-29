import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/funnel-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Funnel: a stage per step; the pointer names it', async ({ page }) => {
  await page.goto(demo('funnel'));
  const stages = page.locator('[data-slot=chart-funnel] path');
  await expect(stages).toHaveCount(4);
  await stages.nth(2).hover();
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
  await expect(tooltip(page)).toContainText('Trial');
  await expect(tooltip(page)).toContainText('540');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText('Paid');
});

test('Labels: each stage named inside, its value beside it', async ({
  page,
}) => {
  await page.goto(demo('label-funnel'));
  const lists = page.locator('[data-slot=chart-labels]');
  await expect(lists.nth(0).locator('text').first()).toHaveText('Visit');
  await expect(lists.nth(1).locator('text').first()).toHaveText('1,200');
  await page
    .getByRole('group', { name: 'Visitors at each step to a purchase' })
    .focus();
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Paid');
});
