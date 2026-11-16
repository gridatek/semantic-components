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

test('a column border’s resize line stays in the table: no scrollbar (it would come and go under the pointer)', async ({
  page,
}) => {
  await page.goto('/demos/editor/tables-editor-demo');
  const table = plans(page).locator('table');
  await expect(table).toBeVisible();
  const overflow = () =>
    table.evaluate((el) => {
      const box = el.parentElement as HTMLElement;
      return [
        box.scrollWidth - box.clientWidth,
        box.scrollHeight - box.clientHeight,
      ];
    });
  const cells = table.locator('tr').first().locator('th, td');
  const count = await cells.count();
  for (let i = 0; i < count; i++) {
    const cell = await cells.nth(i).boundingBox();
    expect(cell).not.toBeNull();
    await page.mouse.move(
      (cell?.x ?? 0) + (cell?.width ?? 0) - 1,
      (cell?.y ?? 0) + 10,
    );
    await expect(table.locator('.column-resize-handle').first()).toBeAttached();
    expect(await overflow(), `column ${i + 1}`).toEqual([0, 0]);
  }
});
