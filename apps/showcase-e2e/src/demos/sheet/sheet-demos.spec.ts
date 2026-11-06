import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/sheet/${name}-sheet-demo`;
const sheet = (page: Page) => page.getByRole('dialog');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a modal dialog, named and described; focus in, then back', async ({
  page,
}) => {
  await page.goto('/demos/sheet/sheet-usage-demo');
  const trigger = page.getByRole('button', { name: 'Open' });
  await trigger.click();
  const s = page.getByRole('dialog', { name: 'Edit profile' });
  await expect(s).toHaveAttribute('aria-modal', 'true');
  await expect(s).toHaveAccessibleDescription(/Make changes to your profile/);
  // Focus inside: its first field.
  await expect(s.getByRole('textbox').first()).toBeFocused();
  await press(page, 'Escape');
  await expect(sheet(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('The ✕ in its corner; Close in the footer closes it too', async ({
  page,
}) => {
  await page.goto('/demos/sheet/sheet-usage-demo');
  await page.getByRole('button', { name: 'Open' }).click();
  const s = sheet(page);
  const x = s.locator('> [data-slot=sheet-close]');
  await expect(x).toHaveCSS('position', 'absolute');
  const [panel, close] = [await box(s), await box(x)];
  expect(panel.x + panel.width - (close.x + close.width)).toBeLessThan(24);
  await s.getByRole('button', { name: 'Close', exact: true }).last().click();
  await expect(sheet(page)).toHaveCount(0);
});

test('Side: at the edge asked for, sliding in from it', async ({ page }) => {
  await page.goto(demo('side'));
  const viewport = page.viewportSize() ?? { width: 0, height: 0 };
  for (const side of ['right', 'left', 'top', 'bottom']) {
    await page.getByRole('button', { name: side }).click();
    const s = sheet(page);
    await expect(s).toHaveAttribute('data-side', side);
    await expect
      .poll(async () => {
        const b = await box(s);
        return {
          right: Math.round(viewport.width - (b.x + b.width)),
          left: Math.round(b.x),
          top: Math.round(b.y),
          bottom: Math.round(viewport.height - (b.y + b.height)),
        }[side];
      })
      .toBe(0);
    await press(page, 'Escape');
    await expect(sheet(page)).toHaveCount(0);
  }
});

test('Closing animates out: the panel stays while it slides away', async ({
  page,
}) => {
  await page.goto(demo('side'));
  await page.getByRole('button', { name: 'right' }).click();
  // Once it has slid in.
  await expect(sheet(page)).toHaveCSS('opacity', '1');
  await press(page, 'Escape');
  await expect(page.locator('[scSheet].animate-out')).toHaveCount(1);
  await expect(sheet(page)).toHaveCount(0);
});

test('No close button: a press on the backdrop closes it', async ({ page }) => {
  await page.goto(demo('no-close-button'));
  await page.getByRole('button', { name: 'Open' }).click();
  await expect(sheet(page)).toBeVisible();
  await expect(sheet(page).getByRole('button')).toHaveCount(0);
  await expect(sheet(page)).toHaveCSS('opacity', '1');
  await page.mouse.click(5, 300);
  await expect(sheet(page)).toHaveCount(0);
});

test('RTL: inline-start is the right; its text right to left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'البداية' }).click();
  const s = sheet(page);
  await expect(s).toHaveAttribute('data-side', 'right');
  await expect(s).toHaveAttribute('dir', 'rtl');
});
