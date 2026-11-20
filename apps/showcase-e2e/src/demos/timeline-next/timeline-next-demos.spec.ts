import { type Page, expect, test } from '../../test';

const event = (page: Page, name: string) =>
  page.getByRole('listitem', { name, exact: true });

test.describe('Usage: an activity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/timeline-next/timeline-next-usage-demo');
    await expect(event(page, 'Deployed to production')).toBeVisible();
  });

  test('a named list; each event named by its title, described by its time and description', async ({
    page,
  }) => {
    const list = page.getByRole('list', { name: 'Activity' });
    await expect(list.getByRole('listitem')).toHaveCount(4);
    await expect(
      event(page, 'Deployed to production'),
    ).toHaveAccessibleDescription(
      'Today, 2:32 PM Version 2.4.1 is live in every region.',
    );
    await expect(
      page.locator('[scTimelineNextMarker]').first(),
    ).toHaveAttribute('aria-hidden', 'true');
    // No line after the last event.
    await expect(page.locator('[scTimelineNextConnector]').last()).toBeHidden();
    await expect(
      page.locator('[scTimelineNextConnector]').first(),
    ).toBeVisible();
  });

  test('one tab stop; ↑ ↓ between events, wrapping; Home and End', async ({
    page,
  }) => {
    await expect(
      page.locator('[scTimelineNextItem][tabindex="0"]'),
    ).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(event(page, 'Deployed to production')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(event(page, 'Checks passed')).toBeFocused();
    await page.keyboard.press('End');
    await expect(event(page, 'Review requested')).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(event(page, 'Deployed to production')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(event(page, 'Review requested')).toBeFocused();
    await page.keyboard.press('Home');
    await expect(event(page, 'Deployed to production')).toBeFocused();
    // The tab stop follows: the event focused last.
    await page.keyboard.press('ArrowDown');
    await expect(event(page, 'Checks passed')).toHaveAttribute('tabindex', '0');
  });
});

test('Horizontal: ← and →, no wrapping; ↓ does nothing', async ({ page }) => {
  await page.goto('/demos/timeline-next/horizontal-timeline-next-demo');
  await expect(event(page, 'Kickoff')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(event(page, 'Kickoff')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(event(page, 'Kickoff')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(event(page, 'Design review')).toBeFocused();
  await page.keyboard.press('End');
  await expect(event(page, 'Launch')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(event(page, 'Launch')).toBeFocused();
});

test('Status: the current step is the step and the tab stop; the button focuses it', async ({
  page,
}) => {
  await page.goto('/demos/timeline-next/status-timeline-next-demo');
  const shipped = event(page, 'Shipped');
  await expect(shipped).toHaveAttribute('aria-current', 'step');
  await expect(shipped).toHaveAttribute('data-current', '');
  await expect(event(page, 'Packed')).toHaveAttribute('data-complete', '');
  await page.keyboard.press('Tab');
  await expect(shipped).toBeFocused();
  await page.keyboard.press('Home');
  await expect(event(page, 'Order placed')).toBeFocused();
  await page.getByRole('button', { name: 'Go to current step' }).click();
  await expect(shipped).toBeFocused();
});

test('Details: Tab goes into the event; the arrows act only on the event', async ({
  page,
}) => {
  await page.goto('/demos/timeline-next/details-timeline-next-demo');
  await expect(event(page, 'Version 2.4')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(event(page, 'Version 2.4')).toBeFocused();
  await page.keyboard.press('Tab');
  const trigger = event(page, 'Version 2.4').getByRole('button', {
    name: 'What changed',
  });
  await expect(trigger).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(event(page, 'Version 2.4').getByRole('listitem')).toHaveCount(2);
  await page.keyboard.press('Shift+Tab');
  await expect(event(page, 'Version 2.4')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(event(page, 'Version 2.3')).toBeFocused();
});

test('Feed: articles that load more, busy meanwhile; Page Down between them', async ({
  page,
}) => {
  await page.goto('/demos/timeline-next/feed-timeline-next-demo');
  const feed = page.getByRole('feed', { name: 'Team updates' });
  const articles = feed.getByRole('article');
  await expect(articles).toHaveCount(3);
  await expect(articles.first()).toHaveAttribute('aria-setsize', '3');
  await expect(articles.nth(1)).toHaveAttribute('aria-posinset', '2');

  await page.getByRole('button', { name: 'Load more' }).click();
  await expect(feed).toHaveAttribute('aria-busy', 'true');
  await expect(articles).toHaveCount(6);
  await expect(feed).not.toHaveAttribute('aria-busy', /.*/);

  await articles.first().focus();
  await expect(articles.first()).toBeFocused();
  await page.keyboard.press('PageDown');
  await expect(articles.nth(1)).toBeFocused();
  await page.keyboard.press('PageUp');
  await expect(articles.first()).toBeFocused();
});

test('RTL: from the right, ← to the next event', async ({ page }) => {
  await page.goto('/demos/timeline-next/rtl-timeline-next-demo');
  const first = event(page, 'الانطلاق');
  await expect(first).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(event(page, 'مراجعة التصميم')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(first).toBeFocused();
});
