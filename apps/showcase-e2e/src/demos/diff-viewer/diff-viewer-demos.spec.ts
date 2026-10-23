import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/diff-viewer/${name}-diff-viewer-demo`;
const viewer = (page: Page) => page.locator('[data-slot="diff-viewer"]');
const lines = (page: Page, variant?: string) =>
  page.locator(
    variant
      ? `[data-slot="diff-line"][data-variant="${variant}"]`
      : '[data-slot="diff-line"]',
  );

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Unified: both numbers, + and −, changed words, highlighted', async ({
  page,
}) => {
  await page.goto(demo('unified'));
  await expect(viewer(page)).toHaveAttribute('data-view', 'unified');
  await expect(viewer(page)).toHaveAttribute('dir', 'ltr');
  await expect(page.getByText('+4 −4')).toBeVisible();
  await expect(lines(page, 'added')).toHaveCount(4);
  await expect(lines(page, 'removed')).toHaveCount(4);
  await expect(lines(page, 'context')).toHaveCount(9);
  // Changed lines are insertions and deletions.
  await expect(viewer(page).locator('ins')).toHaveCount(4);
  await expect(viewer(page).locator('del')).toHaveCount(4);
  // The indentation kept; the changed word marked.
  await expect(lines(page, 'added').first()).toContainText(
    "  template: '<button",
  );
  await expect(
    lines(page, 'added').first().locator('[class*="bg-foreground/10"]'),
  ).not.toHaveCount(0);
  await expect
    .poll(() => viewer(page).locator('span[style*="--shiki-light"]').count())
    .toBeGreaterThan(20);
});

test('Split: side by side, rows aligned; the view switched', async ({
  page,
}) => {
  await page.goto(demo('split'));
  await expect(viewer(page)).toHaveAttribute('data-view', 'split');
  await expect(
    page.locator('[data-side="old"][data-variant="removed"]'),
  ).toHaveCount(4);
  await expect(
    page.locator('[data-side="new"][data-variant="added"]'),
  ).toHaveCount(4);
  await expect(page.locator('[data-slot="diff-row"]')).toHaveCount(13);
  await page.getByRole('button', { name: 'Unified' }).click();
  await expect(viewer(page)).toHaveAttribute('data-view', 'unified');
  await expect(page.locator('[data-slot="diff-row"]')).toHaveCount(0);
});

test('Folded: unchanged runs folded; a click shows them', async ({ page }) => {
  await page.goto(demo('folded'));
  const folds = page.locator('[data-slot="diff-fold"]');
  await expect(folds).toHaveCount(2);
  await expect(folds.first()).toHaveText('Show 6 unchanged lines');
  const shown = await lines(page).count();
  await folds.first().click();
  await expect(folds).toHaveCount(1);
  await expect(lines(page)).toHaveCount(shown + 6);
});

test('Ignore whitespace: spacing changes no longer count', async ({ page }) => {
  await page.goto(demo('whitespace'));
  const counts = page.getByTestId('counts');
  await expect(counts).toHaveText('+1 −1');
  await page.getByText('Ignore whitespace').click();
  await expect(counts).toHaveText('+0 −0');
  await expect(lines(page, 'added')).toHaveCount(0);
});

test('Identical: nothing changed — your words', async ({ page }) => {
  await page.goto(demo('identical'));
  await expect(page.getByText('No differences.')).toBeVisible();
  await expect(lines(page, 'context')).toHaveCount(1);
});
