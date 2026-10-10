import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Keyboard Lightbox Demo', () => {
  test('arrows change the image (wrapping); focus trapped and returned', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/lightbox/keyboard-lightbox-demo');
    const opener = page.locator('[scLightboxTrigger]').first();
    await opener.focus();
    await press(page, 'Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-label', /image 1 of 4/);

    // move focus off the toolbar (its arrows navigate the buttons)
    await dialog.evaluate((d) => (d as HTMLElement).focus());
    await press(page, 'ArrowRight');
    await expect(dialog).toHaveAttribute('aria-label', /image 2 of 4/);
    await press(page, 'ArrowLeft');
    await press(page, 'ArrowLeft');
    await expect(dialog).toHaveAttribute('aria-label', /image 4 of 4/);

    for (let i = 0; i < 12; i++) await press(page, 'Tab');
    await expect
      .poll(() =>
        page.evaluate(() => !!document.activeElement?.closest('[role=dialog]')),
      )
      .toBe(true);

    await press(page, 'Escape');
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(errors).toEqual([]);
  });
});
