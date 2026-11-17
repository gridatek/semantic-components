import { type Page, expect, test } from '../../test';

const title = (page: Page) => page.getByRole('textbox', { name: 'Title' });
const text = (page: Page) => page.getByRole('textbox', { name: 'Text' });

test.describe('Title Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/title-editor-demo');
    await expect(text(page)).toBeVisible();
  });

  test('Enter in the title goes to the start of the text, no line break in the title', async ({
    page,
  }) => {
    await title(page).fill('Spring notes');
    await title(page).press('Enter');
    await expect(text(page)).toBeFocused();
    await page.keyboard.type('Hi ');
    await expect(text(page).locator('p').first()).toHaveText(
      'Hi The garden wakes up.',
    );
    await expect(title(page)).toHaveValue('Spring notes');
  });

  test('↓ at the end of the title goes to the text', async ({ page }) => {
    await title(page).fill('Spring notes');
    await title(page).press('ArrowDown');
    await expect(text(page)).toBeFocused();
  });

  for (const key of ['Backspace', 'ArrowUp', 'ArrowLeft'])
    test(`${key} at the very start of the text goes back to the end of the title`, async ({
      page,
    }) => {
      await title(page).fill('Spring notes');
      await title(page).press('Enter');
      await expect(text(page)).toBeFocused();
      await page.keyboard.press(key);
      await expect(title(page)).toBeFocused();
      await page.keyboard.type('!');
      await expect(title(page)).toHaveValue('Spring notes!');
      // Nothing in the text changed.
      await expect(text(page).locator('p').first()).toHaveText(
        'The garden wakes up.',
      );
    });

  test('inside the text, those keys stay in the text', async ({ page }) => {
    await text(page).locator('p').nth(1).click();
    await page.keyboard.press('ArrowUp');
    await expect(text(page)).toBeFocused();
  });

  test('the title is set as a heading of the text: its font, weight and case', async ({
    page,
  }) => {
    const look = await title(page).evaluate((el) => {
      const style = getComputedStyle(el);
      const probe = el.ownerDocument.createElement('h1');
      probe.dataset['typeset'] = '';
      el.parentElement?.append(probe);
      const heading = getComputedStyle(probe);
      const result = {
        family: [style.fontFamily, heading.fontFamily],
        weight: [style.fontWeight, heading.fontWeight],
        transform: [style.textTransform, heading.textTransform],
        resize: style.resize,
      };
      probe.remove();
      return result;
    });
    expect(look.family[0]).toBe(look.family[1]);
    expect(look.weight[0]).toBe(look.weight[1]);
    expect(look.transform[0]).toBe(look.transform[1]);
    expect(look.resize).toBe('none');
  });
});
