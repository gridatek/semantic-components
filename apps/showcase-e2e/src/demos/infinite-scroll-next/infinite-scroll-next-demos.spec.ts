import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const demo = (name: string) =>
  `/demos/infinite-scroll-next/${name}-infinite-scroll-next-demo`;
const scroller = (page: Page) => page.locator('.overflow-y-auto').first();
const status = (page: Page) => page.getByRole('status');

/** Scrolls the box to its end (or start). */
const scrollTo = (box: Locator, where: 'end' | 'start') =>
  box.evaluate((el, at) => {
    el.scrollTop = at === 'end' ? el.scrollHeight : 0;
  }, where);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Feed: fills the box, more near the end, then all said', async ({
  page,
}) => {
  await page.goto(demo('feed'));
  const feed = page.getByRole('feed', { name: 'News' });
  const articles = feed.getByRole('article');
  // Empty at first: it asks until the box is full (and a little more).
  await expect(articles).toHaveCount(8);
  await expect(feed).not.toHaveAttribute('aria-busy');

  await scrollTo(scroller(page), 'end');
  await expect(feed).toHaveAttribute('aria-busy', 'true');
  await expect(status(page)).toContainText('Loading more articles');
  await expect(articles).toHaveCount(16);

  for (const count of [24, 32, 40]) {
    await scrollTo(scroller(page), 'end');
    await expect(articles).toHaveCount(count);
  }
  await expect(status(page)).toHaveText('That’s all: 40 articles.', {
    timeout: 10_000,
  });
  await expect(articles).toHaveCount(40);
  await expect(articles.first()).toHaveAttribute('aria-setsize', '40');
  await expect(articles.last()).toHaveAttribute('aria-posinset', '40');
});

test('Grid: small pages, asked for until the box is full', async ({ page }) => {
  await page.goto(demo('grid'));
  const items = page.getByRole('listitem');
  await expect(items).toHaveCount(9);
  const box = await scroller(page).evaluate((el) => ({
    content: el.scrollHeight,
    shown: el.clientHeight,
  }));
  expect(box.content).toBeGreaterThan(box.shown);
});

test('Load more: only the button asks; hidden when done', async ({ page }) => {
  await page.goto(demo('button'));
  const items = page.getByRole('listitem');
  const more = page.getByRole('button', { name: 'Load more' });
  await expect(items).toHaveCount(5);
  await expect(status(page)).toHaveText('5 results shown.');

  await more.click();
  await expect(more).toBeDisabled();
  await expect(status(page)).toHaveText('Loading…');
  await expect(items).toHaveCount(10);
  await expect(more).toBeEnabled();

  await more.click();
  await expect(items).toHaveCount(15);
  await expect(status(page)).toHaveText('No more results.');
  await expect(more).toBeHidden();
});

test('Error: no asking again by itself; the button retries', async ({
  page,
}) => {
  await page.goto(demo('error'));
  const items = page.getByRole('listitem');
  // Two pages fill the box; the third call fails.
  await expect(items).toHaveCount(20);
  await scrollTo(scroller(page), 'end');
  await expect(status(page)).toHaveText('The orders could not be loaded.');
  const retry = page.getByRole('button', { name: 'Try again' });
  await expect(retry).toBeVisible();

  // Scrolled again: nothing asked (auto is off).
  await scrollTo(scroller(page), 'start');
  await scrollTo(scroller(page), 'end');
  await expect(status(page)).toHaveText('The orders could not be loaded.');
  await expect(items).toHaveCount(20);

  await retry.click();
  await expect(items).toHaveCount(30);
  await expect(retry).toBeHidden();
});

test('Chat: opens at the end; older above, the reader kept in place', async ({
  page,
}) => {
  await page.goto(demo('chat'));
  const log = scroller(page);
  const messages = page.getByRole('listitem');
  await expect(messages).toHaveCount(15);
  const atEnd = await log.evaluate(
    (el) => el.scrollHeight - el.scrollTop - el.clientHeight,
  );
  expect(atEnd).toBeLessThan(2);

  const reading = page.getByText('Message 46', { exact: true });
  await scrollTo(log, 'start');
  const before = (await reading.boundingBox())?.y ?? 0;
  await expect(messages).toHaveCount(30);
  await expect(messages.first()).toHaveText('Message 31');
  const after = (await reading.boundingBox())?.y ?? 0;
  expect(Math.abs(after - before)).toBeLessThan(3);

  for (const count of [45, 60]) {
    await scrollTo(log, 'start');
    await expect(messages).toHaveCount(count);
  }
  await expect(status(page)).toHaveText('The start of the conversation.', {
    timeout: 10_000,
  });
  await expect(messages).toHaveCount(60);
});
