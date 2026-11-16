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

  test('opened, the cursor is at the start (not in the table that ends the document)', async ({
    page,
  }) => {
    await plans(page).focus();
    await page.keyboard.type('Hi ');
    await expect(plans(page).locator('p').first()).toHaveText('Hi Our plans:');
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
    // A menu button, not a toggle: no pressed look in a table.
    await expect(tableButton(page)).toHaveAttribute('data-state', 'off');
    await expect(tableButton(page)).not.toHaveAttribute('aria-pressed', 'true');

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

// The dragged border's index: the last of three, or the first (between columns).
for (const [border, index] of [
  ['last', 2],
  ['middle', 0],
] as const)
  test(`dragging the ${border} column border: it follows the pointer, the others stay, no scrollbar while the table fits`, async ({
    page,
  }) => {
    await page.goto('/demos/editor/tables-editor-demo');
    const table = plans(page).locator('table');
    await expect(table).toBeVisible();
    const state = () =>
      table.evaluate((el) => ({
        borders: [...el.querySelectorAll('tr:first-child > *')].map(
          (cell) => cell.getBoundingClientRect().right,
        ),
        overflow:
          (el.parentElement as HTMLElement).scrollWidth -
          (el.parentElement as HTMLElement).clientWidth,
      }));
    const start = await state();
    expect(start.borders).toHaveLength(3);
    const cell = await table
      .locator('tr')
      .first()
      .locator('th, td')
      .nth(index)
      .boundingBox();
    const x = (cell?.x ?? 0) + (cell?.width ?? 0) - 1;
    const y = (cell?.y ?? 0) + 10;
    await page.mouse.move(x - 3, y);
    await page.mouse.move(x, y, { steps: 2 });
    await expect(table.locator('.column-resize-handle').first()).toBeAttached();
    await page.mouse.down();
    for (const dx of [0, -40, -80, -20]) {
      await page.mouse.move(x + dx, y, { steps: 2 });
      const now = await state();
      expect(now.overflow, `at ${dx}`).toBe(0);
      // The dragged border: at the pointer (within its line's width).
      expect(
        Math.abs(now.borders[index] - start.borders[index] - dx),
        `at ${dx}: ${now.borders.join(', ')}`,
      ).toBeLessThanOrEqual(2);
      // The ones before it: where they were.
      for (let i = 0; i < index; i++)
        expect(
          Math.abs(now.borders[i] - start.borders[i]),
          `border ${i + 1} at ${dx}`,
        ).toBeLessThanOrEqual(1);
    }
    await page.mouse.up();
  });

test('a table dragged to its box’s edge fits it: its frame takes no width (no scrollbar, no frame cut off)', async ({
  page,
}) => {
  await page.goto('/demos/editor/tables-editor-demo');
  const table = plans(page).locator('table');
  await expect(table).toBeVisible();
  const box = await table.evaluate((el) => {
    const rect = (el.parentElement as HTMLElement).getBoundingClientRect();
    return { right: rect.right };
  });
  const last = await table
    .locator('tr')
    .first()
    .locator('th, td')
    .last()
    .boundingBox();
  const y = (last?.y ?? 0) + 10;
  const x = (last?.x ?? 0) + (last?.width ?? 0) - 1;
  // Narrower first (its columns get widths), then back out to the edge.
  await page.mouse.move(x - 3, y);
  await page.mouse.move(x, y, { steps: 2 });
  await expect(table.locator('.column-resize-handle').first()).toBeAttached();
  await page.mouse.down();
  await page.mouse.move(x - 60, y, { steps: 3 });
  await page.mouse.move(box.right - 1, y, { steps: 6 });
  await page.mouse.up();
  const fit = await table.evaluate((el) => {
    const wrap = el.parentElement as HTMLElement;
    return {
      overflow: wrap.scrollWidth - wrap.clientWidth,
      past:
        el.getBoundingClientRect().right - wrap.getBoundingClientRect().right,
    };
  });
  expect(fit.overflow).toBe(0);
  expect(fit.past).toBeLessThanOrEqual(0);
});
