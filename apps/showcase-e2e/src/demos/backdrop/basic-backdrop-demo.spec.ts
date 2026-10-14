import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Backdrop', () => {
  test('fades in and out, and says when it has faded out', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/backdrop/basic-backdrop-demo');
    const backdrop = page.locator('[scBackdrop]');
    const toggle = page.getByRole('button', { name: 'Backdrop' });
    const status = page.getByRole('status');
    await expect(backdrop).toHaveAttribute('data-idle', '');
    await expect(status).toHaveText('Not shown yet.');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(backdrop).toHaveAttribute('data-open', '');
    await expect(status).toHaveText('Shown.');

    // animationComplete once the fade-out ends; idle again.
    await toggle.click();
    await expect(status).toHaveText('Faded out.');
    await expect(backdrop).toHaveAttribute('data-idle', '');
    expect(errors).toEqual([]);
  });
});
