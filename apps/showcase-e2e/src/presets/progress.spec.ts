import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Progress in its preset', () => {
  test(`its track, label and value have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/progress/basic-progress-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[scProgressTrack]').first(),
        styles.progress.track,
        'track',
      ],
      [
        page.locator('[scProgressLabel]').first(),
        styles.progress.label,
        'label',
      ],
      [
        page.locator('[scProgressValueText]').first(),
        styles.progress.value,
        'value',
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
