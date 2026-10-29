import { collectErrors, press } from '../../interaction';
import { expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/message-scroller/${name}-message-scroller-demo`;
const viewport = (page: Page) =>
  page.locator('[data-slot=message-scroller-viewport]');
const jump = (page: Page) =>
  page.locator('[data-slot=message-scroller-button]');

/** The viewport's scroll position and its end. */
const scroll = (page: Page) =>
  viewport(page).evaluate((v) => ({
    top: Math.round(v.scrollTop),
    end: v.scrollHeight - v.clientHeight,
  }));

/** A row's top in the viewport. */
const rowTop = (page: Page, id: string) =>
  page.evaluate((id) => {
    const v = document.querySelector('[data-slot=message-scroller-viewport]');
    const row = document.querySelector(`[data-message-id="${id}"]`);
    if (!v || !row) return null;
    return Math.round(
      row.getBoundingClientRect().top - v.getBoundingClientRect().top,
    );
  }, id);

/** A new turn's place: the previous message peeking 64px above it. */
const nearTop = async (page: Page, id: string) => {
  const top = await rowTop(page, id);
  return top !== null && top > 60 && top < 100;
};

const atEnd = async (page: Page) =>
  expect
    .poll(async () => {
      const { top, end } = await scroll(page);
      return end - top;
    })
    .toBeLessThanOrEqual(1);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Conversation: opens at the end; the jump button only when away', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(
    page.getByRole('region', { name: 'Conversation' }),
  ).toBeVisible();
  await expect(page.getByRole('log')).toHaveAttribute(
    'aria-relevant',
    'additions',
  );
  await atEnd(page);
  await expect(jump(page)).toHaveAttribute('data-active', 'false');
  await expect(jump(page)).toHaveAttribute('inert', '');

  await viewport(page).evaluate((v) => (v.scrollTop = 0));
  await expect(jump(page)).toHaveAttribute('data-active', 'true');
  await expect(jump(page)).not.toHaveAttribute('inert');
  await jump(page).click();
  await atEnd(page);
  await expect(jump(page)).toHaveAttribute('data-active', 'false');
});

test('Conversation: the keyboard reaches and scrolls it', async ({ page }) => {
  await page.goto(demo('basic'));
  await atEnd(page);
  await viewport(page).focus();
  await press(page, 'Home');
  await expect.poll(async () => (await scroll(page)).top).toBe(0);
  await expect(jump(page)).toHaveAttribute('data-active', 'true');
  await press(page, 'End');
  await atEnd(page);
});

test('Streaming: the question near the top, then the end followed', async ({
  page,
}) => {
  await page.goto(demo('streaming'));
  await atEnd(page);
  const ask = page.getByRole('button', { name: 'Ask again' });
  await ask.click();
  await expect(page.getByRole('log')).toHaveAttribute('aria-busy', 'true');
  // The previous message peeks 64px above it, under the content's padding.
  await expect.poll(() => nearTop(page, 'ask-1')).toBe(true);
  await expect(ask).toBeEnabled({ timeout: 15_000 });
  await atEnd(page);
});

test('Load History: older messages above, the one read stays put', async ({
  page,
}) => {
  await page.goto(demo('history'));
  await atEnd(page);
  const before = await rowTop(page, 'q4');
  await page.getByRole('button', { name: 'Load older messages' }).click();
  await expect(page.locator('[data-message-id=q2]')).toBeAttached();
  // Within a pixel: WebKit rounds.
  await expect
    .poll(async () =>
      Math.abs(((await rowTop(page, 'q4')) ?? 0) - (before ?? 0)),
    )
    .toBeLessThanOrEqual(1);
});

test('Commands: jumps from outside; the turn being read', async ({ page }) => {
  await page.goto(demo('commands'));
  const reading = page.locator('p[aria-live]');
  await page.getByRole('button', { name: 'Question 3' }).click();
  await expect(reading).toHaveText('Reading: Can a keyboard scroll it?');
  await page.getByRole('button', { name: 'First' }).click();
  await expect.poll(async () => (await scroll(page)).top).toBe(0);
  await expect(reading).toHaveText('Reading: What does a message scroller do?');
  await page.getByRole('button', { name: 'Latest', exact: true }).click();
  await atEnd(page);
});

test('Opening Position: on the last question, not the end', async ({
  page,
}) => {
  await page.goto(demo('position'));
  await expect.poll(() => nearTop(page, 'q5')).toBe(true);
  await expect(jump(page)).toHaveAttribute('data-active', 'true');
});

test('RTL: mirrored, your messages on the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  await expectRtl(viewport(page));
  const bubble = (id: string) =>
    page.locator(`[data-message-id=${id}] [data-slot=bubble]`);
  const mine = await bubble('q1').boundingBox();
  const theirs = await bubble('a1').boundingBox();
  expect(mine && theirs && mine.x < theirs.x).toBe(true);
  await atEnd(page);
});
