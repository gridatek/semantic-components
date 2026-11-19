import { type Page, expect, test } from '../test';

/**
 * The showcase's own header (`app-navbar`) on one line, in every style, at
 * every width: below 768px the logo, actions and mobile menu's toggle; from
 * it, the links too — those that fit beside the actions in that style (the
 * others are hidden by width, from the style's cookie). A new link, or a
 * wider button in a style, brings the wrap back: this catches it.
 */
const STYLES = [
  'nova',
  'vega',
  'maia',
  'lyra',
  'mira',
  'luma',
  'sera',
  'rhea',
] as const;
const PHONES = [360, 640];
const WIDE = [768, 900, 1024, 1280, 1440];

/**
 * GitHub's stars, answered here: the API refuses a burst of requests (403)
 * and the count would then be missing — a narrower button than the real one.
 * Three digits: room for the count to grow.
 */
async function starsAnswered(page: Page) {
  await page.route('https://api.github.com/repos/**', (route) =>
    route.fulfill({ json: { stargazers_count: 999 } }),
  );
}

/** The bar's children that show: one centre line, nothing out of the page. */
async function oneLine(page: Page) {
  const header = page.getByRole('banner').first();
  await expect(header).toHaveCSS('height', '56px');
  // Centred in the bar, its children share one line; a wrapped one sits
  // below the others.
  const centres = await header.evaluate((bar) =>
    [...bar.children]
      .filter(
        (child) =>
          getComputedStyle(child).display !== 'none' &&
          child.getBoundingClientRect().width > 0,
      )
      .map((child) => {
        const box = child.getBoundingClientRect();
        return box.top + box.height / 2;
      }),
  );
  expect(Math.max(...centres) - Math.min(...centres)).toBeLessThan(2);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
}

for (const style of STYLES) {
  test(`${style}: the header on one line at every width`, async ({
    page,
    baseURL,
  }) => {
    await starsAnswered(page);
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: style,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    const nav = page.getByRole('banner').getByRole('navigation', {
      name: 'Main',
      exact: true,
    });
    const toggle = page.getByRole('button', { name: 'Open menu' });

    for (const width of PHONES) {
      await test.step(`${width}px: the mobile menu's toggle`, async () => {
        await page.setViewportSize({ width, height: 600 });
        await page.goto('/');
        await expect(nav).toBeHidden();
        await expect(toggle).toBeVisible();
        await oneLine(page);
      });
    }
    for (const width of WIDE) {
      await test.step(`${width}px: the links`, async () => {
        await page.setViewportSize({ width, height: 600 });
        await page.goto('/');
        await expect(nav).toBeVisible();
        await expect(toggle).toBeHidden();
        // The count in (shown from 768px): the button at its full width.
        await expect(
          page.getByRole('banner').getByRole('link', { name: /GitHub/ }),
        ).toContainText('999');
        await oneLine(page);
      });
    }
  });
}
