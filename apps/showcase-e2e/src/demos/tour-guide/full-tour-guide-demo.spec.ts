import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Full Tour Guide Demo', () => {
  test('focus follows the steps, is trapped, and returns at the end', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/tour-guide/full-tour-guide-demo');
    const opener = page.getByRole('button', { name: 'Start Tour' });
    await opener.focus();
    await press(page, 'Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveCount(1);
    await expect(dialog).toBeFocused();
    const firstName = await dialog.getAttribute('aria-label');

    await press(page, 'ArrowRight');
    await expect(dialog).not.toHaveAttribute('aria-label', firstName as string);
    await expect(dialog).toBeFocused();

    for (let i = 0; i < 8; i++) await press(page, 'Tab');
    await expect
      .poll(() =>
        page.evaluate(() => !!document.activeElement?.closest('[scTourGuide]')),
      )
      .toBe(true);

    await press(page, 'Escape');
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(errors).toEqual([]);
  });
});
