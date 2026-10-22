import { type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const demo = (name: string) =>
  `/demos/animated-counter/${name}-animated-counter-demo`;
const counters = (page: Page) => page.locator('[data-slot="animated-counter"]');
/** What is seen: the moving number. */
const seen = (page: Page, n = 0) =>
  counters(page).nth(n).locator('[data-slot="animated-counter-visual"]');
/** What screen readers get: the value. */
const said = (page: Page, n = 0) => counters(page).nth(n).locator('.sr-only');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Count: counts on the way; readers get only the value', async ({
  page,
}) => {
  await page.goto(demo('count'));
  await expect(seen(page)).toHaveText('0');
  await expect(seen(page)).toHaveAttribute('aria-hidden', 'true');
  await page.getByRole('button', { name: '+100' }).click();
  await expect(said(page)).toHaveText('100');
  // On the way: a number between.
  await expect
    .poll(async () => Number(await seen(page).textContent()), {
      intervals: [50],
    })
    .toBeGreaterThan(0);
  await expect(seen(page)).toHaveText('100');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(said(page)).toHaveText('0');
  await expect(seen(page)).toHaveText('0');
});

test('Count: reduced motion — there at once', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('count'));
  await page.getByRole('button', { name: '+100' }).click();
  await expect(seen(page)).toHaveText('100', { timeout: 150 });
});

test('Roll: each digit in its place; the separators still', async ({
  page,
}) => {
  await page.goto(demo('roll'));
  await expect(said(page)).toHaveText('$1,249.99');
  await page.getByRole('button', { name: '+$12.50' }).click();
  await expect(said(page)).toHaveText('$1,262.49');
  const columns = seen(page).locator('.flex-col');
  // 1 2 6 2 . 4 9: six digits rolled, each moved to its own place.
  await expect(columns).toHaveCount(6);
  const places = await columns.evaluateAll((els) =>
    els.map((el) => (el as HTMLElement).style.transform),
  );
  expect(places).toEqual([1, 2, 6, 2, 4, 9].map((d) => `translateY(-${d}em)`));
  await expect(seen(page)).toContainText('$');
});

test('Formats: Intl options, in the counter’s locale', async ({ page }) => {
  await page.goto(demo('formats'));
  await expect(said(page, 0)).toHaveText(/^18\.450,50\s€$/);
  await expect(said(page, 1)).toHaveText(/^12,4\s%$/);
  await expect(said(page, 2)).toHaveText(/^1,2\sMio\.$/);
  await expect(seen(page, 0)).toHaveText(/^\s*18\.450,50\s€\s*$/);
  await page.getByRole('button', { name: 'Next month' }).click();
  await expect(said(page, 1)).toHaveText(/^15,5\s%$/);
});

test('When seen: still at zero until scrolled to, then counted up', async ({
  page,
}) => {
  await page.goto(demo('visible'));
  await expect(said(page, 0)).toHaveText('12,500');
  // A while, still unseen: no move.
  await new Promise((resolve) => setTimeout(resolve, 600));
  await expect(seen(page, 0)).toHaveText('0');
  await page
    .getByRole('region', { name: 'About us' })
    .evaluate((el) => (el.scrollTop = el.scrollHeight));
  await expect(seen(page, 0)).toHaveText('12,500');
  await expect(seen(page, 1)).toHaveText('48');
  await expect(seen(page, 2)).toHaveText('99.95%');
});

test('In a stat card: the figure moves on refresh', async ({ page }) => {
  await page.goto(demo('card'));
  await expect(seen(page)).toHaveText('1,284');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await expect(said(page)).toHaveText('1,421');
  await expect(seen(page)).toHaveText('1,421');
});
