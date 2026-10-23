import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/code-block/${name}-code-block-demo`;
const content = (page: Page) =>
  page.locator('[data-slot="code-block-content"]');
const lines = (page: Page) => page.locator('[data-slot="code-block-line"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: highlighted; copied; left to right, focusable', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(content(page)).toHaveAttribute('dir', 'ltr');
  await expect(content(page)).toHaveAttribute('tabindex', '0');
  await expect(lines(page)).toHaveCount(9);
  // Highlighted: each token has its light and dark colors.
  await expect
    .poll(() =>
      page
        .locator(
          '[data-slot="code-block-line-content"] span[style*="--shiki-light"]',
        )
        .count(),
    )
    .toBeGreaterThan(10);
  // The empty line keeps a newline: the copied text has the same lines.
  await expect(lines(page).nth(1)).toHaveText('\n');
  const copy = page.getByRole('button', { name: 'Copy code' });
  await page.locator('[data-slot="code-block"]').hover();
  await copy.click();
  await expect(copy).toHaveAttribute('data-copied');
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Copied');
});

test('Basic: the code, on the clipboard', async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Reading the clipboard: Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(demo('basic'));
  await page.locator('[data-slot="code-block"]').hover();
  await page.getByRole('button', { name: 'Copy code' }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('readonly count = signal(0);');
  // The empty line copied as one (Windows' clipboard writes \r\n).
  expect(copied).toMatch(/'@angular\/core';\r?\n\r?\n@Component/);
});

test('Line numbers: from the start line; lines highlighted', async ({
  page,
}) => {
  await page.goto(demo('numbers'));
  await expect(content(page)).toHaveAttribute('data-numbered');
  // Numbered by a CSS counter (its numbers aren't in the DOM): from 12.
  await expect(content(page)).toHaveCSS('counter-reset', 'line 11');
  await expect
    .poll(() =>
      lines(page)
        .first()
        .evaluate((line) => getComputedStyle(line, '::before').content),
    )
    .toContain('counter(line)');
  await expect(lines(page).nth(6)).toHaveAttribute(
    'data-variant',
    'highlighted',
  );
  await expect(lines(page).nth(5)).toHaveAttribute('data-variant', 'default');
});

test('Added and removed: marked', async ({ page }) => {
  await page.goto(demo('changes'));
  await expect(lines(page).nth(1)).toHaveAttribute('data-variant', 'removed');
  await expect(lines(page).nth(2)).toHaveAttribute('data-variant', 'added');
  const mark = (index: number) =>
    lines(page)
      .nth(index)
      .evaluate((line) => getComputedStyle(line, '::after').content);
  await expect.poll(() => mark(1)).toContain('−');
  await expect.poll(() => mark(2)).toContain('+');
});

test('Wrap: no horizontal scroll', async ({ page }) => {
  await page.goto(demo('wrap'));
  await expect(content(page)).toHaveAttribute('data-wrap');
  await expect
    .poll(() =>
      content(page).evaluate((pre) => pre.scrollWidth - pre.clientWidth),
    )
    .toBeLessThanOrEqual(1);
});

test('Actions over the code: shown on hover or focus', async ({ page }) => {
  await page.goto(demo('floating'));
  const actions = page.locator('[data-slot="code-block-actions"]');
  await expect(actions).toHaveCSS('opacity', '0');
  await page.getByRole('button', { name: 'Copy command' }).focus();
  await expect(actions).toHaveCSS('opacity', '1');
});

test('Error output: plain, without a language', async ({ page }) => {
  await page.goto(demo('error'));
  await expect(page.locator('[data-slot="code-block"]')).toHaveAttribute(
    'data-variant',
    'destructive',
  );
  await expect(lines(page)).toHaveCount(2);
  await expect(page.locator('[data-slot="code-block-footer"]')).toHaveText(
    'Exit code 1',
  );
});
