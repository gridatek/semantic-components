import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Marker in its preset', () => {
  test(`a marker and its icon have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/marker/border-marker-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="marker"]').first(),
        `${styles.marker.root} border-b border-border pb-2`,
        'marker',
      ],
      [
        page.locator('[data-slot="marker-icon"]').first(),
        styles.marker.icon,
        'icon',
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
