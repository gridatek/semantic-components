import { type Locator, type Page, expect, test } from '@playwright/test';

const toasts = (page: Page) => page.locator('[data-slot="toast"]');

/** Waits for a toast to finish moving: its animations, then its transitions. */
const settled = (toast: Locator) =>
  toast.evaluate(async (el) => {
    while (el.getAnimations().length) {
      await Promise.allSettled(
        el.getAnimations().map((animation) => animation.finished),
      );
    }
  });

test.describe('Toast', () => {
  test('a toast is written by the app template, and closes', async ({
    page,
  }) => {
    await page.goto('/demos/toast/basic-toast-demo');
    await page.getByRole('button', { name: 'Show Toast' }).click();
    const toast = toasts(page).first();
    await expect(toast).toContainText('Your message has been sent.');
    // The stack is the one live region: each toast is announced in it.
    await expect(page.locator('[scToastStack]')).toHaveAttribute(
      'aria-live',
      'polite',
    );

    await toast.hover();
    await toast.getByRole('button', { name: 'Close' }).click();
    await expect(toasts(page)).toHaveCount(0);
  });

  test('its action runs, then dismisses it', async ({ page }) => {
    await page.goto('/demos/toast/action-toast-demo');
    await page.getByRole('button', { name: 'Show Toast' }).click();
    const toast = toasts(page).first();
    await expect(toast).toContainText('Event has been created');
    await toast.getByRole('button', { name: 'Undo' }).click();
    await expect(toasts(page)).toHaveCount(0);
  });
});

test.describe('Toast positions', () => {
  test('a toast elsewhere leaves the others where they are', async ({
    page,
  }) => {
    await page.goto('/demos/toast/position-toast-demo');
    await page.getByRole('button', { name: 'Top start' }).click();
    const first = toasts(page).filter({ hasText: 'Shown at top-start.' });
    await expect(first).toBeVisible();
    await settled(first);
    const before = await first.boundingBox();

    await page.getByRole('button', { name: 'Bottom end' }).click();
    const second = toasts(page).filter({ hasText: 'Shown at bottom-end.' });
    await expect(second).toBeVisible();
    await expect(toasts(page)).toHaveCount(2);
    await settled(second);

    // The first is still at the top, the second at the bottom.
    const after = await first.boundingBox();
    const bottom = await second.boundingBox();
    expect(after?.y).toBeCloseTo(before?.y ?? 0, 0);
    expect(bottom?.y ?? 0).toBeGreaterThan((after?.y ?? 0) + 100);
  });
});

test.describe('Toast stack', () => {
  test('stacks the toasts, and spreads them out while hovered', async ({
    page,
  }) => {
    await page.goto('/demos/toast/stacked-toast-demo');
    await page.getByRole('button', { name: 'Show three toasts' }).click();
    await expect(toasts(page)).toHaveCount(3);
    const list = page.locator('[data-slot="toast-list"]');
    await expect(list).toHaveAttribute('data-expanded', 'false');
    await expect(toasts(page).last()).toHaveAttribute('data-front', 'true');

    await toasts(page).last().hover();
    await expect(list).toHaveAttribute('data-expanded', 'true');
    for (const toast of await toasts(page).all()) await settled(toast);
    const [oldest, , newest] = await Promise.all(
      (await toasts(page).all()).map((toast) => toast.boundingBox()),
    );
    // Spread out: the oldest sits fully above the newest.
    expect((oldest?.y ?? 0) + (oldest?.height ?? 0)).toBeLessThanOrEqual(
      newest?.y ?? 0,
    );

    await page.mouse.move(0, 0);
    await expect(list).toHaveAttribute('data-expanded', 'false');
  });

  test('the hotkey moves focus to the toasts, and Escape back', async ({
    page,
  }) => {
    await page.goto('/demos/toast/basic-toast-demo');
    const button = page.getByRole('button', { name: 'Show Toast' });
    // From the keyboard, so the button has focus to return to (Safari doesn't
    // focus a clicked button).
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(toasts(page)).toHaveCount(1);
    await expect(
      page.getByRole('region', { name: 'Notifications, Alt+T' }),
    ).toBeAttached();

    await page.keyboard.press('Alt+KeyT');
    const list = page.locator('[data-slot="toast-list"]');
    await expect(list).toBeFocused();
    await expect(list).toHaveAttribute('data-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
  });
});

test.describe('Toast updates', () => {
  test('a toast changes in place', async ({ page }) => {
    await page.goto('/demos/toast/update-toast-demo');
    await page.getByRole('button', { name: 'Start upload' }).click();
    await expect(toasts(page)).toHaveText(/Uploading…/);
    await page.getByRole('button', { name: 'Finish upload' }).click();
    await expect(toasts(page)).toHaveCount(1);
    await expect(toasts(page)).toHaveText(/Upload complete\./);
    await expect(toasts(page)).toHaveAttribute('data-variant', 'success');
  });

  test('a promise shows loading, then its result', async ({ page }) => {
    await page.goto('/demos/toast/promise-toast-demo');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(toasts(page)).toHaveText(/Saving…/);
    await expect(toasts(page)).toHaveText(/Settings saved\./);

    await page.getByRole('button', { name: 'Save (fails)' }).click();
    await expect(
      toasts(page).filter({ hasText: 'Network error' }),
    ).toHaveAttribute('data-variant', 'error');
  });
});
