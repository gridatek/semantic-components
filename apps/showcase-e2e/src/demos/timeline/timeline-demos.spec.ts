import { type Page, expect, test } from '../../test';

const event = (page: Page, name: string) =>
  page.getByRole('listitem', { name, exact: true });

test.describe('Usage: an activity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/timeline/timeline-usage-demo');
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
    await expect(page.locator('[scTimelineMarker]').first()).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    // No line after the last event.
    await expect(page.locator('[scTimelineConnector]').last()).toBeHidden();
    await expect(page.locator('[scTimelineConnector]').first()).toBeVisible();
  });

  test('one tab stop; ↑ ↓ between events, wrapping; Home and End', async ({
    page,
  }) => {
    await expect(page.locator('[scTimelineItem][tabindex="0"]')).toHaveCount(1);
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
  await page.goto('/demos/timeline/horizontal-timeline-demo');
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
  await page.goto('/demos/timeline/status-timeline-demo');
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
  await page.goto('/demos/timeline/details-timeline-demo');
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
  await page.goto('/demos/timeline/feed-timeline-demo');
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
  await page.goto('/demos/timeline/rtl-timeline-demo');
  const first = event(page, 'الانطلاق');
  await expect(first).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(event(page, 'مراجعة التصميم')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(first).toBeFocused();
});

test('Status: dates from Temporal values, written in the locale', async ({
  page,
}) => {
  await page.goto('/demos/timeline/status-timeline-demo');
  const time = event(page, 'Order placed').locator('time');
  await expect(time).toHaveText('Nov 1');
  await expect(time).toHaveAttribute('datetime', '2026-11-01');
});

test('Alternate: the events on either side in turn, the years across, the line straight', async ({
  page,
}) => {
  await page.goto('/demos/timeline/alternate-timeline-demo');
  const founded = event(page, 'Founded');
  const release = event(page, 'First release');
  await expect(founded).toHaveAttribute('data-side', 'after');
  await expect(release).toHaveAttribute('data-side', 'before');
  await expect(founded).toHaveAccessibleDescription(
    '2019 Two people and a spare room.',
  );

  // The title after the marker on one, before it on the next; the year across.
  const x = (locator: ReturnType<Page['locator']>) =>
    locator.evaluate((e) => e.getBoundingClientRect().left);
  const markerX = await x(founded.locator('[scTimelineMarker]'));
  expect(await x(founded.locator('h3'))).toBeGreaterThan(markerX);
  expect(await x(release.locator('h3'))).toBeLessThan(markerX);
  expect(await x(founded.locator('time'))).toBeLessThan(markerX);
  expect(await x(release.locator('[scTimelineMarker]'))).toBeCloseTo(
    markerX,
    0,
  );
  // The line under the markers, at their centre.
  const line = await founded.locator('[scTimelineConnector]').evaluate((e) => {
    const r = e.getBoundingClientRect();
    return r.left + r.width / 2;
  });
  const marker = await founded.locator('[scTimelineMarker]').evaluate((e) => {
    const r = e.getBoundingClientRect();
    return r.left + r.width / 2;
  });
  expect(Math.abs(line - marker)).toBeLessThan(1.5);
});

test('Failure: the failed step marked, in the destructive colour', async ({
  page,
}) => {
  await page.goto('/demos/timeline/failure-timeline-demo');
  const tests = event(page, 'Tests');
  await expect(tests).toHaveAttribute('data-failed', '');
  await expect(tests).not.toHaveAttribute('aria-current', /.*/);
  await expect(tests.locator('[scTimelineMarker]')).toHaveClass(
    /bg-destructive/,
  );
  await expect(tests).toHaveAccessibleDescription('Failed: 2 of 312 tests.');
});

test('Horizontal, narrow: it scrolls across, and to the event focused', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/demos/timeline/horizontal-timeline-demo');
  const roadmap = page.getByRole('list', { name: 'Roadmap' });
  await expect(event(page, 'Kickoff')).toBeVisible();
  await expect
    .poll(() => roadmap.evaluate((e) => e.scrollWidth > e.clientWidth))
    .toBe(true);
  await page.keyboard.press('Tab');
  await expect(event(page, 'Kickoff')).toBeFocused();
  await page.keyboard.press('End');
  await expect(event(page, 'Launch')).toBeFocused();
  await expect(event(page, 'Launch')).toBeInViewport();
});
