import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/bubble/${name}-bubble-demo`;
const usage = '/demos/bubble/bubble-usage-demo';
const bubbles = (page: Page) => page.locator('[data-slot="bubble"]');
const reactions = (page: Page) =>
  page.locator('[data-slot="bubble-reactions"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: start and end bubbles; a row of emoji read as one image', async ({
  page,
}) => {
  await page.goto(usage);
  const [mine, theirs] = [
    await box(bubbles(page).nth(0)),
    await box(bubbles(page).nth(1)),
  ];
  // Mine at the end (the right), theirs at the start (the left).
  expect(mine.x + mine.width).toBeGreaterThan(theirs.x + theirs.width);
  expect(theirs.x).toBeLessThan(mine.x);
  await expect(
    page.getByRole('img', {
      name: 'Reactions: thumbs up, fire, eyes, and 2 more',
    }),
  ).toBeVisible();
});

test('Variants: each one marked; ghost takes the full width, the rest at most 80%', async ({
  page,
}) => {
  await page.goto(demo('variants'));
  const variants = await bubbles(page).evaluateAll((all) =>
    all.map((b) => b.getAttribute('data-variant')),
  );
  expect(variants).toEqual([
    'default',
    'secondary',
    'muted',
    'tinted',
    'outline',
    'destructive',
    'ghost',
  ]);
  const row = await box(page.locator('.max-w-sm').first());
  const ghost = await box(bubbles(page).last());
  expect(ghost.width).toBeGreaterThan(row.width * 0.95);
  const muted = await box(bubbles(page).nth(2));
  expect(muted.width).toBeLessThanOrEqual(row.width * 0.8 + 1);
});

test('Group: the bubbles in it closer than those around it', async ({
  page,
}) => {
  await page.goto(demo('group'));
  const rects = await bubbles(page).evaluateAll((all) =>
    all.map((b) => {
      const r = b.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom };
    }),
  );
  const around = rects[1].top - rects[0].bottom;
  const inGroup = rects[2].top - rects[1].bottom;
  expect(inGroup).toBeLessThan(around);
});

test('Links and buttons: a bubble that is a button or a link, named by its text', async ({
  page,
}) => {
  await page.goto(demo('links-buttons'));
  const button = page.getByRole('button', { name: 'I forgot my password' });
  await expect(button).toHaveAttribute('type', 'button');
  await button.click();
  await expect(page.getByText('You chose: I forgot my password')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Read about messages' }),
  ).toHaveAttribute('href', '/docs/components/message');
});

test('Reactions: on the side and at the end asked for, over the edge', async ({
  page,
}) => {
  await page.goto(demo('reactions'));
  const sides = await reactions(page).evaluateAll((all) =>
    all.map((r) => [r.getAttribute('data-side'), r.getAttribute('data-align')]),
  );
  expect(sides).toEqual([
    ['bottom', 'start'],
    ['bottom', 'end'],
    ['top', 'start'],
    ['bottom', 'end'],
  ]);
  // Over the second bubble's bottom edge.
  const [bubble, row] = [
    await box(bubbles(page).nth(1)),
    await box(reactions(page).nth(1)),
  ];
  expect(row.y).toBeLessThan(bubble.y + bubble.height);
  expect(row.y + row.height).toBeGreaterThan(bubble.y + bubble.height);
  await page.getByRole('button', { name: 'Yes, run it' }).click();
  await expect(page.getByText('Running the command…')).toBeVisible();
});

test('Show more: the rest of a long message behind a disclosure', async ({
  page,
}) => {
  await page.goto(demo('show-more'));
  const more = page.getByRole('button', { name: 'Show more' });
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText(/I checked the dialog/)).toBeHidden();
  await more.click();
  await expect(page.getByText(/I checked the dialog/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Show less' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('Tooltip and Popover: a reaction button opens them', async ({ page }) => {
  await page.goto(demo('tooltip'));
  await page.getByRole('button', { name: 'Read' }).hover();
  await expect(page.getByText('Read on Jan 5, 2026 at 4:32 PM')).toBeVisible();

  await page.goto(demo('popover'));
  await page.getByRole('button', { name: 'Show error details' }).click();
  await expect(page.getByText(/ENOENT/)).toBeVisible();
});

test('RTL: start on the right, end on the left; the reactions follow', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await expectRtl(bubbles(page).first());
  const [start, end] = [
    await box(bubbles(page).nth(0)),
    await box(bubbles(page).nth(1)),
  ];
  expect(start.x + start.width).toBeGreaterThan(end.x + end.width);
  // At the first bubble's end: its left half.
  const row = await box(reactions(page).first());
  expect(row.x - start.x).toBeLessThan(start.width / 2);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['variants', 'reactions', 'show-more', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
