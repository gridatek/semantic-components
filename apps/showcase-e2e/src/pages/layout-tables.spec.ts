import { expect, test } from '@playwright/test';
import { layoutTables } from '../axe';

/**
 * WAVE's "Layout table": a table with no header cell (`<th>`). Data in a
 * table has column names — a header row, hidden if the look has none. Plain
 * markup: no app.
 */
test('a table with no header cell is found; one with a header row, hidden or not, is not', async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <table id="bare"><tbody><tr><td>Blue Bottle Coffee</td><td>$5</td></tr></tbody></table>
      <table id="headed">
        <thead class="sr-only"><tr><th scope="col">Merchant</th><th scope="col">Amount</th></tr></thead>
        <tbody><tr><td>Blue Bottle Coffee</td><td>$5</td></tr></tbody>
      </table>
    </main>
  `);
  expect(await layoutTables(page)).toEqual(['table#bare: Blue Bottle Coffee']);
});
