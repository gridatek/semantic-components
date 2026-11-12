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

test.describe('Sidebar Next in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the sidebar's parts have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/sidebar-next/sidebar-next-usage-demo');
      for (const [target, wanted, what] of [
        [
          page.locator('[data-slot=sidebar-inner]'),
          styles.sidebar.inner,
          'inner',
        ],
        [
          page.locator('[data-slot=sidebar-header]'),
          styles.sidebar.header,
          'header',
        ],
        [
          page.locator('[data-slot=sidebar-content]'),
          styles.sidebar.content,
          'content',
        ],
        [
          page.locator('[data-slot=sidebar-group-label]'),
          styles.sidebar.groupLabel,
          'group label',
        ],
        [
          page.locator('[data-slot=sidebar-menu]').nth(1),
          styles.sidebar.menu,
          'menu',
        ],
        [
          page.getByRole('link', { name: 'Inbox' }),
          styles.sidebar.menuButton({}),
          'menu button',
        ],
        [
          page.locator('[data-slot=sidebar-inset]'),
          styles.sidebar.inset,
          'inset',
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

      await page.goto('/docs/components/sidebar-next');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
