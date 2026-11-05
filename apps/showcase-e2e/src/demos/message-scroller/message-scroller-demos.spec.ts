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
  await page.goto('/demos/message-scroller/message-scroller-usage-demo');
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
  await page.goto('/demos/message-scroller/message-scroller-usage-demo');
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

test('Anchoring turns: the anchor near the top — your question, or the reply', async ({
  page,
}) => {
  await page.goto(demo('anchoring'));
  await atEnd(page);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect.poll(() => nearTop(page, 'ask-1')).toBe(true);
  const reply = page.getByRole('button', { name: 'Anchor the reply' });
  await reply.click();
  await expect(reply).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect.poll(() => nearTop(page, 'reply-2')).toBe(true);
});

test('Group chat: the joined marker is the new turn', async ({ page }) => {
  await page.goto(demo('group-chat'));
  await atEnd(page);
  await page.getByRole('button', { name: 'Marcus joins' }).click();
  await expect(page.getByText('Marcus joined the chat')).toBeVisible();
  await expect.poll(() => nearTop(page, 'joined')).toBe(true);
});

test('Keeping context visible: the peek above a new turn', async ({ page }) => {
  await page.goto(demo('previous-context'));
  await atEnd(page);
  await page.getByRole('button', { name: '160px' }).click();
  await page.getByRole('button', { name: 'Send' }).click();
  await expect
    .poll(async () => (await rowTop(page, 'ask-1')) ?? 0)
    .toBeGreaterThan(150);
});

test('Animating new messages: the new row rises in, then the turn is placed', async ({
  page,
}) => {
  await page.goto(demo('animation'));
  await atEnd(page);
  await page.getByRole('button', { name: 'Send' }).click();
  const row = page.locator('[data-message-id="ask-1"]');
  await expect(row).toHaveCSS('opacity', '1');
  await expect.poll(() => nearTop(page, 'ask-1')).toBe(true);
});

test('Tracking the reader’s position: the jump menu marks the turn read', async ({
  page,
}) => {
  await page.goto(demo('visibility'));
  const menu = page.getByRole('navigation', { name: 'Questions' });
  const first = menu.getByRole('button', {
    name: 'What does a message scroller do?',
  });
  await first.click();
  await expect(first).toHaveAttribute('aria-current', 'true');
  const last = menu.getByRole('button', { name: 'Can a keyboard scroll it?' });
  await last.click();
  await expect(last).toHaveAttribute('aria-current', 'true');
  await expect(first).not.toHaveAttribute('aria-current');
});

test('Reading scroll state: the edges said in words', async ({ page }) => {
  await page.goto(demo('scrollable'));
  const state = page.getByText(/More above|At the start/);
  await expect(state).toHaveText(/More above · At the end/);
  await viewport(page).evaluate((v) => (v.scrollTop = 0));
  await expect(state).toHaveText(/At the start · More below/);
});
