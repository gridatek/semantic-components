import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/virtual-list/${name}-demo`;
const list = (page: Page) => page.locator('[data-slot="virtual-list"]').first();
const rows = (page: Page) => page.locator('[data-slot="virtual-list-row"]');
const range = (page: Page) => page.getByTestId('range');

/** How many pairs of rows overlap: none, laid out. */
const overlaps = (page: Page) =>
  rows(page).evaluateAll((elements) => {
    const boxes = elements.map((e) => e.getBoundingClientRect());
    let count = 0;
    boxes.forEach((a, i) =>
      boxes.slice(i + 1).forEach((b) => {
        const across = a.left < b.right - 0.5 && b.left < a.right - 0.5;
        const down = a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5;
        count += Number(across && down);
      }),
    );
    return count;
  });

const scrollTo = (page: Page, top: number) =>
  list(page).evaluate((element, to) => {
    element.scrollTop = to;
  }, top);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => page.goto(demo('virtual-list-usage')));

  test('10,000 rows, a few dozen rendered; each says where it is', async ({
    page,
  }) => {
    await expect(range(page)).toHaveText(/Rendered: 1–\d+ of 10000/);
    expect(await rows(page).count()).toBeLessThan(40);
    await expect(rows(page).first()).toHaveAttribute('aria-posinset', '1');
    await expect(rows(page).first()).toHaveAttribute('aria-setsize', '10000');
    expect(await overlaps(page)).toBe(0);
  });

  test('scrolled to the end: the last rows, in place', async ({ page }) => {
    await expect(range(page)).toHaveText(/Rendered: 1–/);
    await scrollTo(page, 10_000_000);
    await expect(range(page)).toHaveText(/–10000 of 10000/);
    await expect(rows(page).last()).toHaveAttribute('aria-posinset', '10000');
    await expect.poll(() => overlaps(page)).toBe(0);
  });

  test('the focused row stays rendered, scrolled far away', async ({
    page,
  }) => {
    const second = rows(page).nth(1);
    await second.focus();
    await expect(second).toBeFocused();
    await scrollTo(page, 200_000);
    await expect(range(page)).not.toHaveText(/Rendered: 1–/);
    await expect(page.locator('[data-index="1"]')).toBeFocused();
  });
});

test('Variable sizes: measured, never overlapping, as you scroll', async ({
  page,
}) => {
  await page.goto(demo('variable-virtual-list'));
  await expect(range(page)).toHaveText(/Rendered: 1–/);
  const heights = await rows(page).evaluateAll((elements) =>
    elements.map((e) => Math.round(e.getBoundingClientRect().height)),
  );
  expect(new Set(heights).size).toBeGreaterThan(1);
  await scrollTo(page, 30_000);
  await expect(range(page)).not.toHaveText(/Rendered: 1–/);
  await expect.poll(() => overlaps(page)).toBe(0);
});

test('The page scrolls it: the rows follow the page', async ({ page }) => {
  await page.goto(demo('page-virtual-list'));
  await expect(range(page)).toHaveText(/Rendered: 1–\d+ of 500/);
  await page.mouse.wheel(0, 6000);
  await expect(range(page)).not.toHaveText(/Rendered: 1–/);
  await expect.poll(() => overlaps(page)).toBe(0);
});

test('Horizontal: rows along, left to right', async ({ page }) => {
  await page.goto(demo('horizontal-virtual-list'));
  await expect(range(page)).toHaveText(/Rendered: 1–/);
  const xs = await rows(page).evaluateAll((elements) =>
    elements.slice(0, 3).map((e) => e.getBoundingClientRect().left),
  );
  expect(xs[0]).toBeLessThan(xs[1]);
  expect(xs[1]).toBeLessThan(xs[2]);
});

test('Grid: three lanes', async ({ page }) => {
  await page.goto(demo('grid-virtual-list'));
  await expect(range(page)).toHaveText(/Rendered: 1–/);
  const xs = await rows(page).evaluateAll((elements) =>
    elements.map((e) => Math.round(e.getBoundingClientRect().left)),
  );
  expect(new Set(xs).size).toBe(3);
  expect(await overlaps(page)).toBe(0);
});

test.describe('Chat', () => {
  test.beforeEach(({ page }) => page.goto(demo('chat-virtual-list')));

  const where = (page: Page) => page.getByTestId('where');
  const message = (page: Page, text: string) => list(page).getByText(text);

  test('opens at the end', async ({ page }) => {
    await expect(message(page, 'Message 1049')).toBeInViewport();
    await expect(where(page)).toContainText('At the end');
  });

  test('older messages come in above; the one you read stays put', async ({
    page,
  }) => {
    await expect(message(page, 'Message 1049')).toBeInViewport();
    await scrollTo(page, 0);
    await expect(message(page, 'Message 1000')).toBeInViewport();
    const before = await message(page, 'Message 1000').boundingBox();
    await page.getByRole('button', { name: 'Load older' }).click();
    await expect(where(page)).toContainText('70 messages');
    await expect
      .poll(async () =>
        Math.round((await message(page, 'Message 1000').boundingBox())?.y ?? 0),
      )
      .toBe(Math.round(before?.y ?? 0));
  });

  test('at the end, a new message is followed; read back, it is not', async ({
    page,
  }) => {
    const field = page.getByRole('textbox', { name: 'Message' });
    await expect(where(page)).toContainText('At the end');
    await field.fill('hello');
    await field.press('Enter');
    await expect(list(page).getByText('hello')).toBeInViewport();

    await scrollTo(page, 0);
    await expect(where(page)).toContainText('Reading back');
    await field.fill('again');
    await field.press('Enter');
    await expect(where(page)).toContainText('52 messages');
    await expect(where(page)).toContainText('Reading back');
    await expect(list(page).getByText('again')).not.toBeInViewport();
  });
});

test('Scroll to a row: the last, then one in the middle, centred', async ({
  page,
}) => {
  await page.goto(demo('scroll-to-virtual-list'));
  await page.getByRole('button', { name: 'Last' }).click();
  await expect(range(page)).toHaveText(/–10000 of 10000/);
  await page.getByRole('button', { name: /5,000/ }).click();
  await expect(page.locator('[data-index="4999"]')).toBeInViewport();
});

test('RTL: the strip starts at the right', async ({ page }) => {
  await page.goto(demo('rtl-virtual-list'));
  await expect(range(page)).toHaveText(/Rendered: 1–/);
  const box = await list(page).boundingBox();
  const first = await page.locator('[data-index="0"]').boundingBox();
  const second = await page.locator('[data-index="1"]').boundingBox();
  expect((first?.x ?? 0) > (second?.x ?? 0)).toBe(true);
  expect(
    Math.abs(
      (first?.x ?? 0) +
        (first?.width ?? 0) -
        ((box?.x ?? 0) + (box?.width ?? 0)),
    ),
  ).toBeLessThan(4);
});
