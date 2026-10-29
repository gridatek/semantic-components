import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/treemap-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Treemap: a box per browser; the pointer names it', async ({ page }) => {
  await page.goto(demo('treemap'));
  const boxes = page.locator('[data-slot=chart-treemap] rect');
  await expect(boxes).toHaveCount(4);
  await boxes.nth(1).hover();
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
  await expect(tooltip(page)).toContainText('Safari');
  await expect(tooltip(page)).toContainText('200');
  await expect(
    page.locator('[data-slot=chart-labels] text').first(),
  ).toHaveText('Chrome');
});

test('Groups: boxes under their folders; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('grouped-treemap'));
  await expect(page.locator('[data-slot=chart-treemap] rect')).toHaveCount(7);
  await expect(page.locator('[data-slot=chart-treemap] > text')).toHaveText([
    'src',
    'assets',
    'docs',
  ]);
  await page.getByRole('group', { name: 'Disk use by folder, in MB' }).focus();
  await expect(tooltip(page)).toContainText('components');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('api');
});
