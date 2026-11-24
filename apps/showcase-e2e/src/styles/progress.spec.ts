import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Progress in its style', () => {
  test(`its track, label and value have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
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
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
