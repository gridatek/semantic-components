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

test.describe('Pagination in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the list, the ellipsis, Previous and Next have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/pagination/ellipsis-pagination-demo');
      const nav = page.getByRole('navigation', { name: 'Results' });
      await expectClasses(
        nav.locator('[scPaginationList]'),
        styles.pagination.list,
        `${preset} list classes missing`,
      );
      await expectClasses(
        nav.locator('[scPaginationEllipsis]').first(),
        styles.pagination.ellipsis,
        `${preset} ellipsis classes missing`,
      );
      await expectClasses(
        nav.getByRole('button', { name: 'Previous' }),
        styles.pagination.previous,
        `${preset} Previous classes missing`,
      );
      await expectClasses(
        nav.getByRole('button', { name: 'Next' }),
        styles.pagination.next,
        `${preset} Next classes missing`,
      );

      await page.goto('/docs/components/pagination');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
