import { collectErrors, press } from '../../interaction';
import { expectScrollbarWidth } from '../../looks';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sidebar/${name}-sidebar-demo`;
const usage = '/demos/sidebar/sidebar-usage-demo';
const sidebar = (page: Page) =>
  page.locator('aside[data-slot=sidebar]').first();
const trigger = (page: Page) => page.locator('[data-slot=sidebar-trigger]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('wide', () => {
  test.use({ viewport: { width: 1024, height: 600 } });

  test('Usage: an aside landmark holds it all; the navigation is the named nav inside', async ({
    page,
  }) => {
    await page.goto(usage);
    const nav = page.getByRole('navigation', { name: 'Main, usage' });
    await expect(nav.getByRole('link')).toHaveText([
      'Home',
      'Inbox',
      'Calendar',
      'Search',
      'Settings',
    ]);
    await expect(nav.getByText('Acme Inc')).toHaveCount(0);
    const aside = page.getByRole('complementary', { name: 'Sidebar, usage' });
    await expect(aside.getByText('Acme Inc')).toBeVisible();
    await expect(aside.getByText('Signed in as Ada')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await page.getByRole('link', { name: 'Inbox' }).click();
    await expect(page.getByRole('link', { name: 'Inbox' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('Usage: the trigger — aria-expanded, aria-controls; Ctrl+B; the rail is for the pointer only', async ({
    page,
  }) => {
    await page.goto(usage);
    const button = page.getByRole('button', { name: 'Sidebar', exact: true });
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const id = await button.getAttribute('aria-controls');
    await expect(sidebar(page)).toHaveAttribute('id', id ?? 'missing');

    await button.click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await press(page, 'ControlOrMeta+b');
    await expect(sidebar(page)).toHaveAttribute('data-state', 'expanded');

    const rail = page.locator('[data-slot=sidebar-rail]');
    await expect(rail).toHaveAttribute('aria-hidden', 'true');
    await expect(rail).toHaveAttribute('tabindex', '-1');
    await rail.click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');

    // [storageKey]="null": the demo never writes the shared cookie.
    const cookies = await page.context().cookies();
    expect(cookies.map((cookie) => cookie.name)).not.toContain(
      'sc-sidebar-state',
    );
  });

  test('Usage: the content shows a thin scrollbar', async ({ page }) => {
    await page.goto(usage);
    await expectScrollbarWidth(
      page.locator('[data-slot=sidebar-content]'),
      'thin',
    );
  });

  test('Header and Footer: a menu on a menu button; the footer’s opens upwards', async ({
    page,
  }) => {
    await page.goto(demo('header'));
    await page.getByRole('button', { name: 'Select Workspace' }).click();
    await expect(page.getByRole('menuitem')).toHaveText([
      'Acme Inc',
      'Acme Corp.',
    ]);

    await page.goto(demo('footer'));
    const user = page.getByRole('button', { name: 'Username' });
    await user.click();
    const menu = page.getByRole('menu');
    await expect(menu).toBeVisible();
    await expect
      .poll(async () => {
        const [m, u] = [await menu.boundingBox(), await user.boundingBox()];
        return (m?.y ?? 0) + (m?.height ?? 0) <= (u?.y ?? 0) + 1;
      })
      .toBe(true);
  });

  test('Collapsible group: its label is a button that closes and opens it', async ({
    page,
  }) => {
    await page.goto(demo('collapsible-group'));
    const help = page.getByRole('button', { name: 'Help' });
    await expect(help).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Support' })).toBeVisible();
    await help.click();
    await expect(page.getByRole('link', { name: 'Support' })).toBeHidden();
  });

  test('Group action and Menu action: named buttons at the end', async ({
    page,
  }) => {
    await page.goto(demo('group-action'));
    await page.getByRole('button', { name: 'Add Project' }).click();
    await expect(page.getByText('Projects added: 1')).toBeVisible();

    await page.goto(demo('menu-action'));
    await page.getByRole('button', { name: 'More, Travel' }).click();
    await expect(page.getByRole('menuitem')).toHaveText([
      'Edit Project',
      'Delete Project',
    ]);
  });

  test('Sub-menu and Collapsible menu: sub-items; an item opens its own', async ({
    page,
  }) => {
    await page.goto(demo('sub-menu'));
    await expect(page.getByRole('link', { name: 'Routing' })).toBeVisible();

    await page.goto(demo('collapsible-menu'));
    const second = page.getByRole('button', {
      name: 'Building Your Application',
    });
    await expect(
      page.getByRole('button', { name: 'Getting Started' }),
    ).toHaveAttribute('aria-expanded', 'true');
    await expect(
      page.getByRole('link', { name: 'Installation' }),
    ).toBeVisible();
    await expect(second).toHaveAttribute('aria-expanded', 'false');
    await second.click();
    await expect(page.getByRole('link', { name: 'Routing' })).toBeVisible();
  });

  test('Menu badge and Skeleton', async ({ page }) => {
    await page.goto(demo('menu-badge'));
    await expect(page.locator('[data-slot=sidebar-menu-badge]')).toHaveText([
      '24',
      '12',
      '3',
    ]);

    await page.goto(demo('skeleton'));
    await expect(page.locator('[data-slot=sidebar-menu-skeleton]')).toHaveCount(
      5,
    );
    await expect(page.getByRole('link', { name: 'Travel' })).toBeVisible();
    await expect(page.locator('[data-slot=sidebar-menu-skeleton]')).toHaveCount(
      0,
    );
  });

  test('Controlled: your button opens and closes it', async ({ page }) => {
    await page.goto(demo('controlled'));
    await page.getByRole('button', { name: 'Close Sidebar' }).click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');
    await page.getByRole('button', { name: 'Open Sidebar' }).click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'expanded');
  });

  test('Collapse to icons: the tooltip only while collapsed, described by it; the names stay', async ({
    page,
  }) => {
    await page.goto(demo('icon'));
    const inbox = page.getByRole('link', { name: 'Inbox' });
    await inbox.hover();
    await page.waitForTimeout(400);
    await expect(page.getByRole('tooltip')).toHaveCount(0);

    await trigger(page).click();
    await expect(sidebar(page)).toHaveAttribute('data-collapsible', 'icon');
    // Still named by its (hidden) text.
    await expect(inbox).toBeVisible();
    const calendar = page.getByRole('link', { name: 'Calendar' });
    await calendar.hover();
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toHaveText('Calendar');
    // The public Tooltip's parts: its look and its arrow.
    await expect(tooltip).toHaveAttribute('data-slot', 'tooltip');
    await expect(calendar).toHaveAttribute(
      'aria-describedby',
      (await tooltip.getAttribute('id')) ?? 'missing',
    );
  });

  test('Floating and Inset: a panel clear of the edges; the page a raised card', async ({
    page,
  }) => {
    await page.goto(demo('floating'));
    await expect(sidebar(page)).toHaveAttribute('data-variant', 'floating');
    await page.goto(demo('inset'));
    await expect(sidebar(page)).toHaveAttribute('data-variant', 'inset');
    await expect(page.getByRole('main')).toHaveCSS('margin-top', '8px');
  });

  test('RTL: at the start — the right; collapses there', async ({ page }) => {
    await page.goto(demo('rtl'));
    const container = page.locator('[data-slot=sidebar-container]');
    const box = await container.boundingBox();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBe(1024);
    await trigger(page).click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');
  });
});

test.describe('narrow', () => {
  test.use({ viewport: { width: 390, height: 640 } });

  test('Phone: a named dialog — focus inside, Escape back to the trigger', async ({
    page,
  }) => {
    await page.goto(usage);
    const button = page.getByRole('button', { name: 'Sidebar', exact: true });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    // From the keyboard (WebKit doesn't focus a clicked button).
    await button.focus();
    await press(page, 'Enter');
    const dialog = page.getByRole('dialog', { name: 'Sidebar, usage' });
    await expect(dialog).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect
      .poll(() =>
        page.evaluate(() => !!document.activeElement?.closest('[role=dialog]')),
      )
      .toBe(true);
    await press(page, 'Escape');
    await expect(dialog).toHaveCount(0);
    await expect(button).toBeFocused();
  });

  test('Phone: following a link closes the sheet', async ({ page }) => {
    await page.goto(usage);
    await trigger(page).click();
    const dialog = page.getByRole('dialog', { name: 'Sidebar, usage' });
    await dialog.getByRole('link', { name: 'Settings' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByText('Page: Settings')).toBeVisible();
  });

  test('Phone, RTL: the sheet comes from the right', async ({ page }) => {
    await page.goto(demo('rtl'));
    await trigger(page).click();
    const dialog = page.getByRole('dialog', { name: 'الشريط الجانبي' });
    await expect(dialog).toBeVisible();
    await expect
      .poll(async () => {
        const box = await dialog.boundingBox();
        return Math.round((box?.x ?? 0) + (box?.width ?? 0));
      })
      .toBe(390);
  });
});
