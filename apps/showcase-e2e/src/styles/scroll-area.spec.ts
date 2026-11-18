import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Scroll Area in its style', () => {
  test(`the thumb has their style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/scroll-area/scroll-area-usage-demo');

    for (const [target, wanted, what] of [
      [page.locator('[scScrollAreaThumb]'), styles.scrollArea.thumb, 'thumb'],
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
