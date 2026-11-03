import { collectErrors, focus, press } from '../../interaction';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/table/${name}-table-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a table named by its caption, its columns by their headers', async ({
  page,
}) => {
  await page.goto('/demos/table/table-usage-demo');
  const table = page.getByRole('table', {
    name: 'A list of your recent invoices.',
  });
  await expect(table.getByRole('columnheader')).toHaveText([
    'Invoice',
    'Status',
    'Method',
    'Amount',
  ]);
  // The header row and seven invoices.
  await expect(table.getByRole('row')).toHaveCount(8);
  await expect(
    table.getByRole('row', { name: /INV003/ }).getByRole('cell'),
  ).toHaveText(['INV003', 'Unpaid', 'Bank Transfer', '$350.00']);
});

test('Rows: highlighted on hover, no line below the last', async ({ page }) => {
  await page.goto('/demos/table/table-usage-demo');
  const rows = page.locator('tbody tr');
  const first = rows.first();
  const before = await first.evaluate(
    (row) => getComputedStyle(row).backgroundColor,
  );
  await first.hover();
  await expect
    .poll(() => first.evaluate((row) => getComputedStyle(row).backgroundColor))
    .not.toBe(before);
  await expect(rows.last()).toHaveCSS('border-bottom-width', '0px');
});

test('Footer: the total in the footer row, under the amounts', async ({
  page,
}) => {
  await page.goto(demo('footer'));
  const cells = page.locator('tfoot').getByRole('cell');
  await expect(cells).toHaveText(['Total', '$750.00']);
  await expect(cells.first()).toHaveAttribute('colspan', '3');
});

test('Scrolling: the container scrolls sideways, reached and moved by the keyboard', async ({
  page,
}) => {
  await page.goto(demo('scrolling'));
  const region = page.getByRole('region', { name: 'Orders' });
  await expect
    .poll(() => region.evaluate((el) => el.scrollWidth > el.clientWidth))
    .toBe(true);
  await focus(region);
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await expect
    .poll(() => region.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await expectNoHorizontalScroll(page);
});

test('RTL: the first column on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const table = page.getByRole('table', { name: 'قائمة بفواتيرك الأخيرة.' });
  await expectRtl(table);
  const headers = table.getByRole('columnheader');
  await expectInlineOrder([headers.first(), headers.nth(1), headers.last()]);
});

test('On a phone: the demos fit; a wide table scrolls in its container @mobile', async ({
  page,
}) => {
  for (const name of ['footer', 'scrolling', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
  await page.goto('/demos/table/table-usage-demo');
  await expectNoHorizontalScroll(page);
});
