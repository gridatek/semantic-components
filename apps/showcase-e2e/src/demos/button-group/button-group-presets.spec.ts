import type { ScPreset } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { twMerge } from 'tailwind-merge';
import { expectNoA11yViolations } from '../../axe';
import { type Locator, expect, test } from '../../test';

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

/** Classes, merged as the parts merge them (`cn`). */
const split = (classes: string) =>
  twMerge(classes).split(/\s+/).filter(Boolean);

/** The classes of `classes` the element lacks: read until it has them all. */
const expectClasses = (target: Locator, classes: string[], label: string) =>
  expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, label)
    .toEqual([]);

test.describe('Button Group in every preset', () => {
  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the group and its text have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/button-group/text-button-group-demo');
      await expectClasses(
        page.getByRole('group', { name: 'Website' }),
        split(styles.buttonGroup({ orientation: 'horizontal' })),
        `${preset} group classes missing`,
      );
      await expectClasses(
        page.getByText('https://'),
        split(styles.buttonGroupText),
        `${preset} text classes missing`,
      );

      await page.goto('/docs/components/button-group');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
