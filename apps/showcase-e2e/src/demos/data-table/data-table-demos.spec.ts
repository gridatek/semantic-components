import { allowClipboard, collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/data-table/${name}-data-table-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('payments'));
    await expect(page.locator('tbody tr')).toHaveCount(5);
  });

  test('the email filter narrows the rows; none: "No results."', async ({
    page,
  }) => {
    const filter = page.getByRole('textbox', { name: 'Filter emails' });
    await filter.fill('ken');
    await expect(page.locator('tbody tr')).toHaveCount(1);
    await expect(page.locator('tbody tr')).toContainText('ken99@example.com');
    await filter.fill('nobody');
    await expect(page.locator('tbody tr')).toHaveText(['No results.']);
  });

  test('the email header sorts; its state is on the header', async ({
    page,
  }) => {
    const email = page.getByRole('columnheader', { name: 'Email' });
    await expect(email).toHaveAttribute('aria-sort', 'none');
    await email.getByRole('button').click();
    await expect(email).toHaveAttribute('aria-sort', 'ascending');
    await expect(page.locator('tbody tr').first()).toContainText(
      'Abe45@example.com',
    );
  });

  test('select all ticks the rows and counts them', async ({ page }) => {
    await page.getByRole('checkbox', { name: 'Select all' }).check();
    await expect(page.getByText('5 of 5 row(s) selected.')).toBeVisible();
    await page.getByRole('checkbox', { name: 'Select row' }).first().uncheck();
    await expect(page.getByText('4 of 5 row(s) selected.')).toBeVisible();
    await expect(
      page.getByRole('checkbox', { name: 'Select all' }),
    ).not.toBeChecked();
  });

  test("the Columns menu hides a column; it's ticked while shown", async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Columns' }).click();
    const amount = page.getByRole('menuitemcheckbox', { name: 'amount' });
    await expect(amount).toHaveAttribute('aria-checked', 'true');
    await amount.click();
    await expect(amount).toHaveAttribute('aria-checked', 'false');
    await expect(
      page.getByRole('columnheader', { name: 'Amount' }),
    ).toBeHidden();
    await press(page, 'Escape');
    await expect(page.getByRole('button', { name: 'Columns' })).toBeFocused();
  });

  test("a row's menu: copying its id is said", async ({ page }) => {
    await allowClipboard(page);
    await page.getByRole('button', { name: 'Open menu' }).first().click();
    await page.getByRole('menuitem', { name: 'Copy payment ID' }).click();
    await expect(page.locator('p[aria-live="polite"]')).toHaveText(
      'Copied m5gr84i9',
    );
  });

  test('one page: Previous and Next are off', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
  });
});

test.describe('Pinned columns', () => {
  test('the name and the actions stay while the rest scrolls', async ({
    page,
  }) => {
    await page.goto(demo('pinned'));
    const region = page.getByRole('region', { name: 'Employees' });
    const name = page.getByRole('columnheader', { name: 'Name' });
    const actions = page.getByRole('columnheader', { name: 'Actions' });
    await expect(name).toHaveAttribute('data-pinned', 'start');
    await expect(actions).toHaveAttribute('data-pinned', 'end');
    await expect(name).toHaveCSS('position', 'sticky');
    await expect(
      page.getByRole('columnheader', { name: 'Email' }),
    ).not.toHaveAttribute('data-pinned');

    // Scrolled to the end: the name still at the box's start edge.
    await region.evaluate((box) => (box.scrollLeft = box.scrollWidth));
    await expect
      .poll(async () => {
        const [box, cell] = await Promise.all([
          region.boundingBox(),
          name.boundingBox(),
        ]);
        return Math.round((cell?.x ?? 0) - (box?.x ?? 0));
      })
      .toBeLessThanOrEqual(1);
  });

  test('the box scrolls from the keyboard: it takes focus', async ({
    page,
  }) => {
    await page.goto(demo('pinned'));
    const region = page.getByRole('region', { name: 'Employees' });
    await region.focus();
    await expect(region).toBeFocused();
    await press(page, 'ArrowRight');
    await expect
      .poll(() => region.evaluate((box) => box.scrollLeft))
      .toBeGreaterThan(0);
  });
});

test.describe('RTL', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('rtl'));
    await expect(page.locator('tbody tr')).toHaveCount(4);
  });

  test('right to left, the amounts in the Arabic format', async ({ page }) => {
    await expect(page.locator('[scDataTableProvider]')).toHaveAttribute(
      'dir',
      'rtl',
    );
    await expect(page.locator('tbody tr').first()).toContainText('US$');
  });

  test('pages, sorts and filters', async ({ page }) => {
    await page.getByRole('button', { name: 'التالي' }).click();
    await expect(page.locator('tbody tr')).toHaveCount(2);
    await page.getByRole('button', { name: 'السابق' }).click();
    const amount = page.getByRole('columnheader', { name: 'المبلغ' });
    await amount.getByRole('button').click();
    // Numbers: the largest first, as TanStack sorts them.
    await expect(amount).toHaveAttribute('aria-sort', 'descending');
    await expect(page.locator('tbody tr').first()).toContainText(
      'silas22@example.com',
    );
    await page
      .getByRole('textbox', { name: 'تصفية البريد الإلكتروني' })
      .fill('zzz');
    await expect(page.locator('tbody tr')).toHaveText(['لا توجد نتائج.']);
  });
});
