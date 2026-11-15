import { expectNoA11yViolations } from '../axe';
import { fromOtherSite } from '../interaction';
import { expect, test } from '../test';

test.describe('Charts Page', () => {
  test('every chart type, each example at work; the types bar jumps to one', async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      // Another site's resource isn't ours: GitHub's API refuses a burst of
      // requests (403) in CI, and the navbar asks it for the stars.
      if (
        (m.type() === 'warning' || m.type() === 'error') &&
        !fromOtherSite(m, page)
      )
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/charts');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Charts');
    // Each type's section, its examples as charts with their code.
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(12);
    await expect(page.locator('[data-slot=chart]')).toHaveCount(36);
    await expect(
      page.getByRole('link', { name: 'Docs' }).first(),
    ).toHaveAttribute('href', '/docs/components/area-chart');

    // A type's link: to its section, below the header and the types bar.
    const types = page.getByRole('navigation', { name: 'Chart types' });
    await types.getByRole('link', { name: 'Pie' }).click();
    await expect(page).toHaveURL(/\/charts#pie-chart$/);
    const title = page.getByRole('heading', { name: 'Pie Charts' });
    await expect
      .poll(async () => {
        const bar = await types.boundingBox();
        const heading = await title.boundingBox();
        return !!bar && !!heading && heading.y >= bar.y + bar.height;
      })
      .toBe(true);
    await expect(title).toBeInViewport();
    expect(messages).toEqual([]);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    test.slow();
    await page.goto('/charts');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});

test('A chart enters when it is first seen, not while out of view', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/charts');
  // The last line chart: far down the page.
  const line = page.locator('[data-slot=chart-line] path').last();
  await expect(line).toBeAttached();
  const below = await line.evaluate(
    (path) => path.getBoundingClientRect().top > window.innerHeight,
  );
  expect(below).toBe(true);
  // Long past its entrance's length (1.5s): still waiting, undrawn.
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(2000);
  await expect(line).toHaveAttribute('stroke-dasharray', /^0 1$/);
  // Seen: it draws itself, then is whole.
  await line.scrollIntoViewIfNeeded();
  await expect(line).not.toHaveAttribute('stroke-dasharray', /^0 1$/);
  await expect(line).not.toHaveAttribute('stroke-dasharray');
});
