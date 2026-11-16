import { type Page, expect, test } from '../../test';

const draft = (page: Page) => page.getByRole('textbox', { name: 'Draft' });
const bar = (page: Page) =>
  page.getByRole('search', { name: 'Search and replace' });

test.describe('Search Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/search-editor-demo');
    await expect(draft(page)).toContainText('The colour of the sky');
  });

  test('finds, steps through and replaces every match', async ({ page }) => {
    const search = page.getByRole('button', { name: 'Search and replace' });
    await search.click();
    // A disclosure: expanded, wired to the bar's panel.
    await expect(search).toHaveAttribute('aria-expanded', 'true');
    await expect(search).not.toHaveAttribute('aria-pressed');
    const input = bar(page).getByRole('searchbox', { name: 'Search' });
    await expect(input).toBeFocused();

    await input.fill('colour');
    const results = bar(page).getByRole('status');
    await expect(results).toHaveText('1 of 5');
    await input.press('Enter');
    await expect(results).toHaveText('2 of 5');
    await input.press('Shift+Enter');
    await expect(results).toHaveText('1 of 5');

    await bar(page)
      .getByRole('textbox', { name: 'Replace with' })
      .fill('color');
    await bar(page).getByRole('button', { name: 'Replace all' }).click();
    await expect(draft(page)).not.toContainText('colour');
    await expect(results).toHaveText('No results');
  });

  test('Ctrl / ⌘ + F opens it, Escape closes it', async ({ page }) => {
    await draft(page).click();
    await page.keyboard.press('ControlOrMeta+f');
    const input = bar(page).getByRole('searchbox', { name: 'Search' });
    await expect(input).toBeFocused();

    await input.fill('colour');
    await expect(
      draft(page).locator('.find-and-replace-result').first(),
    ).toBeVisible();
    await input.press('Escape');
    await expect(bar(page)).toBeHidden();
    await expect(draft(page)).toBeFocused();
    // Closed: its matches cleared.
    await expect(draft(page).locator('.find-and-replace-result')).toHaveCount(
      0,
    );
  });

  test('its button closes it too: collapsed, the matches cleared', async ({
    page,
  }) => {
    const search = page.getByRole('button', { name: 'Search and replace' });
    await search.click();
    const input = bar(page).getByRole('searchbox', { name: 'Search' });
    await input.fill('colour');
    await expect(
      draft(page).locator('.find-and-replace-result').first(),
    ).toBeVisible();
    await search.click();
    await expect(search).toHaveAttribute('aria-expanded', 'false');
    await expect(bar(page)).toBeHidden();
    await expect(draft(page).locator('.find-and-replace-result')).toHaveCount(
      0,
    );
  });
});

test('the current match: a stronger colour and an underline (not colour alone), no outline', async ({
  page,
}) => {
  await page.goto('/demos/editor/search-editor-demo');
  await page.getByRole('button', { name: 'Search and replace' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('the');
  const current = page.locator('.find-and-replace-result-current');
  const other = page
    .locator('.find-and-replace-result:not(.find-and-replace-result-current)')
    .first();
  await expect(current).toBeVisible();
  const look = (el: Element) => {
    const style = getComputedStyle(el);
    return {
      background: style.backgroundColor,
      shadow: style.boxShadow,
      outline: style.outlineStyle,
    };
  };
  const [now, rest] = [
    await current.evaluate(look),
    await other.evaluate(look),
  ];
  expect(now.background).not.toBe(rest.background);
  expect(now.shadow).toContain('inset');
  expect(rest.shadow).toBe('none');
  expect(now.outline).toBe('none');
});
