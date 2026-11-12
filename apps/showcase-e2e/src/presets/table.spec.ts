import { type Locator } from '@playwright/test';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

/** Read until it has them all: the first render may not have them yet. */
async function expectClasses(target: Locator, classes: string, what: string) {
  const wanted = classes.split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return wanted.filter((c) => !have.has(c));
    }, what)
    .toEqual([]);
}

test.describe('Table in its preset', () => {
  test(`the table, its header cells, cells, caption and frame have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/table/table-usage-demo');
    const table = page.getByRole('table');
    await expectClasses(table, styles.table.table, `${preset} table`);
    // The second column: no class of the demo's own.
    await expectClasses(
      table.getByRole('columnheader').nth(1),
      styles.table.headerCell,
      `${preset} header cell`,
    );
    await expectClasses(
      table.getByRole('cell').nth(1),
      styles.table.cell,
      `${preset} cell`,
    );
    await expectClasses(
      table.locator('caption'),
      styles.table.caption,
      `${preset} caption`,
    );

    await page.goto('/demos/table/scrolling-table-demo');
    await expectClasses(
      page.getByRole('region', { name: 'Orders' }),
      styles.frame,
      `${preset} frame`,
    );
  });
});
