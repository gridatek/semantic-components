import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Speed Dial Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/speed-dial/basic-speed-dial-demo');
    await expect(
      page.getByRole('button', { name: 'Speed dial' }),
    ).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('keyboard: open, move, activate, focus returns', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Speed dial' });
    // "true" is equivalent to "menu" (ARIA)
    await expect(trigger).toHaveAttribute('aria-haspopup', /^(true|menu)$/);
    await trigger.focus();
    await press(page, 'Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused();
    await press(page, 'ArrowDown');
    await expect(page.getByRole('menuitem', { name: 'Copy' })).toBeFocused();
    await press(page, 'Enter');
    await expect(page.getByText('Last action: Copy')).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('mouse click runs the action; Escape closes', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Speed dial' });
    await trigger.click();
    await page.getByRole('menuitem', { name: 'Share' }).click();
    await expect(page.getByText('Last action: Share')).toBeVisible();

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await press(page, 'Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
    // closed actions are not reachable
    await expect(page.locator('[scSpeedDialActionList]')).toHaveAttribute(
      'inert',
      'true',
    );
  });
});

test.describe('Disabled Actions Speed Dial Demo', () => {
  test('disabled actions stay focusable but do nothing', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/speed-dial/disabled-actions-speed-dial-demo');
    const trigger = page.getByRole('button', {
      name: 'Actions with disabled items',
    });
    await trigger.click();
    const print = page.getByRole('menuitem', { name: 'Print' });
    await expect(print).toHaveAttribute('aria-disabled', 'true');
    await expect(print).not.toHaveAttribute('disabled');
    expect(errors).toEqual([]);
  });
});
