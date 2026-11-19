import { type Page, expect, test } from '../test';

/**
 * The showcase's navigation bar (`app-navigation-progress`): a thin bar at the
 * top while a slow navigation runs, gone once the page is there.
 */

const bar = (page: Page) => page.locator('app-navigation-progress');

/** Shown: opaque, and grown past nothing. */
const shown = (page: Page) =>
  bar(page).evaluate((element) => {
    const style = getComputedStyle(element);
    const scale = new DOMMatrix(style.transform).a;
    return style.opacity === '1' && scale > 0;
  });

test('a slow navigation: the bar shows while the page loads, then goes', async ({
  page,
}) => {
  await page.route('https://api.github.com/repos/**', (route) =>
    route.fulfill({ json: { stargazers_count: 1 } }),
  );
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto('/');
  await expect(bar(page)).toHaveAttribute('aria-hidden', 'true');
  expect(await shown(page)).toBe(false);

  // The page picked is slow (its scripts held back a second).
  await page.route('**/*.js', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.continue();
  });
  await page
    .getByRole('banner')
    .getByRole('link', { name: 'Charts', exact: true })
    .click();
  await expect.poll(() => shown(page)).toBe(true);
  // Still on the page left: the bar says the click was heard.
  await expect(page).toHaveURL(/\/$/);

  await expect(page).toHaveURL(/\/charts$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Charts');
  await expect.poll(() => shown(page)).toBe(false);
});
