import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Kbd in its style', () => {
  test(`a key has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/kbd/kbd-usage-demo');
    for (const [target, wanted, what] of [
      [page.locator('[data-slot="kbd"]').first(), styles.kbd, 'kbd'],
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
