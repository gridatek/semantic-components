import type { ScPreset } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { twMerge } from 'cn';
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

test.describe('Dialog in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the dialog, its title and its closes have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/dialog/dialog-usage-demo');
      await page.getByRole('button', { name: 'Open Dialog' }).click();
      for (const [target, wanted, what] of [
        // The demo narrows it (sm:max-w-sm), as shadcn's does; its full width
        // is w-screen (the CDK's pane gives w-full nothing to fill).
        [
          page.getByRole('dialog'),
          `${styles.dialog.content} w-screen sm:max-w-sm`,
          'dialog',
        ],
        [
          page.getByRole('heading', { name: 'Edit profile' }),
          styles.dialog.title,
          'title',
        ],
        // The ✕ and Cancel: the preset's button, each its variant and size.
        [
          page.getByRole('button', { name: 'Close' }),
          styles.button({ variant: 'ghost', size: 'icon-sm' }),
          'the ✕',
        ],
        [
          page.getByRole('button', { name: 'Cancel' }),
          styles.button({ variant: 'outline', size: 'default' }),
          'Cancel',
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
      await page.goto('/docs/components/dialog');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
