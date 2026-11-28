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
 * Three digits: room for the count to grow. Not with SSR: the server fetched
 * the count already.
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

test('a page picked in the mobile menu: the menu closes at once, then the page comes', async ({
  page,
}) => {
  await starsAnswered(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.locator('[data-slot=header-menu]');
  await expect(menu).toBeVisible();
  // The page picked is slow to load (its script held back a second): the
  // menu doesn't wait for it — closing is the header's, a fast page the app's
  // (docs/principles/component-design-principles.md, "A Link Closes Its Popup at Once").
  await page.route(
    '**/*.js',
    async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    },
    // Its first script only: the built app loads a route's chunks one after
    // another, and a second each would outlast the checks below.
    { times: 1 },
  );
  await menu.getByRole('link', { name: 'Charts', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(menu).toHaveCount(0);
  // Closed while the page picked is still loading…
  await expect(page).toHaveURL(/\/$/);
  // …which comes after.
  await expect(page).toHaveURL(/\/charts$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Charts');
});

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
        // The page drawn first: before it, the page is short — no scrollbar
        // to measure (the client-rendered build draws after `load`), and
        // the one that comes with the content then takes 10 px off.
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        // WebKit's media queries measure without the scrollbar (768 wide is
        // 758 to them, below md): the width the browser sees as this one.
        const scrollbar = await page.evaluate(() =>
          matchMedia(`(min-width: ${innerWidth}px)`).matches
            ? 0
            : innerWidth - document.documentElement.clientWidth,
        );
        await page.setViewportSize({ width: width + scrollbar, height: 600 });
        await expect(nav).toBeVisible();
        await expect(toggle).toBeHidden();
        // A count in (shown from 768px): the button at its full width — ours
        // (999), or with SSR the real one, fetched by the server and handed
        // over: the browser doesn't ask again.
        await expect(
          page.getByRole('banner').getByRole('link', { name: /GitHub/ }),
        ).toContainText(/\d/);
        await oneLine(page);
      });
    }
  });
}

test('the logo is the one link home: no Home beside it (WAVE: redundant link)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto('/');
  const banner = page.getByRole('banner');
  await expect(
    banner.getByRole('link', { name: 'Semantic Components' }),
  ).toHaveAttribute('href', '/');
  await expect(banner.locator('a[href="/"]')).toHaveCount(1);
});

test("the landing page: one Get Started, the hero's — not the header's beside it (WAVE: redundant link); elsewhere the header's", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  const getStarted = page.getByRole('link', { name: 'Get Started' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(getStarted).toHaveCount(1);
  await expect(
    page.getByRole('banner').getByRole('link', { name: 'Get Started' }),
  ).toBeHidden();
  await page.goto('/components');
  await expect(
    page.getByRole('banner').getByRole('link', { name: 'Get Started' }),
  ).toBeVisible();
});

test('no :has() on the root in the stylesheets: re-checked on every change in the page, it froze the heaviest pages (charts) on CI', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const rules = await page.evaluate(() => {
    const found: string[] = [];
    const walk = (list: CSSRuleList) => {
      for (const rule of Array.from(list)) {
        const text = (rule as CSSStyleRule).selectorText ?? '';
        if (text.includes(':root:has(')) found.push(text);
        if ('cssRules' in rule) walk((rule as CSSGroupingRule).cssRules);
      }
    };
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        walk(sheet.cssRules);
      } catch {
        // Another origin's sheet: not ours.
      }
    }
    return found;
  });
  expect(rules).toEqual([]);
});
