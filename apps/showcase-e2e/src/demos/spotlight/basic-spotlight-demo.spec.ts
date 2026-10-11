import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Spotlight Demo', () => {
  test('named modal: focus moves in, stays in, and returns on Escape', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/spotlight/basic-spotlight-demo');
    const opener = page.getByRole('button', { name: 'Highlight Feature' });
    await opener.focus();
    await press(page, 'Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAccessibleName(/.+/);
    await expect(dialog).toBeFocused();

    for (let i = 0; i < 6; i++) await press(page, 'Tab');
    await expect
      .poll(() =>
        page.evaluate(() => !!document.activeElement?.closest('[role=dialog]')),
      )
      .toBe(true);

    await press(page, 'Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
    expect(errors).toEqual([]);
  });
});
