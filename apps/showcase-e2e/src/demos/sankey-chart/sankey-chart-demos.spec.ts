import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sankey-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Sankey: nodes named, a flow per row; the pointer names it', async ({
  page,
}) => {
  await page.goto(demo('sankey'));
  const sankey = page.locator('[data-slot=chart-sankey]');
  await expect(sankey.locator('rect')).toHaveCount(7);
  await expect(sankey.locator('path')).toHaveCount(9);
  await expect(sankey.locator('text')).toContainText([
    'Search',
    'Pricing',
    'Sign up',
  ]);
  await page
    .getByRole('group', { name: 'Where visitors come from and where they go' })
    .focus();
  await expect(tooltip(page)).toContainText('Search → Pricing');
  await expect(tooltip(page)).toContainText('420');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Docs → Left');
});
