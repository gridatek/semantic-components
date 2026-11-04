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

test.describe('Alert in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the alert and its parts have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/alert/action-alert-demo');
      const alert = page.locator('[scAlert]');
      // The demo's max-w-md merged over the preset's (cn).
      await expectClasses(
        alert,
        twMerge(`${styles.alert.alert({ variant: 'default' })} max-w-md`),
        `${preset} alert`,
      );
      await expectClasses(
        alert.locator('[scAlertTitle]'),
        styles.alert.title,
        `${preset} title`,
      );
      await expectClasses(
        alert.locator('[scAlertDescription]'),
        styles.alert.description,
        `${preset} description`,
      );
      await expectClasses(
        alert.locator('[scAlertAction]'),
        styles.alert.action,
        `${preset} action`,
      );

      await page.goto('/demos/alert/destructive-alert-demo');
      await expectClasses(
        page.locator('[scAlert]'),
        twMerge(`${styles.alert.alert({ variant: 'destructive' })} max-w-md`),
        `${preset} destructive`,
      );

      await page.goto('/docs/components/alert');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
