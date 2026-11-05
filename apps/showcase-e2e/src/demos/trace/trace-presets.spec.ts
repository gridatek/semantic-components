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

test.describe('Trace in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: a trace, its line and a collapsible's trigger have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/trace/trace-usage-demo');
      for (const [target, wanted, what] of [
        [
          page.locator('[data-slot="trace"]').first(),
          // The demo narrows it (max-w-sm).
          `${styles.trace.root} max-w-sm`,
          'trace',
        ],
        [
          page.locator('[data-slot="trace-line"]').nth(1),
          styles.trace.line,
          'line',
        ],
        [
          page.locator('[data-slot="trace-collapsible-trigger"]').first(),
          styles.trace.collapsibleTrigger,
          'trigger',
        ],
      ] as const) {
        const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
        // Read until it has them all: the first render may not have them yet.
        await expect
          .poll(async () => {
            const have = new Set(
              ((await target.getAttribute('class')) ?? '').split(/\s+/),
            );
            return classes.filter((c) => !have.has(c));
          }, `${preset} ${what} classes missing`)
          .toEqual([]);
      }

      await page.goto('/docs/components/trace');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
