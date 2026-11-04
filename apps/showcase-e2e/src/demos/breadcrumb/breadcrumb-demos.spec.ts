import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/breadcrumb/${name}-breadcrumb-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the ellipsis is a button that opens the steps left out', async ({
  page,
}) => {
  await page.goto('/demos/breadcrumb/breadcrumb-usage-demo');
  const more = page.getByRole('button', { name: 'More pages' });
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await more.click();
  await expect(more).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('menuitem', { name: 'Themes' })).toBeVisible();
});

test('Basic: a named navigation; the links, then the current page', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const nav = page.getByRole('navigation', { name: 'Location' });
  await expect(nav.getByRole('listitem')).toHaveText([
    'Home',
    'Components',
    'Breadcrumb',
  ]);
  await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'href',
    '/',
  );
  const current = nav.getByText('Breadcrumb', { exact: true });
  await expect(current).toHaveAttribute('aria-current', 'page');
  await expect(current).toHaveAttribute('aria-disabled', 'true');
  // The separators are not read.
  await expect(nav.locator('[scBreadcrumbSeparator]').first()).toHaveAttribute(
    'aria-hidden',
    'true',
  );
});

test('Collapsed with Menu: the ellipsis opens the steps left out', async ({
  page,
}) => {
  await page.goto(demo('ellipsis-menu'));
  const nav = page.getByRole('navigation', { name: 'Docs path' });
  const more = nav.getByRole('button', { name: 'More pages' });
  await more.click();
  await expect(more).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('menuitem', { name: 'GitHub' })).toBeVisible();
});

test('Link Component: a routerLink goes there in the app', async ({ page }) => {
  await page.goto(demo('link'));
  await page
    .getByRole('navigation', { name: 'Site' })
    .getByRole('link', { name: 'Components' })
    .click();
  await expect(page).toHaveURL(/\/docs\/components$/);
});

test('Custom Separator: your icon between the steps', async ({ page }) => {
  await page.goto(demo('separator'));
  const separators = page.locator('[scBreadcrumbSeparator] svg');
  await expect(separators).toHaveCount(2);
});

test('Dropdown: a crumb opens a menu', async ({ page }) => {
  await page.goto(demo('dropdown'));
  await page.getByRole('button', { name: 'Components' }).click();
  await expect(page.getByRole('menuitem', { name: 'Themes' })).toBeVisible();
});

test('Collapsed: an ellipsis for the steps left out, not read', async ({
  page,
}) => {
  await page.goto(demo('ellipsis'));
  const ellipsis = page.locator('[scBreadcrumbEllipsis]');
  await expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
  await expect(
    page.getByRole('navigation', { name: 'Folder path' }).getByRole('link'),
  ).toHaveCount(2);
});

test('RTL: from the right, the chevrons turned to point left; the ellipsis menu right to left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const nav = page.getByRole('navigation', { name: 'مسار التنقل' });
  await expectRtl(nav);
  const items = nav.locator('[scBreadcrumbItem]');
  await expectInlineOrder([items.first(), items.nth(1), items.last()]);
  await expect(nav.locator('[scBreadcrumbSeparator] svg').first()).toHaveCSS(
    'rotate',
    '180deg',
  );
  // The ellipsis opens the steps left out: a menu right to left, from the
  // trigger's start (right) edge; Escape gives focus back.
  const more = nav.getByRole('button', { name: 'صفحات أخرى' });
  await more.click();
  const menu = page.getByRole('menu');
  await expectRtl(menu);
  const [t, m] = [await box(more), await box(menu)];
  expect(Math.abs(t.x + t.width - (m.x + m.width))).toBeLessThan(2);
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(more).toBeFocused();
});

test('The separator stays upright left to right', async ({ page }) => {
  await page.goto('/demos/breadcrumb/breadcrumb-usage-demo');
  await expect(page.locator('[scBreadcrumbSeparator] svg').first()).toHaveCSS(
    'rotate',
    'none',
  );
});

test('On a phone: the demos fit, wrapping if needed @mobile', async ({
  page,
}) => {
  for (const name of [
    'basic',
    'separator',
    'dropdown',
    'ellipsis',
    'ellipsis-menu',
    'rtl',
  ]) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    const list = await box(page.locator('[scBreadcrumbList]'));
    expect(list.x).toBeGreaterThanOrEqual(0);
  }
});
