import { collectErrors } from '../../interaction';
import { openStill } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/code-block/${name}-code-block-demo`;
const usage = '/demos/code-block/code-block-usage-demo';
const content = (page: Page) =>
  page.locator('[data-slot="code-block-content"]').first();
const lines = (page: Page) => page.locator('[data-slot="code-block-line"]');
const tokens = (page: Page) =>
  page.locator(
    '[data-slot="code-block-line-content"] span[style*="--shiki-light"]',
  );

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: highlighted; copied and announced; left to right, focusable', async ({
  page,
}) => {
  await page.goto(usage);
  await expect(content(page)).toHaveAttribute('dir', 'ltr');
  await expect(content(page)).toHaveAttribute('tabindex', '0');
  await expect(lines(page)).toHaveCount(9);
  // Highlighted: each token has its light and dark colors.
  await expect.poll(() => tokens(page).count()).toBeGreaterThan(10);
  // The empty line keeps a newline: the copied text has the same lines.
  await expect(lines(page).nth(1)).toHaveText('\n');
  const copy = page.getByRole('button', { name: 'Copy code' });
  await copy.click();
  await expect(copy).toHaveAttribute('data-copied');
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Copied');
});

test('Usage: the code, on the clipboard', async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Reading the clipboard: Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(usage);
  await page.getByRole('button', { name: 'Copy code' }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('readonly count = signal(0);');
  // The empty line copied as one (Windows' clipboard writes \r\n).
  expect(copied).toMatch(/'@angular\/core';\r?\n\r?\n@Component/);
});

test('Basic: plain, without a language', async ({ page }) => {
  await page.goto(demo('basic'));
  await expect(lines(page)).toHaveCount(6);
  await expect(tokens(page)).toHaveCount(0);
});

test('Actions: the wrap button pressed while the lines wrap', async ({
  page,
}) => {
  await openStill(page, demo('actions'));
  const wrap = page.getByRole('button', { name: 'Wrap lines' });
  await expect(wrap).toHaveAttribute('aria-pressed', 'false');
  await expect(content(page)).not.toHaveAttribute('data-wrap');
  await wrap.click();
  await expect(wrap).toHaveAttribute('aria-pressed', 'true');
  await expect(content(page)).toHaveAttribute('data-wrap');
});

test('Floating Actions: over the code, shown on hover or focus', async ({
  page,
}) => {
  await openStill(page, demo('floating-actions'));
  const actions = page.locator('[data-slot="code-block-actions"]');
  await expect(actions).toHaveCSS('opacity', '0');
  await page.locator('[data-slot="code-block"]').hover();
  await expect(actions).toHaveCSS('opacity', '1');
});

test('Line Numbers, Start Line: numbered from the start line, not copied', async ({
  page,
}) => {
  await page.goto(demo('start-line'));
  await expect(content(page)).toHaveAttribute('data-numbered');
  // The counter starts one before the first line's number.
  await expect(content(page)).toHaveCSS('counter-reset', 'line 994');
  // A number is drawn, not text: the copied code has none.
  await expect(lines(page).first()).not.toContainText('995');
});

test('Highlighted Lines, Diff: the lines marked', async ({ page }) => {
  await page.goto(demo('highlighted-lines'));
  await expect(lines(page).nth(4)).toHaveAttribute(
    'data-variant',
    'highlighted',
  );
  await expect(lines(page).nth(0)).toHaveAttribute('data-variant', 'default');
  await page.goto(demo('diff'));
  await expect(lines(page).nth(1)).toHaveAttribute('data-variant', 'removed');
  await expect(lines(page).nth(2)).toHaveAttribute('data-variant', 'added');
});

test('Wrap: no horizontal scroll', async ({ page }) => {
  await page.goto(demo('wrap'));
  await expect(content(page)).toHaveAttribute('data-wrap');
  expect(
    await content(page).evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBe(true);
});

test('Show More: part of the code, all of it once expanded', async ({
  page,
}) => {
  await openStill(page, demo('show-more'));
  const more = page.getByRole('button', { name: 'Show more' });
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await expect(more).toHaveAttribute('aria-controls', 'show-more-code');
  const height = async () => (await content(page).boundingBox())!.height;
  const before = await height();
  await more.click();
  const less = page.getByRole('button', { name: 'Show less' });
  await expect(less).toHaveAttribute('aria-expanded', 'true');
  expect(await height()).toBeGreaterThan(before);
});

test('Size: the small block, smaller text', async ({ page }) => {
  await page.goto(demo('size'));
  const blocks = page.locator('[data-slot="code-block"]');
  await expect(blocks.nth(1)).toHaveAttribute('data-size', 'sm');
  await expect(blocks.nth(1)).toHaveCSS('font-size', '12px');
  await expect(blocks.nth(0)).toHaveCSS('font-size', '14px');
});

test('Destructive: the error variant', async ({ page }) => {
  await page.goto(demo('destructive'));
  await expect(page.locator('[data-slot="code-block"]')).toHaveAttribute(
    'data-variant',
    'destructive',
  );
});

test('Tabs: one block per file', async ({ page }) => {
  await page.goto(demo('tabs'));
  await expect(page.getByText('src/app/hello.ts')).toBeVisible();
  await page.getByRole('tab', { name: 'hello.html' }).click();
  await expect(page.getByText('src/app/hello.html')).toBeVisible();
});

test('Terminal Output: its colours; copied without the codes', async ({
  page,
  context,
  browserName,
}) => {
  await page.goto(demo('terminal-output'));
  await expect.poll(() => tokens(page).count()).toBeGreaterThan(2);
  await expect(content(page)).not.toContainText('[32m');
  test.skip(browserName !== 'chromium', 'Reading the clipboard: Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy output' }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('12 tests passed');
  expect(copied).not.toContain('\x1b');
});

test('RTL: the header right to left, the code left to right', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await expectRtl(page.locator('[data-slot="code-block-header"]'));
  await expect(content(page)).toHaveAttribute('dir', 'ltr');
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['header', 'show-more', 'tabs', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
