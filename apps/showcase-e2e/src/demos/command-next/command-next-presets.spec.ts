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

test.describe('Command Next in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the command and its parts have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/command-next/command-next-usage-demo');
      for (const [target, wanted, what] of [
        // The Usage's own rounded-lg border, over the preset's (as shadcn's example).
        [
          page.locator('[data-slot=command]'),
          `${styles.command.root} rounded-lg border`,
          'root',
        ],
        [page.locator('[role=combobox]'), styles.command.input, 'input'],
        [page.locator('[role=listbox]'), styles.command.list, 'list'],
        [page.locator('[role=group]').first(), styles.command.group, 'group'],
        [
          page.locator('[data-slot=command-group-label]').first(),
          styles.command.groupLabel,
          'group label',
        ],
        [page.locator('[role=option]').first(), styles.command.item, 'item'],
        [
          page.locator('[data-slot=command-shortcut]').first(),
          styles.command.shortcut,
          'shortcut',
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

      await page.goto('/docs/components/command-next');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
