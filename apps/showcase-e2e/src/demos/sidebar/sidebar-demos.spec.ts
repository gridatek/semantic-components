import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sidebar/${name}-sidebar-demo`;
const sidebar = (page: Page) => page.locator('div[data-slot=sidebar]').first();
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

  test('Basic: the navigation is the named nav; header and footer outside it', async ({
    page,
  }) => {
    await page.goto(demo('basic'));
    const nav = page.getByRole('navigation', { name: 'Main' });
    await expect(nav).toHaveCount(1);
    await expect(nav.getByRole('link')).toHaveText([
      'Home',
      'Inbox',
      'Calendar',
      'Settings',
    ]);
    await expect(nav.getByText('Acme Inc')).toHaveCount(0);
    await expect(nav.getByText('Signed in as Ada')).toHaveCount(0);
    await expect(sidebar(page)).not.toHaveAttribute('role');
    await expect(sidebar(page)).not.toHaveAttribute('aria-label');
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

  test('Basic: the trigger — aria-expanded, aria-controls; Ctrl+B; the rail is for the pointer only', async ({
    page,
  }) => {
    await page.goto(demo('basic'));
    const button = page.getByRole('button', { name: 'Sidebar', exact: true });
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    const id = await button.getAttribute('aria-controls');
    await expect(sidebar(page)).toHaveAttribute('id', id!);

    await button.click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await press(page, 'ControlOrMeta+b');
    await expect(sidebar(page)).toHaveAttribute('data-state', 'expanded');

    const rail = page.locator('[data-slot=sidebar-rail]');
    await expect(rail).toHaveAttribute('aria-hidden', 'true');
    await expect(rail).toHaveAttribute('tabindex', '-1');
    await expect(rail).not.toHaveAttribute('title');
    await rail.click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');

    // [storageKey]="null": the demo never writes the shared cookie.
    const cookies = await page.context().cookies();
    expect(cookies.map((cookie) => cookie.name)).not.toContain(
      'sc-sidebar-state',
    );
  });

  test('Basic: an action shown on hover, named', async ({ page }) => {
    await page.goto(demo('basic'));
    const more = page.getByRole('button', { name: 'More' });
    await expect(more).toHaveCSS('opacity', '0');
    await page.getByRole('link', { name: 'Calendar' }).hover();
    await expect(more).toHaveCSS('opacity', '1');
    await expect(
      page.getByRole('button', { name: 'Add a project' }),
    ).toBeVisible();
  });

  test('Collapse to Icons: our tooltip, only while collapsed; the names stay', async ({
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
    await expect(page.getByRole('link', { name: 'Inbox' })).toBeVisible();
    await page.getByRole('link', { name: 'Calendar' }).hover();
    await expect(page.getByRole('tooltip')).toHaveText('Calendar');
  });

  test('Sub-menus: a collapsible item, open and closed', async ({ page }) => {
    await page.goto(demo('submenu'));
    const started = page.getByRole('button', { name: 'Getting started' });
    const components = page.getByRole('button', { name: 'Components' });
    await expect(started).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'Theming' })).toBeVisible();
    await expect(components).toHaveAttribute('aria-expanded', 'false');
    await components.click();
    await expect(components).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('link', { name: 'Dialog' }).click();
    await expect(page.getByRole('link', { name: 'Dialog' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('Inset: the page a raised card beside the sidebar', async ({ page }) => {
    await page.goto(demo('inset'));
    await expect(sidebar(page)).toHaveAttribute('data-variant', 'inset');
    await expect(page.getByRole('main')).toHaveCSS('margin-top', '8px');
  });

  test('RTL: at the start — the right; collapses there', async ({ page }) => {
    await page.goto(demo('rtl'));
    const container = page.locator('[data-slot=sidebar-container]');
    const box = (await container.boundingBox())!;
    expect(box.x + box.width).toBe(1024);
    await trigger(page).click();
    await expect(sidebar(page)).toHaveAttribute('data-state', 'collapsed');
    await expect
      .poll(async () => (await container.boundingBox())!.width)
      .toBeLessThan(60);
  });
});

test.describe('narrow', () => {
  test.use({ viewport: { width: 390, height: 640 } });

  test('Phone: a named dialog — focus inside, Escape back to the trigger', async ({
    page,
  }) => {
    await page.goto(demo('basic'));
    const button = page.getByRole('button', { name: 'Sidebar', exact: true });
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    // From the keyboard (WebKit doesn't focus a clicked button).
    await button.focus();
    await press(page, 'Enter');
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
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
    await page.goto(demo('basic'));
    await trigger(page).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation' });
    await dialog.getByRole('link', { name: 'Settings' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(
      page.getByRole('main').getByText('Settings', { exact: true }),
    ).toBeVisible();
  });

  test('Phone, RTL: the sheet comes from the right', async ({ page }) => {
    await page.goto(demo('rtl'));
    await trigger(page).click();
    const dialog = page.getByRole('dialog', { name: 'التنقل' });
    await expect(dialog).toBeVisible();
    await expect
      .poll(async () => {
        const box = (await dialog.boundingBox())!;
        return Math.round(box.x + box.width);
      })
      .toBe(390);
  });
});
