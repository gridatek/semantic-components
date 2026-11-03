import {
  collectErrors,
  expectLooksDisabled,
  focus,
  press,
} from '../../interaction';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/pagination/${name}-pagination-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named navigation; a page marked current; Next and Previous move', async ({
  page,
}) => {
  await page.goto('/demos/pagination/pagination-usage-demo');
  const nav = page.getByRole('navigation', { name: 'Results' });
  const button = (name: string) =>
    nav.getByRole('button', { name, exact: true });
  await expect(button('1')).toHaveAttribute('aria-current', 'page');
  await expectLooksDisabled(button('Previous'));
  // Buttons by default: never a form's submit button.
  await expect(button('1')).toHaveAttribute('type', 'button');
  await expect(button('Next')).toHaveAttribute('type', 'button');

  await button('Next').click();
  await expect(button('2')).toHaveAttribute('aria-current', 'page');
  await expect(button('1')).not.toHaveAttribute('aria-current');
  await expect(button('Previous')).not.toHaveAttribute('aria-disabled');

  await button('3').click();
  await expect(button('3')).toHaveAttribute('aria-current', 'page');
  await expectLooksDisabled(button('Next'));
});

test('Simple: the pages only, starting at the one given', async ({ page }) => {
  await page.goto(demo('simple'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  await expect(nav.getByRole('button')).toHaveText(['1', '2', '3', '4', '5']);
  await expect(
    nav.getByRole('button', { name: '2', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('Keyboard: Tab through the buttons, a disabled one skipped; Enter goes', async ({
  page,
}) => {
  await page.goto('/demos/pagination/pagination-usage-demo');
  const nav = page.getByRole('navigation', { name: 'Results' });
  const button = (name: string) =>
    nav.getByRole('button', { name, exact: true });
  // Previous is disabled on page 1: out of the tab order.
  await expect(button('Previous')).toHaveAttribute('tabindex', '-1');
  await focus(button('1'));
  await press(page, 'Tab');
  await expect(button('2')).toBeFocused();
  await press(page, 'Enter');
  await expect(button('2')).toHaveAttribute('aria-current', 'page');
});

test('Icons Only: named by sr-only text; the items shown; rows per page from a Select, back to page 1', async ({
  page,
}) => {
  await page.goto(demo('icons-only'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const status = nav.getByRole('status');
  await expect(status).toHaveText('1–25 of 230');

  await nav.getByRole('button', { name: 'Next' }).click();
  await expect(status).toHaveText('26–50 of 230');

  await page.getByRole('combobox', { name: 'Rows per page' }).click();
  await page.getByRole('option', { name: '100', exact: true }).click();
  await expect(status).toHaveText('1–100 of 230');
  await expect(
    page.getByRole('combobox', { name: 'Rows per page' }),
  ).toHaveText('100');
});

test('Ellipsis: the first, the last, the current with its neighbours; ellipses hidden', async ({
  page,
}) => {
  await page.goto(demo('ellipsis'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const pages = nav.locator('[scPaginationLink]');
  await expect(pages).toHaveText(['1', '4', '5', '6', '20']);
  const ellipses = nav.locator('[scPaginationEllipsis]');
  await expect(ellipses).toHaveCount(2);
  await expect(ellipses.first()).toHaveAttribute('aria-hidden', 'true');

  await nav.getByRole('button', { name: '6', exact: true }).click();
  await expect(pages).toHaveText(['1', '5', '6', '7', '20']);
  await nav.getByRole('button', { name: '20', exact: true }).click();
  await expect(pages).toHaveText(['1', '16', '17', '18', '19', '20']);
  await expect(ellipses).toHaveCount(1);
});

test('Siblings: two pages either side of the current one', async ({ page }) => {
  await page.goto(demo('siblings'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const pages = nav.locator('[scPaginationLink]');
  await expect(pages).toHaveText(['1', '8', '9', '10', '11', '12', '20']);
  await nav.getByRole('button', { name: '20', exact: true }).click();
  // As many items at the end: 9.
  await expect(pages).toHaveText([
    '1',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ]);
  await expect(nav.locator('[scPaginationEllipsis]')).toHaveCount(1);
});

test('First and Last: jump to the ends, each disabled there; the status follows', async ({
  page,
}) => {
  await page.goto(demo('first-last'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const status = nav.getByRole('status');
  const button = (name: string) =>
    nav.getByRole('button', { name, exact: true });
  await expect(status).toHaveText('Page 1 of 12');
  await expectLooksDisabled(button('First'));

  await button('Last').click();
  await expect(status).toHaveText('Page 12 of 12');
  await expect(button('12')).toHaveAttribute('aria-current', 'page');
  await expectLooksDisabled(button('Last'));
  await expectLooksDisabled(button('Next'));

  await button('First').click();
  await expect(status).toHaveText('Page 1 of 12');
});

test('Links: each follows its own href; the page read from the URL', async ({
  page,
}) => {
  await page.goto(demo('links'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const link = (name: string) => nav.getByRole('link', { name, exact: true });
  // A link gets no type.
  await expect(link('2')).not.toHaveAttribute('type');
  // The hrefs are the consumer's, not "#".
  await expect(link('2')).toHaveAttribute('href', /[?&]page=2#links-results$/);
  await expect(link('1')).toHaveAttribute('aria-current', 'page');
  await expectLooksDisabled(link('Previous'));
  await expect(link('Previous')).toHaveAttribute('tabindex', '-1');

  await link('2').click();
  await expect(page).toHaveURL(/[?&]page=2#links-results$/);
  await expect(link('2')).toHaveAttribute('aria-current', 'page');

  await link('Next').click();
  await expect(page).toHaveURL(/[?&]page=3#links-results$/);
  await expect(link('3')).toHaveAttribute('aria-current', 'page');

  // Opened at a page's URL: that page is current.
  // Past the last page: kept to the last.
  await page.goto(`${demo('links')}?page=99`);
  await expect(link('10')).toHaveAttribute('aria-current', 'page');
  await expectLooksDisabled(link('Next'));
});

test('Disabled: a disabled page is not followed', async ({ page }) => {
  await page.goto(demo('disabled'));
  const nav = page.getByRole('navigation', { name: 'Results' });
  const three = nav.getByRole('button', { name: '3', exact: true });
  await expectLooksDisabled(three);
  // pointer-events: none stops a pointer; a click event still reaches it.
  await three.dispatchEvent('click');
  await expect(
    nav.getByRole('button', { name: '1', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('RTL: from the right, the chevrons flipped; Next still goes on', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const nav = page.getByRole('navigation', { name: 'النتائج' });
  await expectRtl(nav);
  const previous = nav.getByRole('button', { name: 'السابق' });
  const next = nav.getByRole('button', { name: 'التالي' });
  await expectInlineOrder([
    previous,
    nav.getByRole('button', { name: '1', exact: true }),
    next,
  ]);
  await expect(previous.locator('svg')).toHaveCSS('rotate', '180deg');
  await next.click();
  await expect(
    nav.getByRole('button', { name: '3', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of [
    'simple',
    'icons-only',
    'ellipsis',
    'siblings',
    'first-last',
    'links',
    'disabled',
    'rtl',
  ]) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
