import { type Page, expect, test } from '@playwright/test';

const bodyRows = (page: Page) => page.locator('tbody tr');
const firstCellText = (page: Page, column: number) =>
  bodyRows(page).first().locator('td').nth(column).innerText();

test.describe('TanStack data table', () => {
  let problems: string[];

  test.beforeEach(async ({ page }) => {
    problems = [];
    page.on('pageerror', (e) => problems.push(e.message));
    page.on('console', (m) => {
      // TanStack warns when a feature function is used but not registered.
      if (m.type() === 'error' || /not registered/.test(m.text())) {
        problems.push(m.text());
      }
    });
    await page.goto('/data-table');
    await expect(bodyRows(page).first()).toBeVisible();
    // Server-rendered: interact only once hydration is done (Angular removes
    // its `ngh` markers), or early clicks are reset.
    await page.waitForFunction(() => !document.querySelector('[ngh]'));
  });

  test.afterEach(() => {
    expect(problems).toEqual([]);
  });

  test('renders a page of rows', async ({ page }) => {
    await expect(bodyRows(page)).toHaveCount(10);
    await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
  });

  test('sorts by a column header', async ({ page }) => {
    const header = page
      .locator('thead tr')
      .first()
      .getByText('Username', { exact: true });
    const usernames = () =>
      bodyRows(page)
        .locator('td:nth-child(4)')
        .allInnerTexts()
        .then((names) => names.map((n) => n.trim()));
    const sorted = (names: string[], dir: 1 | -1) =>
      [...names].sort((a, b) => dir * a.localeCompare(b));

    await header.click();
    await expect
      .poll(async () => {
        const names = await usernames();
        return names.join() === sorted(names, 1).join();
      })
      .toBe(true);

    await header.click();
    await expect
      .poll(async () => {
        const names = await usernames();
        return names.join() === sorted(names, -1).join();
      })
      .toBe(true);
  });

  test('column filter and global filter narrow the rows', async ({ page }) => {
    const total = await page.getByText(/Page 1 of (\d+)/).innerText();
    const usernameFilter = page.getByPlaceholder('Filter...').first();
    const first = (await firstCellText(page, 3)).trim();
    await usernameFilter.fill(first);
    await expect(bodyRows(page).first().locator('td').nth(3)).toHaveText(first);
    await usernameFilter.fill('');

    await page.getByPlaceholder('Search all columns...').fill('zzzz-no-match');
    await expect(page.getByText('No results.')).toBeVisible();
    await page.getByPlaceholder('Search all columns...').fill('');
    await expect(page.getByText(/Page 1 of \d+/)).toHaveText(total);
  });

  test('pagination moves between pages', async ({ page }) => {
    const before = await firstCellText(page, 2);
    await page.locator('[scPaginationNext]').click();
    await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();
    expect(await firstCellText(page, 2)).not.toBe(before);
  });

  test('selection: page checkbox and indeterminate state', async ({ page }) => {
    const headerBox = page.locator('thead input[type=checkbox]');
    const rowBoxes = page.locator('tbody input[type=checkbox]');

    await rowBoxes.first().check();
    await expect(headerBox).not.toBeChecked();
    await expect
      .poll(() => headerBox.evaluate((b: HTMLInputElement) => b.indeterminate))
      .toBe(true);

    await headerBox.check();
    await expect(rowBoxes.nth(5)).toBeChecked();
    // All selected: checked, not indeterminate ("some" includes "all").
    await expect
      .poll(() => headerBox.evaluate((b: HTMLInputElement) => b.indeterminate))
      .toBe(false);
    await expect(page.getByText(/10 of 10 row\(s\) selected/)).toBeVisible();
  });

  test('grouping shows groups with aggregated values', async ({ page }) => {
    await page.getByRole('button', { name: 'role', exact: true }).click();
    const group = bodyRows(page).first();
    await expect(group).toContainText(/\(\d+\)/);
    await expect(group).toContainText('Avg:');
    await expect(group).toContainText('Total:');
  });

  test('expanding shows the row details', async ({ page }) => {
    await bodyRows(page)
      .first()
      .locator('td')
      .nth(1)
      .getByRole('button')
      .click();
    await expect(page.getByText('Full Name:').first()).toBeVisible();
  });

  test('logical column pinning (start / end)', async ({ page }) => {
    const headers = page.locator('thead tr').first().locator('th');
    await page.getByRole('button', { name: 'Pin ID to start' }).click();
    // A start-pinned column moves to the start and sticks there.
    const idHeader = headers.first();
    await expect(idHeader).toHaveText('ID');
    await expect(idHeader).toHaveClass(/sticky/);
    await expect(idHeader).toHaveClass(/start-0/);

    await page.getByRole('button', { name: 'Pin API Calls to end' }).click();
    const apiHeader = page
      .locator('thead tr')
      .first()
      .locator('th', { hasText: 'API Calls' });
    await expect(apiHeader).toHaveClass(/end-0/);
  });
});
