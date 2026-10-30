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

/**
 * The classes a default button gets in a preset: its base, variant and size,
 * merged as `scButton` merges them (`cn`: a size's icon size wins over the
 * base's, so the base's isn't there).
 */
const classesOf = ({ button }: ScPreset) =>
  twMerge(button({ variant: 'default', size: 'default' }))
    .split(/\s+/)
    .filter(Boolean);

test.describe('Button in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the button has its preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/button/default-button-demo');
      // Read until the button has its classes: the first render may not
      // have applied them yet.
      const target = page.getByRole('button', { name: 'Button' });
      await expect
        .poll(async () => {
          const have = new Set(
            ((await target.getAttribute('class')) ?? '').split(/\s+/),
          );
          return classesOf(styles).filter((c) => !have.has(c));
        }, `${preset} classes missing`)
        .toEqual([]);

      await page.goto('/docs/components/button');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
