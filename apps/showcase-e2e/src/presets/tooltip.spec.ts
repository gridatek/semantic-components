import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Tooltip in its preset', () => {
  test(`the tooltip and its arrow have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/tooltip/keyboard-tooltip-demo');
    await page.getByRole('button', { name: 'Save' }).hover();
    for (const [target, wanted, what] of [
      [page.getByRole('tooltip'), styles.tooltip.popup, 'tooltip'],
      [page.locator('[scTooltipArrow]'), styles.tooltip.arrow, 'arrow'],
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
  });
});
