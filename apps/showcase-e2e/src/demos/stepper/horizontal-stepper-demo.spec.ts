import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Horizontal Stepper Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/stepper/horizontal-stepper-demo');
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('one tab stop; arrows and Home/End move between steps', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1');

    await tabs.first().focus();
    await press(page, 'ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await press(page, 'End');
    await expect(tabs.last()).toBeFocused();
    await press(page, 'Home');
    await expect(tabs.first()).toBeFocused();
  });

  test('tabs and panels are linked; Next/Previous move the step', async ({
    page,
  }) => {
    const first = page.getByRole('tab').first();
    await expect(first).toHaveAttribute('aria-controls', /.+/);
    const controls = await first.getAttribute('aria-controls');
    const panel = page.locator(`[id="${controls}"]`);
    await expect(panel).toHaveAttribute('role', 'tabpanel');
    await expect(panel).toHaveAttribute(
      'aria-labelledby',
      (await first.getAttribute('id')) as string,
    );

    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByRole('tab').nth(1)).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await page.getByRole('button', { name: /previous|back/i }).click();
    await expect(first).toHaveAttribute('aria-selected', 'true');
  });
});
