import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/header/${name}-header-demo`;
const toggle = (page: Page) => page.locator('[data-slot=header-toggle]');
const menu = (page: Page) => page.locator('[data-slot=header-menu]');

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
    // The bar's height is its own, brand or not.
    await expect(page.getByRole('banner')).toHaveCSS('min-height', '56px');
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
    // The scroll down settled first: WebKit's wheel scroll, still running
    // (hidden halfway), took the scroll up with it.
    let last = -1;
    await expect
      .poll(
        async () => {
          const y = await page.evaluate(() => Math.round(scrollY));
          const settled = y === last;
          last = y;
          return settled;
        },
        { intervals: [250] },
      )
      .toBe(true);
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
    // Closed, there is no menu in the page: nothing for aria-controls.
    await expect(menu(page)).toHaveCount(0);
    await expect(open).not.toHaveAttribute('aria-controls');

    await open.click();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    // Open, the header renders it: the toggle controls it.
    await expect(menu(page)).toBeVisible();
    await expect(close).toHaveAttribute(
      'aria-controls',
      (await menu(page).getAttribute('id'))!,
    );
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
    await expect(menu(page)).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  });

  test('Mobile Menu: following a link closes it', async ({ page }) => {
    await page.goto(demo('mobile'));
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(menu(page)).toHaveCount(0);
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

  test('Mobile Menu: over the whole page, which stays put; closes when the focus leaves', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    const before = (await page.getByText('Menu closed').boundingBox())!.y;
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(menu(page)).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main, mobile' }).getByRole('link'),
    ).toHaveCount(4);
    // Shown at once (no animation), as shadcn's; see-through and blurred.
    await expect(menu(page)).toHaveCSS('transition-duration', '0s');
    await expect(menu(page)).toHaveCSS('animation-name', 'none');
    await expect(menu(page)).toHaveCSS('backdrop-filter', /blur/);
    // The page stays where it is; the menu covers all of it below the bar,
    // down to the window's bottom.
    expect((await page.getByText('Menu open').boundingBox())!.y).toBe(before);
    const bottom = page.viewportSize()!.height;
    await expect
      .poll(async () => {
        const box = (await menu(page).boundingBox())!;
        return Math.round(box.y + box.height);
      })
      .toBe(bottom);

    // The focus leaving it closes it: Tab past its last link.
    await page.getByRole('link', { name: 'Blog' }).focus();
    await page.evaluate(() => {
      const outside = document.createElement('button');
      outside.textContent = 'Outside';
      document.body.append(outside);
      outside.focus();
    });
    await expect(menu(page)).toHaveCount(0);
  });

  test('Mobile Menu: closing, it fades out in 100ms, then leaves the page', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(menu(page)).toBeVisible();
    await page.getByRole('button', { name: 'Close menu' }).click();
    // tw-animate's exit (fade out, zoom out), 100ms…
    await expect(menu(page)).toHaveCSS('animation-name', 'exit');
    await expect(menu(page)).toHaveCSS('animation-duration', '0.1s');
    // …then gone from the page.
    await expect(menu(page)).toHaveCount(0);
    await expect(
      page.getByRole('navigation', { name: 'Main, mobile' }),
    ).toHaveCount(0);
  });

  test('Push Menu: pushes the page down; a click on the page leaves it open', async ({
    page,
  }) => {
    await page.goto(demo('push'));
    const heading = page.getByRole('heading', { name: 'Products' });
    const before = (await heading.boundingBox())!.y;
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(
      page.getByRole('navigation', { name: 'Main, push' }).getByRole('link'),
    ).toHaveCount(4);
    await expect
      .poll(async () => (await heading.boundingBox())!.y)
      .toBeGreaterThan(before + 100);
    await page.getByText('The menu pushes this text down').click();
    await expect(menu(page)).toBeVisible();
  });

  test('Mobile Menu: the icon that comes in turns and fades in, not on the first paint', async ({
    page,
  }) => {
    await page.goto(demo('mobile'));
    const icon = toggle(page).locator('svg');
    // On load: the Menu icon as it is, no animation.
    await expect(icon).toHaveCSS('animation-name', 'none');
    await toggle(page).click();
    // Pressed: the X swapped in plays tw-animate's enter, in 100ms.
    await expect(icon).toHaveCSS('animation-name', 'enter');
    await expect(icon).toHaveCSS('animation-duration', '0.1s');
    await toggle(page).click();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    await expect(icon).toHaveCSS('animation-name', 'enter');
  });

  test('RTL: brand at the right, toggle at the left', async ({ page }) => {
    await page.goto(demo('rtl'));
    const brand = page.getByRole('link', { name: 'أكمي' });
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
