import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/number-ticker/${name}-number-ticker-demo`;
const counters = (page: Page) => page.locator('[data-slot="number-ticker"]');
/** What is seen: the moving number. */
const seen = (page: Page, n = 0) =>
  counters(page).nth(n).locator('[data-slot="number-ticker-visual"]');
/** What screen readers get: the value. */
const said = (page: Page, n = 0) => counters(page).nth(n).locator('.sr-only');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: counts on the way; readers get only the value', async ({
  page,
}) => {
  await page.goto('/demos/number-ticker/number-ticker-usage-demo');
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

test('Usage: reduced motion — there at once', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demos/number-ticker/number-ticker-usage-demo');
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

test('In a chart’s center: on an SVG text, counting up — named by its value', async ({
  page,
}) => {
  await page.goto(demo('chart'));
  const total = counters(page);
  // On SVG: an image named by the value; the text the number on its way.
  await expect(total).toHaveAttribute('role', 'img');
  await expect(total).toHaveAttribute('aria-label', '925');
  await expect
    .poll(async () => Number((await total.textContent())?.replace(/\D/g, '')), {
      intervals: [50],
    })
    .toBeLessThan(925);
  await expect(total).toHaveText('925');
});

test('RTL: Arabic digits, rolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('rtl'));
  // ar-EG writes Arabic-Indic digits: ٤٬٨٢٠.
  await expect(said(page)).toHaveText('٤٬٨٢٠');
  await page.getByRole('button', { name: 'زيادة' }).click();
  await expect(said(page)).toHaveText('٦٬٠٧٠');
});

test('RTL, rolling: the digits shown in their order — a number reads left to right there too', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('rtl'));
  await expect(said(page)).toHaveText('٤٬٨٢٠');
  // What the eye reads, left to right: each digit's column (the glyph it
  // has rolled to) and each character beside them, by where they are.
  const shown = () =>
    page.locator('[data-slot=number-ticker-visual]').evaluate((visual) => {
      const columns = [...visual.querySelectorAll('span')].filter((span) =>
        span.classList.contains('overflow-hidden'),
      );
      const chars = [...visual.querySelectorAll('span')].filter(
        (span) =>
          span.children.length === 0 &&
          !columns.some((column) => column.contains(span)),
      );
      const read = (element: Element) => {
        if (!columns.includes(element as HTMLSpanElement))
          return element.textContent ?? '';
        const strip = element.firstElementChild as HTMLElement;
        const place = Number(/-(\d+)em/.exec(strip.style.transform)?.[1] ?? 0);
        return strip.children[place]?.textContent ?? '';
      };
      return [...columns, ...chars]
        .sort(
          (a, b) => a.getBoundingClientRect().x - b.getBoundingClientRect().x,
        )
        .map(read)
        .join('');
    });
  await expect.poll(shown).toBe('٤٬٨٢٠');
  await page.getByRole('button', { name: 'زيادة' }).click();
  await expect.poll(shown).toBe('٦٬٠٧٠');
});
