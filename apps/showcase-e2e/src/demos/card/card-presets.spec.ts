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

test.describe('Card in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the card and its parts have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/card/card-usage-demo');
      const card = page.locator('[scCard]');
      // The frame, the card's own, then the demo's (cn).
      await expectClasses(
        card,
        twMerge(`${styles.frame} ${styles.card.card} w-full max-w-sm`),
        `${preset} card`,
      );
      await expectClasses(
        card.locator('[scCardHeader]'),
        styles.card.header,
        `${preset} header`,
      );
      await expectClasses(
        card.locator('[scCardTitle]'),
        styles.card.title,
        `${preset} title`,
      );
      await expectClasses(
        card.locator('[scCardDescription]'),
        styles.card.description,
        `${preset} description`,
      );
      await expectClasses(
        card.locator('[scCardContent]'),
        styles.card.content,
        `${preset} content`,
      );
      await expectClasses(
        card.locator('[scCardFooter]'),
        twMerge(`${styles.card.footer} flex-col gap-2`),
        `${preset} footer`,
      );

      await page.goto('/docs/components/card');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
