import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Backdrop', () => {
  test('fades in when shown, out when it goes, then is removed', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/backdrop/basic-backdrop-demo');
    const backdrop = page.locator('[scBackdrop]');
    const toggle = page.getByRole('button', { name: 'Backdrop' });
    await expect(backdrop).toHaveCount(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(backdrop).toHaveCount(1);
    await expect(backdrop).toHaveCSS('opacity', '1');

    // Kept while it fades out, then removed.
    await toggle.click();
    await expect(backdrop).toHaveClass(/\banimate-out\b/);
    await expect(backdrop).toHaveCount(0);
    expect(errors).toEqual([]);
  });
});
