import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Resizable in its preset', () => {
  test(`the grip has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/resizable/handle-resizable-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[scResizableHandleGrip]').first(),
        styles.resizable.grip,
        'grip',
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
  });
});
