import { collectErrors, press } from '../../interaction';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/trace/${name}-trace-demo`;
const lines = (page: Page) => page.locator('[data-slot=trace-line]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Trace Line: text, not tab stops; icons hidden', async ({ page }) => {
  await page.goto(demo('basic'));
  await expect(lines(page)).toHaveText([
    'Searched for minimumReleaseAge',
    'Read package.json',
    'Ran node --version',
  ]);
  await expect(page.locator('[data-slot=trace-icon]').first()).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await page.keyboard.press('Tab');
  await expect(lines(page).first()).not.toBeFocused();
});

test('Status: on the line; the running title shimmers', async ({ page }) => {
  await page.goto(demo('status'));
  await expect(lines(page).nth(1)).toHaveAttribute('data-status', 'error');
  await expect(lines(page).nth(2)).toHaveAttribute('data-status', 'running');
  await expect(lines(page).nth(3)).toHaveAttribute('data-status', 'pending');
  await expect(lines(page).first()).not.toHaveAttribute('data-status');
  await expect(lines(page).nth(2).locator('[data-slot=trace-title]')).toHaveCSS(
    'animation-name',
    /.+/,
  );
});

test('Description: after the title', async ({ page }) => {
  await page.goto(demo('description'));
  await expect(page.locator('[data-slot=trace-description]')).toHaveText([
    '12 results',
    'src/app/app.config.ts',
    '1.2 s',
  ]);
});

test('Collapsible: a button that opens its output, by keyboard too', async ({
  page,
}) => {
  await page.goto(demo('collapsible'));
  const version = page.getByRole('button', { name: 'Ran node --version' });
  const search = page.getByRole('button', {
    name: 'Searched for provideRouter',
  });
  await expect(version).toHaveAttribute('aria-expanded', 'false');
  await expect(search).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('src/main.ts')).toBeVisible();
  await version.focus();
  await press(page, 'Enter');
  await expect(version).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('v24.18.0')).toBeVisible();
  await press(page, 'Space');
  await expect(version).toHaveAttribute('aria-expanded', 'false');
});

test('Link: the line as a link, named with its new tab', async ({ page }) => {
  await page.goto(demo('link'));
  const link = page.getByRole('link', {
    name: 'Read angular.dev (opens in a new tab)',
  });
  await expect(link).toHaveAttribute('href', 'https://angular.dev');
  await link.focus();
  await expect(link).toBeFocused();
});

test('RTL: mirrored; the chevron points to the start when closed', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await expectRtl(page.locator('[data-slot=trace]'));
  const first = lines(page).first();
  await expectInlineOrder([
    first.locator('[data-slot=trace-icon]'),
    first.locator('[data-slot=trace-title]'),
  ]);
  const chevron = page.locator('[data-slot=trace-collapsible-icon]');
  await expect(chevron).toHaveCSS('scale', '-1 1');
  await page.locator('[data-slot=trace-collapsible-trigger]').click();
  await expect(chevron).toHaveCSS('rotate', '90deg');
});
