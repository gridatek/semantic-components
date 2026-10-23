import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Focus trap', () => {
  test('focuses the panel, keeps Tab inside, gives focus back', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/focus-trap/basic-focus-trap-demo');
    const edit = page.getByRole('button', { name: 'Edit name' });
    const first = page.getByRole('textbox', { name: 'First name' });
    const last = page.getByRole('textbox', { name: 'Last name' });
    const done = page.getByRole('button', { name: 'Done' });

    // By keyboard (WebKit doesn't focus a clicked button).
    await edit.focus();
    await press(page, 'Enter');
    await expect(first).toBeFocused();

    // Tab wraps round inside, both ways.
    await press(page, 'Tab');
    await expect(last).toBeFocused();
    await press(page, 'Tab');
    await expect(done).toBeFocused();
    await press(page, 'Tab');
    await expect(first).toBeFocused();
    await press(page, 'Shift+Tab');
    await expect(done).toBeFocused();

    await press(page, 'Enter');
    await expect(done).toHaveCount(0);
    await expect(edit).toBeFocused();
    expect(errors).toEqual([]);
  });
});
