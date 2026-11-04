import { type Locator } from '@playwright/test';
import type { ScPreset } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { expectNoA11yViolations } from '../../axe';
import { expect, test } from '../../test';

/** Every preset, as the showcase's preset sheet lists them. */
const PRESETS: Record<string, ScPreset> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

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

test.describe('Table in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the table, its header cells, cells, caption and frame have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
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

      await page.goto('/docs/components/table');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
