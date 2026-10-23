import {
  activeDescendantText,
  collectErrors,
  press,
  type,
} from '../../interaction';
import { expect, test } from '../../test';

test.describe('Basic Mention Input Demo', () => {
  test('suggestions are wired to the textarea; keyboard picks one', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/mention-input/basic-mention-input-demo');
    const textarea = page.locator('textarea[scMentionInputControl]');
    await expect(textarea).toHaveAttribute('aria-autocomplete', 'list');
    await expect(textarea).not.toHaveAttribute('aria-controls');

    await textarea.click();
    await type(page, '@');
    const listbox = page.getByRole('listbox', { name: 'Suggestions' });
    await expect(listbox).toBeVisible();
    await expect(textarea).toHaveAttribute(
      'aria-controls',
      (await listbox.getAttribute('id')) as string,
    );
    const first = (await activeDescendantText(textarea)) as string;
    expect(first).toBeTruthy();

    await press(page, 'ArrowDown');
    const second = (await activeDescendantText(textarea)) as string;
    expect(second).not.toBe(first);
    await expect(textarea).toBeFocused();

    await press(page, 'Enter');
    await expect(listbox).toHaveCount(0);
    await expect(textarea).not.toHaveAttribute('aria-activedescendant');
    await expect(page.getByText('Mentions: 1 user(s)')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('clicking a suggestion keeps focus and inserts it', async ({ page }) => {
    await page.goto('/demos/mention-input/basic-mention-input-demo');
    const textarea = page.locator('textarea[scMentionInputControl]');
    await textarea.click();
    await type(page, '@');
    await page.getByRole('option').nth(1).click();
    await expect(textarea).toBeFocused();
    await expect(page.getByText('Mentions: 1 user(s)')).toBeVisible();
  });
});
