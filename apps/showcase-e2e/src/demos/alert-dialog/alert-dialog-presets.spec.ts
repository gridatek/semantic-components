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
import { openStill } from '../../looks';
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

test.describe('Alert Dialog in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the backdrop, dialog and its parts have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await openStill(page, '/demos/alert-dialog/media-alert-dialog-demo');
      await page.getByRole('button', { name: 'Share Project' }).click();
      const dialog = page.getByRole('alertdialog');
      const s = styles.alertDialog;
      await expectClasses(
        page.locator('[scBackdrop]'),
        s.backdrop,
        `${preset} backdrop`,
      );
      await expectClasses(
        dialog,
        twMerge(`relative max-w-[calc(100%-2rem)] text-sm ${s.content}`),
        `${preset} dialog`,
      );
      for (const [part, classes] of [
        ['[scAlertDialogHeader]', s.header],
        ['[scAlertDialogMedia]', s.media],
        ['[scAlertDialogTitle]', s.title],
        ['[scAlertDialogDescription]', s.description],
        ['[scAlertDialogFooter]', s.footer],
      ] as const)
        await expectClasses(dialog.locator(part), classes, `${preset} ${part}`);

      await page.goto('/docs/components/alert-dialog');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
