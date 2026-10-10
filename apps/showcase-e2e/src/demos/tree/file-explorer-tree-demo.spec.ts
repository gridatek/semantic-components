import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const row = (page: Page, name: string) =>
  page
    .locator('[data-slot=tree-item-trigger]')
    .filter({ has: page.locator(`span:text-is("${name}")`) });
const item = (page: Page, name: string) =>
  page.locator('[role=treeitem]').filter({
    has: page.locator(
      `> [data-slot=tree-item-trigger] span:text-is("${name}")`,
    ),
  });

test.describe('File Explorer Tree Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/tree/file-explorer-tree-demo');
    await expect(page.getByRole('tree')).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('nesting is reflected in aria-level', async ({ page }) => {
    await expect(item(page, 'src')).toHaveAttribute('aria-level', '1');
    await expect(item(page, 'app')).toHaveAttribute('aria-level', '2');
    await expect(item(page, 'app.ts')).toHaveAttribute('aria-level', '3');
  });

  test('one tab stop; arrows follow the hierarchy', async ({ page }) => {
    await press(page, 'Tab');
    await expect(item(page, 'src')).toBeFocused();
    await press(page, 'Tab');
    await expect(page.locator('[role=tree] :focus')).toHaveCount(0);

    await press(page, 'Shift+Tab');
    await press(page, 'ArrowDown'); // app
    await press(page, 'ArrowDown'); // components (collapsed)
    await expect(item(page, 'components')).toBeFocused();
    await press(page, 'ArrowRight'); // expand
    await expect(item(page, 'components')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await press(page, 'ArrowRight'); // into first child
    await expect(item(page, 'button.ts')).toBeFocused();
    await press(page, 'ArrowLeft'); // back to parent
    await expect(item(page, 'components')).toBeFocused();
    await press(page, 'ArrowLeft'); // collapse
    await expect(item(page, 'components')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('focus ring only on the focused row', async ({ page }) => {
    await press(page, 'Tab');
    await press(page, 'ArrowDown'); // app
    await expect(row(page, 'app')).not.toHaveCSS('box-shadow', 'none');
    await expect(row(page, 'components')).toHaveCSS('box-shadow', 'none');
  });

  test('click selects and expands; collapse animates then hides', async ({
    page,
  }) => {
    await row(page, 'app.ts').click();
    await expect(item(page, 'app.ts')).toHaveAttribute('aria-selected', 'true');
    await expect(row(page, 'app.ts')).toHaveAttribute('data-selected', 'true');

    const group = item(page, 'app').locator('> [data-slot=tree-item-group]');
    await row(page, 'app').click();
    await expect(group).toHaveAttribute('data-state', 'closed');
    await expect(group).toHaveCSS('visibility', 'hidden');
    await expect(group).toHaveCSS('height', '0px');
    // keyboard skips the collapsed children
    await press(page, 'ArrowDown');
    await expect(item(page, 'assets')).toBeFocused();
  });
});
