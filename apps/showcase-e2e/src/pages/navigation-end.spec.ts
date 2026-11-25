import { type Page, expect, test } from '../test';

/**
 * A popup with links closes when a navigation is over, whatever started it —
 * here the Back button, with the popup open: the Header's mobile menu, the
 * Sidebar's sheet on a phone, the Navigation Menu's panel. See
 * docs/component-design-principles.md, "A Link Closes Its Popup at Once".
 */

/** GitHub's stars, answered here (its API refuses bursts: 403). */
async function starsAnswered(page: Page) {
  await page.route('https://api.github.com/repos/**', (route) =>
    route.fulfill({ json: { stargazers_count: 1 } }),
  );
}

test('Header: Back with the mobile menu open closes it', async ({ page }) => {
  await starsAnswered(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Open menu' });
  const menu = page.locator('[data-slot=header-menu]');
  // A page in the app's history, reached from the menu.
  await open.click();
  await menu.getByRole('link', { name: 'Charts', exact: true }).click();
  // Charts is a heavy route: under load (Firefox, WebKit) seconds to come.
  await expect(page).toHaveURL(/\/charts$/, { timeout: 15_000 });
  await expect(menu).toHaveCount(0);

  await open.click();
  await expect(menu).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(menu).toHaveCount(0);
  await expect(open).toHaveAttribute('aria-expanded', 'false');
});

test("Sidebar: Back with the phone's sheet open closes it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto('/docs/overview/introduction');
  const toggle = page.getByRole('button', { name: 'Toggle Sidebar' }).first();
  const sheet = page.getByRole('dialog');
  // A page in the app's history, reached from the sheet.
  await toggle.click();
  await expect(sheet).toBeVisible();
  await sheet.locator('a[href="/docs/overview/components"]').click();
  await expect(page).toHaveURL(/\/docs\/components$/);
  await expect(sheet).toHaveCount(0);

  await toggle.click();
  await expect(sheet).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/introduction$/);
  await expect(sheet).toHaveCount(0);
});

test('Navigation Menu: Back with its panel open closes it', async ({
  page,
}) => {
  await starsAnswered(page);
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto('/');
  const bar = page.getByRole('banner').getByRole('navigation', {
    name: 'Main',
    exact: true,
  });
  // A page in the app's history, reached from the bar.
  await bar.getByRole('link', { name: 'Charts', exact: true }).click();
  // Charts is a heavy route: under load (Firefox, WebKit) seconds to come.
  await expect(page).toHaveURL(/\/charts$/, { timeout: 15_000 });

  const trigger = bar.getByRole('button', { name: 'Components' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
