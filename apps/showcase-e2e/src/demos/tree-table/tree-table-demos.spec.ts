import { collectErrors, press } from '../../interaction';
import { expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/tree-table/${name}-tree-table-demo`;
const grid = (page: Page, name = 'Files') =>
  page.getByRole('treegrid', { name });
const rows = (page: Page) => page.locator('tbody tr');
/** A row by its file's name — the toggle, hidden in a tree grid, isn't in it. */
const row = (page: Page, name: string) =>
  page.getByRole('row', {
    name: new RegExp(`(^|\\s)${name.replace(/\./g, '\\.')}\\s`),
  });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('File Explorer: a tree grid — levels, places, one tab stop', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(grid(page)).toBeVisible();
  await expect(rows(page)).toHaveCount(4);
  const src = row(page, 'src');
  await expect(src).toHaveAttribute('aria-level', '1');
  await expect(src).toHaveAttribute('aria-posinset', '1');
  await expect(src).toHaveAttribute('aria-setsize', '4');
  await expect(src).toHaveAttribute('aria-expanded', 'false');
  await expect(row(page, 'package.json')).not.toHaveAttribute('aria-expanded');
  // One row in the tab order; the buttons and the rest out of it.
  await expect(page.locator('tbody [tabindex="0"]')).toHaveCount(1);
  await expect(src.locator('button')).toHaveAttribute('tabindex', '-1');

  await src.focus();
  await press(page, 'ArrowRight');
  await expect(src).toHaveAttribute('aria-expanded', 'true');
  await expect(rows(page)).toHaveCount(7);
  const app = row(page, 'app');
  await expect(app).toHaveAttribute('aria-level', '2');
  await expect(app).toHaveAttribute('aria-setsize', '3');

  await press(page, 'ArrowRight');
  await expect(app).toBeFocused();
  await expect(app).toHaveAttribute('tabindex', '0');
  await expect(src).toHaveAttribute('tabindex', '-1');
  await press(page, 'ArrowDown');
  await expect(row(page, 'main.ts')).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(src).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(src).toHaveAttribute('aria-expanded', 'false');
  await expect(rows(page)).toHaveCount(4);
  await press(page, 'End');
  await expect(row(page, 'README.md')).toBeFocused();
  await press(page, 'Home');
  await expect(src).toBeFocused();
  await press(page, 'Enter');
  await expect(src).toHaveAttribute('aria-expanded', 'true');
});

test('File Explorer: the pointer opens a folder', async ({ page }) => {
  await page.goto(demo('basic'));
  await row(page, 'public').locator('button').click();
  await expect(row(page, 'logo.svg')).toBeVisible();
  await expect(row(page, 'public')).toHaveAttribute('aria-expanded', 'true');
});

test('Expand All: every folder, then none', async ({ page }) => {
  await page.goto(demo('expand-all'));
  const toggle = page.getByRole('button', { name: 'Expand all' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(rows(page)).toHaveCount(11);
  const collapse = page.getByRole('button', { name: 'Collapse all' });
  await expect(collapse).toHaveAttribute('aria-expanded', 'true');
  await collapse.click();
  await expect(rows(page)).toHaveCount(4);
});

test('Selection: Space selects a folder with its files', async ({ page }) => {
  await page.goto(demo('selection'));
  const src = row(page, 'src');
  await expect(grid(page)).toHaveAttribute('aria-multiselectable', 'true');
  await src.focus();
  await press(page, 'ArrowRight');
  await press(page, ' ');
  await expect(src).toHaveAttribute('aria-selected', 'true');
  await expect(row(page, 'main.ts')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('6 selected')).toBeVisible();

  await press(page, 'ArrowDown');
  await press(page, ' ');
  await expect(row(page, 'app')).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByText('3 selected')).toBeVisible();
  // Some of its files left: the folder's box half-ticked.
  await expect
    .poll(() =>
      page
        .getByRole('checkbox', { name: 'Select src' })
        .evaluate((box) => (box as HTMLInputElement).indeterminate),
    )
    .toBe(true);
});

test('Filtering: a match inside a folder keeps its folders', async ({
  page,
}) => {
  await page.goto(demo('filter'));
  const filter = page.getByRole('searchbox', { name: 'Filter files' });
  await filter.fill('routes');
  await expect(rows(page)).toHaveCount(3);
  await expect(row(page, 'app.routes.ts')).toBeVisible();
  await filter.fill('nothing like it');
  await expect(page.getByText('No files match.')).toBeVisible();
});

test('RTL: mirrored; ← opens, → closes', async ({ page }) => {
  await page.goto(demo('rtl'));
  const src = row(page, 'src');
  await expect(src).toBeVisible();
  await expectRtl(grid(page, 'الملفات'));
  await src.focus();
  await press(page, 'ArrowLeft');
  await expect(src).toHaveAttribute('aria-expanded', 'true');
  await press(page, 'ArrowRight');
  await expect(src).toHaveAttribute('aria-expanded', 'false');
});
