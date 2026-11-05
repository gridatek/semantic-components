import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/message/${name}-message-demo`;
const messages = (page: Page) => page.locator('[data-slot="message"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: theirs at the start, yours at the end, its footer too', async ({
  page,
}) => {
  await page.goto('/demos/message/message-usage-demo');
  const [theirs, mine] = [messages(page).nth(0), messages(page).nth(1)];
  await expect(mine).toHaveAttribute('data-align', 'end');
  const [a, b] = [
    await box(theirs.locator('[data-slot="message-avatar"]')),
    await box(mine.locator('[data-slot="message-avatar"]')),
  ];
  expect(b.x).toBeGreaterThan(a.x);
  // The footer at the end of your message (justify-end).
  const footer = mine.locator('[data-slot="message-footer"]');
  await expect(footer).toHaveCSS('justify-content', 'flex-end');
});

test('Avatar: at the bottom of its message', async ({ page }) => {
  await page.goto(demo('avatar'));
  const last = messages(page).nth(2);
  const [row, avatar] = [
    await box(last),
    await box(last.locator('[data-slot="message-avatar"]')),
  ];
  expect(row.y + row.height - (avatar.y + avatar.height)).toBeLessThan(2);
});

test('Group: the earlier messages in line with the last one’s avatar', async ({
  page,
}) => {
  await page.goto(demo('group'));
  const contents = page
    .locator('[data-slot="message-group"]')
    .locator('[data-slot="message-content"]');
  const xs = await contents.evaluateAll((all) =>
    all.map((c) => Math.round(c.getBoundingClientRect().x)),
  );
  expect(new Set(xs).size).toBe(1);
});

test('Actions: named; a failed message’s retry at its end', async ({
  page,
}) => {
  await page.goto(demo('actions'));
  for (const name of ['Copy', 'Like', 'Dislike', 'Retry'])
    await expect(page.getByRole('button', { name, exact: true })).toBeVisible();
  await expect(
    messages(page).nth(1).locator('[data-slot="message-footer"]'),
  ).toHaveCSS('justify-content', 'flex-end');
});

test('Status: the message in progress announced', async ({ page }) => {
  await page.goto(demo('status'));
  await expect(page.getByRole('status').first()).toHaveText(
    'Checking the logs...',
  );
});

test('Pattern: Copy becomes Copied; feedback pressed and released', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(demo('pattern'));
  const reply = messages(page).nth(1);
  await reply.getByRole('button', { name: 'Copy' }).click();
  await expect(reply.getByRole('button', { name: 'Copied' })).toBeVisible();
  const good = page.getByRole('button', { name: 'Good response' });
  await expect(good).toHaveAttribute('aria-pressed', 'false');
  await good.click();
  await expect(good).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Bad response' }).click();
  await expect(good).toHaveAttribute('aria-pressed', 'false');
});

test('Attachment: in the message’s column', async ({ page }) => {
  await page.goto(demo('attachment'));
  await expect(
    page.getByRole('button', { name: 'Download sales-dashboard.pdf' }),
  ).toBeVisible();
});

test('RTL: theirs on the right, yours on the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  await expectRtl(messages(page).first());
  const [theirs, mine] = [
    await box(messages(page).nth(0).locator('[data-slot="message-avatar"]')),
    await box(messages(page).nth(1).locator('[data-slot="message-avatar"]')),
  ];
  expect(theirs.x).toBeGreaterThan(mine.x);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['avatar', 'actions', 'attachment', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
