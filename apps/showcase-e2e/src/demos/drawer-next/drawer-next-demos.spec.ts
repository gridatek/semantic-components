import { type Locator, type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/drawer-next/${name}-drawer-next-demo`;
const drawer = (page: Page) => page.getByRole('dialog');

/** Once it has slid in: no transform left from its enter animation. */
const settled = (d: Locator) =>
  expect.poll(() => d.evaluate((el) => el.getAnimations().length)).toBe(0);

/** Drags a mouse from the middle of `from` by (dx, dy), in steps. */
async function drag(page: Page, from: Locator, dx: number, dy: number) {
  const b = await box(from);
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 10 });
  await page.mouse.up();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a modal dialog at the bottom, named and described; focus in, then back', async ({
  page,
}) => {
  await page.goto('/demos/drawer-next/drawer-next-usage-demo');
  const trigger = page.getByRole('button', { name: 'Edit profile' });
  await trigger.click();
  const d = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(d).toHaveAttribute('aria-modal', 'true');
  await expect(d).toHaveAttribute('data-swipe-direction', 'down');
  await expect(d).toHaveAccessibleDescription(/Make changes to your profile/);
  await expect(d.getByRole('textbox').first()).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await settled(d);
  const viewport = page.viewportSize() ?? { width: 0, height: 0 };
  const b = await box(d);
  expect(Math.round(viewport.height - (b.y + b.height))).toBe(0);
  await press(page, 'Escape');
  await expect(drawer(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('Cancel closes it; a press on the backdrop too', async ({ page }) => {
  await page.goto('/demos/drawer-next/drawer-next-usage-demo');
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await drawer(page).getByRole('button', { name: 'Cancel' }).click();
  await expect(drawer(page)).toHaveCount(0);
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await settled(drawer(page));
  await page.mouse.click(5, 5);
  await expect(drawer(page)).toHaveCount(0);
});

test('Swipe handle: a short drag settles back, a long one closes it', async ({
  page,
}) => {
  await page.goto(demo('swipe-handle'));
  await page.getByRole('button', { name: 'Open drawer' }).click();
  const d = drawer(page);
  await settled(d);
  const handle = d.locator('[data-slot=drawer-handle]');
  await expect(handle).toHaveAttribute('aria-hidden', 'true');
  const before = await box(d);
  await drag(page, handle, 0, 30);
  await expect(d).toBeVisible();
  await expect
    .poll(async () => Math.round((await box(d)).y))
    .toBe(Math.round(before.y));
  await drag(page, handle, 0, before.height * 0.7);
  await expect(drawer(page)).toHaveCount(0);
});

test('Swipe: a mouse on its text selects it, it does not drag', async ({
  page,
}) => {
  await page.goto(demo('swipe-handle'));
  await page.getByRole('button', { name: 'Open drawer' }).click();
  const d = drawer(page);
  await settled(d);
  const before = await box(d);
  await drag(page, d.getByRole('heading'), 0, before.height * 0.7);
  await expect(d).toBeVisible();
  await expect(d).not.toHaveAttribute('data-swiping');
});

test('Sides: at the edge asked for', async ({ page }) => {
  await page.goto(demo('sides'));
  const viewport = page.viewportSize() ?? { width: 0, height: 0 };
  for (const side of ['up', 'right', 'down', 'left'] as const) {
    await page.getByRole('button', { name: side, exact: true }).click();
    const d = drawer(page);
    await expect(d).toHaveAttribute('data-swipe-direction', side);
    await settled(d);
    const b = await box(d);
    expect(
      Math.round(
        {
          right: viewport.width - (b.x + b.width),
          left: b.x,
          up: b.y,
          down: viewport.height - (b.y + b.height),
        }[side],
      ),
    ).toBe(0);
    await press(page, 'Escape');
    await expect(drawer(page)).toHaveCount(0);
  }
});

test('Sides: a swipe right closes the right drawer', async ({ page }) => {
  await page.goto(demo('sides'));
  await page.getByRole('button', { name: 'right', exact: true }).click();
  const d = drawer(page);
  await settled(d);
  await drag(page, d.locator('[data-slot=drawer-handle]'), 300, 0);
  await expect(drawer(page)).toHaveCount(0);
});

test('Closing animates out: the panel stays while it slides away', async ({
  page,
}) => {
  await page.goto(demo('swipe-handle'));
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await settled(drawer(page));
  await press(page, 'Escape');
  await expect(page.locator('[scDrawerNext].animate-out')).toHaveCount(1);
  await expect(drawer(page)).toHaveCount(0);
});

test('Snap points: opens at the first; the handle button moves to the next; a drag down closes it', async ({
  page,
}) => {
  await page.goto(demo('snap-points'));
  await page.getByRole('button', { name: 'Open snap drawer' }).click();
  const d = drawer(page);
  await expect(d).toHaveAttribute('data-snap-points', '');
  await settled(d);
  const viewport = page.viewportSize() ?? { width: 0, height: 0 };
  const shown = async () => Math.round(viewport.height - (await box(d)).y);
  await expect.poll(shown).toBe(Math.round(viewport.height * 0.4));
  await d.getByRole('button', { name: 'Next height' }).click();
  await expect.poll(shown).toBe(Math.round(viewport.height * 0.9));
  // Dragged a little up from the top: it rests at the nearest, the top one.
  const handle = d.locator('[data-slot=drawer-handle]');
  await drag(page, handle, 0, viewport.height * 0.3);
  await expect.poll(shown).toBe(Math.round(viewport.height * 0.4));
  await drag(page, handle, 0, viewport.height * 0.35);
  await expect(drawer(page)).toHaveCount(0);
});

test('Nested: the drawer behind shrinks and dims; Escape closes the front one', async ({
  page,
}) => {
  await page.goto(demo('nested'));
  await page.getByRole('button', { name: 'Open drawer' }).click();
  const first = page.getByRole('dialog', { name: 'Drawer', exact: true });
  await first.getByRole('button', { name: 'Open nested drawer' }).click();
  const second = page.getByRole('dialog', { name: 'Nested drawer' });
  await expect(second).toBeVisible();
  await expect(first).toHaveAttribute('data-nested-drawer-open', '');
  await expect(first).toHaveCSS('scale', '0.95');
  await press(page, 'Escape');
  await expect(second).toHaveCount(0);
  await expect(first).toBeVisible();
  await expect(first).not.toHaveAttribute('data-nested-drawer-open');
});

test('Non-modal: no backdrop, the page usable, a press outside leaves it open', async ({
  page,
}) => {
  await page.goto(demo('non-modal'));
  const trigger = page.getByRole('button', { name: 'Non modal' });
  await trigger.click();
  const d = drawer(page);
  await expect(d).not.toHaveAttribute('aria-modal');
  await expect(page.locator('[scBackdrop]')).toHaveCount(0);
  await settled(d);
  await page.mouse.click(5, 5);
  await expect(d).toBeVisible();
  await d.getByRole('button', { name: 'Close' }).click();
  await expect(drawer(page)).toHaveCount(0);
});

test('Responsive: a drawer on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto(demo('responsive'));
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await expect(page.locator('[scDrawerNext]')).toBeVisible();
});

test('Responsive: a dialog on a wide screen', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(demo('responsive'));
  await page.getByRole('button', { name: 'Edit profile' }).click();
  await expect(page.locator('[scDialog]')).toBeVisible();
  await expect(page.locator('[scDrawerNext]')).toHaveCount(0);
});

test('RTL: inline-start is the right; its text right to left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'البداية' }).click();
  const d = drawer(page);
  await expect(d).toHaveAttribute('data-swipe-direction', 'right');
  await expect(d).toHaveAttribute('dir', 'rtl');
});
