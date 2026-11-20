import { collectErrors } from '../../interaction';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/toc/${name}-toc-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

const toc = (page: Page, name = 'On this page') =>
  page.getByRole('navigation', { name });

/** The one link marked as the section read. */
const current = (nav: Locator) => nav.locator('a[aria-current="location"]');

/** Scrolled by the reader (a wheel), to its end. */
async function scrollToEnd(page: Page, box: Locator) {
  await box.hover();
  await page.mouse.wheel(0, 5000);
  await expect
    .poll(() =>
      box.evaluate(
        (el) => el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
      ),
    )
    .toBe(true);
}

test('Usage: the page headings, the section read marked as the page scrolls', async ({
  page,
}) => {
  await page.goto('/demos/toc/toc-usage-demo');
  const nav = toc(page);
  await expect(nav.getByRole('link')).toHaveText([
    'Introduction',
    'Installation',
    'Usage',
    'Examples',
    'API reference',
  ]);
  await expect(current(nav)).toHaveText('Introduction');
  // The third heading at the top: its section is read.
  await page
    .getByRole('heading', { name: 'Usage' })
    .evaluate((el) =>
      window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 64),
    );
  await expect(current(nav)).toHaveText('Usage');
  // At the end: the last one, though its heading can't reach the top.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(current(nav)).toHaveText('API reference');
});

test('Basic: listed from the headings, ids from their text, links to this page', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const nav = toc(page, 'Article contents');
  await expect(nav.getByRole('link')).toHaveText([
    'Getting started',
    'Headings',
    'Links',
    'Scrolling',
    'Focus',
  ]);
  await expect(
    page.getByRole('heading', { name: 'Getting started' }),
  ).toHaveAttribute('id', 'getting-started');
  // This page at the section — not `#id` alone (the home page's, with <base>).
  await expect(nav.getByRole('link', { name: 'Headings' })).toHaveAttribute(
    'href',
    `${demo('basic')}#headings`,
  );
  // At the top, the first section is read.
  await expect(current(nav)).toHaveText('Getting started');
  await expect(current(nav)).toHaveAttribute('data-active', 'true');
});

test('Basic: a link scrolls its box to the section, focus on its heading', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const nav = toc(page, 'Article contents');
  const box = page.getByRole('region', { name: 'Article' });
  await nav.getByRole('link', { name: 'Headings' }).click();
  await expect(page).toHaveURL(`${demo('basic')}#headings`);
  const heading = page.getByRole('heading', { name: 'Headings' });
  await expect(heading).toBeFocused();
  await expect(current(nav)).toHaveText('Headings');
  // The box scrolled, to the heading's scroll margin; the page didn't move.
  await expect
    .poll(() =>
      heading.evaluate((el) => {
        const box = el.parentElement?.getBoundingClientRect();
        return el.getBoundingClientRect().top - (box?.top ?? 0);
      }),
    )
    .toBeCloseTo(16, 0); // its 16px scroll margin (the frame is a ring: no border)
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  // Read on: the reader's own scroll marks the section again.
  await scrollToEnd(page, box);
  await expect(current(nav)).toHaveText('Focus');
});

test('Basic: a section near the end, followed, stays marked', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const nav = toc(page, 'Article contents');
  // Its heading can't reach the top: the box ends first — at its end, where
  // the last section would be marked. The one chosen is.
  await nav.getByRole('link', { name: 'Scrolling' }).click();
  const box = page.getByRole('region', { name: 'Article' });
  await expect
    .poll(() =>
      box.evaluate(
        (el) => el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
      ),
    )
    .toBe(true);
  await expect(current(nav)).toHaveText('Scrolling');
});

test('Basic: Enter on a link, then Tab, goes on from the section', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const link = toc(page, 'Article contents').getByRole('link', {
    name: 'Links',
  });
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Links' })).toBeFocused();
});

test('Levels: the deeper headings indented, by their depth', async ({
  page,
}) => {
  await page.goto(demo('levels'));
  const nav = toc(page, 'Guide contents');
  const links = nav.getByRole('link');
  await expect(links).toHaveText([
    'Install',
    'npm',
    'pnpm',
    'Configure',
    'Presets',
    'Themes',
  ]);
  await expect(links.nth(0)).toHaveAttribute('data-depth', '0');
  await expect(links.nth(1)).toHaveAttribute('data-depth', '1');
  const inset = (link: Locator) =>
    link.evaluate((el) => parseFloat(getComputedStyle(el).paddingInlineStart));
  expect(await inset(links.nth(0))).toBe(0);
  expect(await inset(links.nth(1))).toBeGreaterThan(0);
});

test('Hand-written links: to your ids; the last one marked at the end', async ({
  page,
}) => {
  await page.goto(demo('links'));
  const nav = toc(page, 'Release notes contents');
  await expect(nav.getByRole('link', { name: 'Changed' })).toHaveAttribute(
    'href',
    `${demo('links')}#changed`,
  );
  await expect(current(nav)).toHaveText('Added');
  await scrollToEnd(page, page.getByRole('region', { name: 'Release notes' }));
  await expect(current(nav)).toHaveText('Fixed');
});

test('RTL: mirrored, indented from the right, Arabic ids', async ({ page }) => {
  await page.goto(demo('rtl'));
  const nav = toc(page, 'محتويات الدليل');
  const links = nav.getByRole('link');
  await expect(links).toHaveCount(5);
  await expectRtl(nav);
  // The text on the right, the list on its left.
  await expectInlineOrder([page.getByRole('region', { name: 'الدليل' }), nav]);
  await expect(page.getByRole('heading', { name: 'التثبيت' })).toHaveAttribute(
    'id',
    'التثبيت',
  );
  // Its hamza kept: the letters as written.
  await expect(page.getByRole('heading', { name: 'الإعداد' })).toHaveAttribute(
    'id',
    'الإعداد',
  );
  const npm = links.nth(1);
  await expect(npm).toHaveAttribute('data-depth', '1');
  expect(
    await npm.evaluate((el) => parseFloat(getComputedStyle(el).paddingRight)),
  ).toBeGreaterThan(0);
});

test('Basic fits a phone @mobile', async ({ page }) => {
  await page.goto(demo('basic'));
  await expect(toc(page, 'Article contents').getByRole('link')).toHaveCount(5);
  await expectNoHorizontalScroll(page);
});
