import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/typeset/${name}-typeset-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Headings: set by Typeset with no container, each smaller than the last', async ({
  page,
}) => {
  await page.goto(demo('headings'));
  const heading = (level: number) => page.locator(`h${level}[scTypeset]`);
  await expect(heading(1)).toHaveAttribute('data-typeset', '');
  // shadcn's sizes, in em of the 16px around them.
  await expect(heading(1)).toHaveCSS('font-size', '28px');
  await expect(heading(2)).toHaveCSS('font-size', '20px');
  await expect(heading(3)).toHaveCSS('font-size', '18px');
  await expect(heading(4)).toHaveCSS('font-size', '16px');
  await expect(heading(1)).toHaveCSS('font-weight', '600');
});

test('Text: the paragraph, quote, code and rule set by Typeset with no container', async ({
  page,
}) => {
  await page.goto(demo('text'));
  // A paragraph: the flow above it (1.25em).
  await expect(page.locator('p[scTypeset]').last()).toHaveCSS(
    'margin-top',
    '20px',
  );
  // A quote: the rule at its start.
  await expect(page.locator('blockquote[scTypeset]')).toHaveCSS(
    'border-left-width',
    '2px',
  );
  // Inline code: on a box, smaller.
  const code = page.locator('code[scTypeset]');
  await expect(code).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(code).toHaveCSS('font-size', '13.6px');
  // A rule: its line, the space above it.
  const rule = page.locator('hr[scTypeset]');
  await expect(rule).toHaveCSS('border-top-width', '1px');
  await expect(rule).toHaveCSS('margin-top', '48px');
});

test('Your classes win: a utility over the rules', async ({ page }) => {
  await page.goto(demo('headings'));
  const h1 = page.locator('h1[scTypeset]');
  await h1.evaluate((el) => el.classList.add('text-sm'));
  await expect(h1).toHaveCSS('font-size', '14px');
});

test('Usage: plain elements in a container, set by it', async ({ page }) => {
  await page.goto('/demos/typeset/typeset-usage-demo');
  const content = page.locator('article.typeset');
  // A heading's size, a list's bullets, a quote's rule: no directive on any.
  await expect(content.locator('h2')).toHaveCSS('font-weight', '600');
  await expect(content.locator('ul')).toHaveCSS('list-style-type', 'disc');
  await expect(content.locator('blockquote')).toHaveCSS(
    'border-left-width',
    '2px',
  );
  await expect(content.locator('code')).toHaveCSS(
    'font-family',
    /mono|Mono|monospace/,
  );
});

test('Tuning: the variables on a container make it tighter', async ({
  page,
}) => {
  await page.goto(demo('tuning'));
  const [docs, chat] = [
    page.locator('article.typeset').first().locator('p').last(),
    page.locator('article.typeset').last().locator('p').last(),
  ];
  const [roomy, tight] = [
    parseFloat(await docs.evaluate((p) => getComputedStyle(p).marginTop)),
    parseFloat(await chat.evaluate((p) => getComputedStyle(p).marginTop)),
  ];
  expect(tight).toBeLessThan(roomy);
});

test('Components inside: a button keeps its look; not-typeset opts out', async ({
  page,
}) => {
  await page.goto(demo('components'));
  // The button: its own (no paragraph flow on it from the content's rules).
  const button = page.getByRole('button', { name: 'Subscribe' });
  await expect(button).toHaveAttribute('data-slot', 'button');
  // Opted out: no paragraph spacing.
  await expect(page.locator('.not-typeset p')).toHaveCSS('margin-top', '0px');
});

test('Wide table: it scrolls in its own box, reached by the keyboard', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto(demo('table'));
  const region = page.getByRole('region', { name: 'The treasury' });
  await expect(region).toHaveAttribute('tabindex', '0');
  const overflows = await region.evaluate(
    (box) => box.scrollWidth > box.clientWidth,
  );
  expect(overflows).toBe(true);
});

test('RTL: right to left, the quote’s rule on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const quote = page.locator('[dir=rtl] blockquote');
  await expect(quote).toHaveCSS('border-right-width', '2px');
  await expect(quote).toHaveCSS('border-left-width', '0px');
});
