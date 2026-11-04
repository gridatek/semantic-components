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

const VARIANTS = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
] as const;

test.describe('Badge in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: each variant has its preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/badge/variants-badge-demo');
      const badges = page.locator('[scBadge]');
      for (const [i, variant] of VARIANTS.entries()) {
        const wanted = twMerge(styles.badge({ variant }))
          .split(/\s+/)
          .filter(Boolean);
        await expect
          .poll(async () => {
            const have = new Set(
              ((await badges.nth(i).getAttribute('class')) ?? '').split(/\s+/),
            );
            return wanted.filter((c) => !have.has(c));
          }, `${preset} ${variant}`)
          .toEqual([]);
      }

      await page.goto('/docs/components/badge');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
