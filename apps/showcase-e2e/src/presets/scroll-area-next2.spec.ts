import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Scroll Area Next2 in its preset', () => {
  test(`the thumb has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
    const classes = twMerge(styles.scrollArea.nativeThumb).split(/\s+/);
    // Read until it has them all: the first render may not have them yet.
    await expect
      .poll(async () => {
        const have = new Set(
          (
            (await page.locator('[scScrollAreaNext2]').getAttribute('class')) ??
            ''
          ).split(/\s+/),
        );
        return classes.filter((c) => !have.has(c));
      }, `${preset} thumb classes missing`)
      .toEqual([]);
  });
});
