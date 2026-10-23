import { type Page, expect, test } from '../../test';

const plans = (page: Page) => page.getByRole('textbox', { name: 'Plans' });
const tableButton = (page: Page) =>
  page.getByRole('button', { name: 'Table', exact: true });

test.describe('Tables Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/tables-editor-demo');
    await expect(plans(page).locator('table')).toBeVisible();
  });

  test('the saved table is in the document', async ({ page }) => {
    await expect(plans(page).locator('tr')).toHaveCount(3);
    await expect(plans(page).locator('th')).toHaveText([
      'Plan',
      'Price',
      'Seats',
    ]);
  });

  test('outside a table, only inserting one applies', async ({ page }) => {
    await plans(page).getByText('Our plans:').click();
    await tableButton(page).click();
    await expect(
      page.getByRole('menuitem', { name: 'Delete row' }),
    ).toBeDisabled();
    await page.getByRole('menuitem', { name: 'Insert table' }).click();
    await expect(plans(page).locator('table')).toHaveCount(2);
  });

  test('in a table, the menu edits it', async ({ page }) => {
    await plans(page).getByText('Team').click();
    await expect(tableButton(page)).toHaveAttribute('data-state', 'on');

    await tableButton(page).click();
    await page.getByRole('menuitem', { name: 'Add row below' }).click();
    await expect(plans(page).locator('tr')).toHaveCount(4);

    await tableButton(page).click();
    await page.getByRole('menuitem', { name: 'Delete column' }).click();
    await expect(plans(page).locator('tr').first().locator('th')).toHaveCount(
      2,
    );

    await tableButton(page).click();
    await page.getByRole('menuitem', { name: 'Delete table' }).click();
    await expect(plans(page).locator('table')).toHaveCount(0);
  });
});
