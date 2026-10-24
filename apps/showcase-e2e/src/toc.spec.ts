import { type Page, expect, test } from './test';

/**
 * "On this page": its links stay on the page, and an address at a section
 * (`#id`) opens there — loaded, or reloaded.
 */

const page = '/docs/components/virtual-list';
const section = 'with-the-infinite-scroll';

const toc = (p: Page) =>
  p.getByRole('navigation', { name: 'Table of contents' });

/**
 * The section's heading in view — not always at the top: the last section
 * is too near the page's end to scroll that far.
 */
async function expectAtSection(p: Page) {
  // Polled: a click scrolls smoothly.
  await expect(p.locator(`[id="${section}"]`)).toBeInViewport({ ratio: 1 });
}

test('a link goes to its section, on this page', async ({ page: p }) => {
  await p.goto(page);
  const link = toc(p).getByRole('link', { name: 'With the infinite scroll' });
  // Not `#id` alone: relative to <base href="/">, that is the home page.
  await expect(link.first()).toHaveAttribute('href', `${page}#${section}`);
  await link.first().click();
  await expect(p).toHaveURL(`${page}#${section}`);
  await expect(p.locator('h1')).toHaveText('Virtual List');
  await expectAtSection(p);
});

test('loaded at a section: opens there', async ({ page: p }) => {
  await p.goto(`${page}#${section}`);
  await expectAtSection(p);
  // Its demo works there too: shown at once, its infinite scroll loads, and
  // its virtual list renders.
  await expect(
    p
      .getByRole('region', { name: 'Feed' })
      .getByText('Item 1', { exact: true }),
  ).toBeVisible();
});

test('reloaded at a section: stays there', async ({ page: p }) => {
  await p.goto(page);
  await toc(p)
    .getByRole('link', { name: 'With the infinite scroll' })
    .first()
    .click();
  await expect(p).toHaveURL(`${page}#${section}`);
  await p.reload();
  await expectAtSection(p);
});
