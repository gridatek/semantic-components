import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Emoji picker inserting into a field', () => {
  test('at the caret; the form value follows; focus back after it', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/emoji-picker/input-emoji-picker-demo');
    const field = page.getByRole('textbox', { name: 'Message' });
    await field.fill('Hi there');
    // The caret after "Hi".
    await field.evaluate((input: HTMLInputElement) =>
      input.setSelectionRange(2, 2),
    );

    await page.getByRole('button', { name: 'Insert an emoji' }).click();
    const search = page.getByRole('searchbox', { name: 'Search emojis' });
    await expect(search).toBeFocused();
    await search.fill('grinning');
    await expect(
      page.locator('[data-slot=emoji-picker-emoji][data-active]'),
    ).toHaveAttribute('aria-label', 'Grinning face');
    await search.press('Enter');

    await expect(search).toBeHidden();
    await expect(field).toHaveValue('Hi😀 there');
    await expect(page.getByText('Value: Hi😀 there')).toBeVisible();
    await expect(field).toBeFocused();
    // The caret right after the emoji (two UTF-16 units).
    await expect
      .poll(() =>
        field.evaluate((input: HTMLInputElement) => input.selectionStart),
      )
      .toBe(4);
    expect(errors).toEqual([]);
  });
});
