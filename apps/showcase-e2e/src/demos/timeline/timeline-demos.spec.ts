import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/timeline/${name}-timeline-demo`;

test('Activity: an ordered list; times from Temporal values', async ({
  page,
}) => {
  await page.goto(demo('activity'));
  const list = page.getByRole('list');
  await expect(list).toHaveJSProperty('tagName', 'OL');
  await expect(list.getByRole('listitem')).toHaveCount(4);
  const time = page.locator('time').first();
  await expect(time).toHaveAttribute('datetime', '2026-10-21T16:30:00');
  await expect(time).toHaveText('Oct 21, 2026, 4:30 PM');
  // The markers are decorative.
  await expect(
    page.locator('[data-slot="timeline-marker"]').first(),
  ).toHaveAttribute('aria-hidden', 'true');
});

test('Tracking: progress by status; the current step', async ({ page }) => {
  await page.goto(demo('tracking'));
  const items = page.getByRole('listitem');
  await expect(items.nth(3)).toHaveAttribute('aria-current', 'step');
  await expect(page.locator('[aria-current]')).toHaveCount(1);
  await expect(items.nth(3)).toContainText('Out for delivery — in progress');
  // The line after a done step is solid, after the rest dashed.
  const line = (n: number) =>
    page
      .locator('[data-slot="timeline-marker"]')
      .nth(n)
      .evaluate(
        (marker) => getComputedStyle(marker, '::after').borderInlineStartStyle,
      );
  expect(await line(0)).toBe('solid');
  expect(await line(3)).toBe('dashed');
  // None after the last.
  expect(
    await page
      .locator('[data-slot="timeline-marker"]')
      .last()
      .evaluate((marker) => getComputedStyle(marker, '::after').display),
  ).toBe('none');
});

/** Where an item's content is: after its marker, or before. */
const side = async (page: Page, n: number) => {
  const item = page.getByRole('listitem').nth(n);
  const marker = await item
    .locator('[data-slot="timeline-marker"]')
    .boundingBox();
  const content = await item
    .locator('[data-slot="timeline-content"]')
    .boundingBox();
  return (content?.x ?? 0) > (marker?.x ?? 0) ? 'after' : 'before';
};

test('Alternate: the content in turn on each side', async ({ page }) => {
  await page.goto(demo('alternate'));
  expect(await side(page, 0)).toBe('after');
  expect(await side(page, 1)).toBe('before');
  // One straight line: the markers share a column.
  const xs = await page
    .locator('[data-slot="timeline-marker"]')
    .evaluateAll((markers) =>
      markers.map((m) => Math.round(m.getBoundingClientRect().x)),
    );
  expect(new Set(xs).size).toBe(1);
  await expect(page.locator('time').first()).toHaveText('March 2024');
});

test('Horizontal: a row; scrolled from the keyboard', async ({ page }) => {
  await page.goto(demo('horizontal'));
  const list = page.getByRole('list', { name: 'Roadmap' });
  await expect(list).toHaveAttribute('tabindex', '0');
  const ys = await page
    .locator('[data-slot="timeline-marker"]')
    .evaluateAll((markers) =>
      markers.map((m) => Math.round(m.getBoundingClientRect().y)),
    );
  expect(new Set(ys).size).toBe(1);
  await expect(page.getByRole('listitem').nth(2)).toHaveAttribute(
    'aria-current',
    'step',
  );
});

test('Right to left: the line follows', async ({ page }) => {
  await page.goto(demo('tracking'));
  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  const item = page.getByRole('listitem').first();
  const marker = await item
    .locator('[data-slot="timeline-marker"]')
    .boundingBox();
  const content = await item
    .locator('[data-slot="timeline-content"]')
    .boundingBox();
  expect(marker?.x ?? 0).toBeGreaterThan(content?.x ?? 0);
});
