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

test.describe('Backdrop in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the backdrop has its preset's shade and blur; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/backdrop/backdrop-usage-demo');
      await page.getByRole('button', { name: 'Backdrop' }).click();
      const backdrop = page.locator('[scBackdrop]');
      const wanted = styles.backdrop.split(/\s+/).filter(Boolean);
      await expect
        .poll(async () => {
          const have = new Set(
            ((await backdrop.getAttribute('class')) ?? '').split(/\s+/),
          );
          return wanted.filter((c) => !have.has(c));
        }, `${preset} backdrop`)
        .toEqual([]);

      await page.goto('/docs/components/backdrop');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
