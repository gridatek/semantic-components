import { expectNoA11yViolations } from '../axe';
import { type Page, expect, test } from '../test';

// Headless Chromium hides scrollbars (Playwright's --hide-scrollbars): drawn
// here, the page's takes room, and the bar would shift if that room went.
test.use({ launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } });

/** GitHub's stars, answered here (the API refuses a burst of requests). */
async function starsAnswered(page: Page) {
  await page.route('https://api.github.com/repos/**', (route) =>
    route.fulfill({ json: { stargazers_count: 999 } }),
  );
}

test('the mobile menu over the page: the page behind does not scroll, its scrollbar gone, nothing shifts', async ({
  page,
}) => {
  await starsAnswered(page);
  // Wider than a phone: the page's own scrollbar, where the browser draws one.
  await page.setViewportSize({ width: 560, height: 700 });
  await page.goto('/');
  // The page drawn: long enough to scroll.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const toggle = page.getByRole('button', { name: 'Open menu' });
  const before = await toggle.boundingBox();

  await toggle.click();
  await expect(page.locator('[data-slot=header-menu]')).toBeVisible();
  // No scrollbar for a page out of sight…
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).overflowY === 'hidden',
      ),
    )
    .toBe(true);
  // …and the keys don't scroll it.
  await page.keyboard.press('PageDown');
  await page.keyboard.press('End');
  expect(await page.evaluate(() => scrollY)).toBe(0);
  // The bar where it was: the scrollbar's room kept.
  expect(
    (await page.getByRole('button', { name: 'Close menu' }).boundingBox())?.x,
  ).toBe(before?.x);

  // Closed: the page scrolls again.
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-slot=header-menu]')).toHaveCount(0);
  await page.keyboard.press('End');
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
});

test("the mobile menu lists the docs' pages, as the sidebar does, and scrolls inside", async ({
  page,
}) => {
  await starsAnswered(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.locator('[data-slot=header-menu]');
  // The sidebar's groups, each a list named by its label.
  for (const group of ['Overview', 'Guides', 'Components', 'AI Elements'])
    await expect(menu.getByRole('list', { name: group })).toBeVisible();
  await expect(
    menu.getByRole('list', { name: 'Components' }).getByRole('link', {
      name: 'Button',
      exact: true,
    }),
  ).toHaveAttribute('href', '/docs/components/button');
  await expectNoA11yViolations(page);

  // Taller than the room below the bar: the menu scrolls, the page doesn't.
  await page.mouse.move(195, 400);
  await page.mouse.wheel(0, 800);
  await expect
    .poll(() => menu.evaluate((panel) => panel.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(0);

  // A page of the docs, from the menu: it closes, and the page comes.
  const link = menu
    .getByRole('list', { name: 'AI Elements' })
    .getByRole('link', { name: 'Chat', exact: true });
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(menu).toHaveCount(0);
  await expect(page).toHaveURL(/\/docs\/ai-elements\/chat$/);
});
