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

/** Read until the element has them all: the first render may not have them yet. */
async function expectClasses(target: Locator, wanted: string, what: string) {
  const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, `${what} classes missing`)
    .toEqual([]);
}

test.describe('Navigation Menu Next in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: trigger, panel, link and box have the preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto(
        '/demos/navigation-menu-next/navigation-menu-next-usage-demo',
      );
      const n = styles.navigationMenu;
      await expectClasses(
        page.getByRole('button', { name: 'Getting started' }),
        n.trigger,
        `${preset} trigger`,
      );
      await expectClasses(
        page.locator('[scNavigationMenuNextContent]').first(),
        n.content,
        `${preset} content`,
      );
      // The panel's links: the preset's, but for the transition (the part's).
      await expectClasses(
        page.locator('[scNavigationMenuNextContent] a').first(),
        n.link.replace(/\btransition-all\b/, ''),
        `${preset} link`,
      );
      await expectClasses(
        page.locator('nav > div[aria-hidden]'),
        n.popup,
        `${preset} box`,
      );

      await page.goto('/docs/components/navigation-menu-next');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
