import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/navbar/${name}-navbar-demo`;
const toggle = (page: Page) => page.locator('[data-slot=navbar-toggle]');
const menu = (page: Page) => page.locator('[data-slot=navbar-menu]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('wide', () => {
  test.use({ viewport: { width: 1024, height: 400 } });

  test('Basic: a banner with its links; no toggle, no menu', async ({
    page,
  }) => {
    await page.goto(demo('basic'));
    await expect(page.getByRole('banner')).toBeVisible();
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav).toHaveCount(1);
    await expect(nav.getByRole('link')).toHaveText([
      'Products',
      'Pricing',
      'Docs',
      'Blog',
    ]);
    await expect(nav.getByRole('link', { name: 'Products' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await nav.getByRole('link', { name: 'Docs' }).click();
    await expect(nav.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(toggle(page)).toBeHidden();
    await expect(menu(page)).toBeHidden();
  });

  test('With a Navigation Menu: one landmark, its dropdown on demand', async ({
    page,
  }) => {
    await page.goto(demo('navigation-menu'));
    await expect(page.getByRole('navigation')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeHidden();
    await page.getByRole('button', { name: 'Products' }).click();
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
  });

  test('Sticky, Hides on Scroll: away going down, back going up', async ({
    page,
  }) => {
    await page.goto(demo('sticky'));
    const banner = page.getByRole('banner');
    await expect(banner).not.toHaveAttribute('data-hidden');
    await page.mouse.wheel(0, 600);
    await expect(banner).toHaveAttribute('data-hidden', '');
    await page.mouse.wheel(0, -200);
    await expect(banner).not.toHaveAttribute('data-hidden');
    // Stuck at the top of the scrolled page.
    await expect.poll(async () => (await banner.boundingBox())?.y).toBe(0);
  });
});

test.describe('narrow', () => {
  test.use({ viewport: { width: 390, height: 600 } });

  test('Mobile Menu: a disclosure — named toggle, aria-expanded, aria-controls', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    await expect(page.getByRole('navigation')).toHaveCount(0);
    const open = page.getByRole('button', { name: 'Open menu' });
    await expect(open).toHaveAttribute('aria-expanded', 'false');
    await expect(open).not.toHaveAttribute('aria-pressed');
    const id = await open.getAttribute('aria-controls');
    await expect(menu(page)).toHaveAttribute('id', id!);
    await expect(menu(page)).toHaveCSS('visibility', 'hidden');

    await open.click();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Menu open')).toBeVisible();
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav.getByRole('link')).toHaveCount(4);
    // Not modal: Tab goes on past the menu, nothing is trapped.
    await expect(page.locator('[aria-modal]')).toHaveCount(0);
  });

  test('Mobile Menu: Escape closes it, focus back on the toggle', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Pricing' }).focus();
    await press(page, 'Escape');
    await expect(menu(page)).toHaveAttribute('data-state', 'closed');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });

  test('Mobile Menu: following a link closes it', async ({ page }) => {
    await page.goto(demo('mobile'));
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(menu(page)).toHaveAttribute('data-state', 'closed');
    await expect(page.getByText('Menu closed')).toBeVisible();
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('Mobile Menu: closes when the window is wide enough for the links', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByText('Menu open')).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 600 });
    await expect(page.getByText('Menu closed')).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main' }).getByRole('link'),
    ).toHaveCount(4);
  });

  test('Mobile Menu: pushes the page down', async ({ page }) => {
    await page.goto(demo('mobile'));
    const after = page.getByText('Menu closed');
    const before = (await after.boundingBox())!.y;
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect
      .poll(async () => (await page.getByText('Menu open').boundingBox())!.y)
      .toBeGreaterThan(before + 100);
  });

  test('Overlay Menu: over the page, which stays put; closes outside', async ({
    page,
  }) => {
    await page.goto(demo('overlay'));
    const heading = page.getByRole('heading', { name: 'Products' });
    const before = (await heading.boundingBox())!.y;
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(menu(page)).toHaveAttribute('data-state', 'open');
    await expect(
      page.getByRole('navigation', { name: 'Main, overlay' }).getByRole('link'),
    ).toHaveCount(4);
    expect((await heading.boundingBox())!.y).toBe(before);
    // The menu covers the heading.
    const box = (await menu(page).boundingBox())!;
    expect(box.y + box.height).toBeGreaterThan(before);

    // A click outside the bar closes it.
    await page.mouse.click(200, 400);
    await expect(menu(page)).toHaveAttribute('data-state', 'closed');

    // So does the focus leaving it: Tab past its last link.
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Blog' }).focus();
    await page.evaluate(() => {
      const outside = document.createElement('button');
      outside.textContent = 'Outside';
      document.body.append(outside);
      outside.focus();
    });
    await expect(menu(page)).toHaveAttribute('data-state', 'closed');
  });

  test('RTL: brand at the right, toggle at the left', async ({ page }) => {
    await page.goto(demo('rtl'));
    const brand = page.locator('[data-slot=navbar-brand]');
    const button = page.getByRole('button', { name: 'فتح القائمة' });
    expect((await brand.boundingBox())!.x).toBeGreaterThan(
      (await button.boundingBox())!.x,
    );
    await button.click();
    await expect(
      page.getByRole('navigation', { name: 'الرئيسية' }).getByRole('link'),
    ).toHaveCount(4);
  });
});
