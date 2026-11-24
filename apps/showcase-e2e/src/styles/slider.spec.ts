import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Slider in its style', () => {
  test(`a slider has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/slider/controlled-slider-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('input[scSlider]').first(),
        `${styles.slider.root} ${styles.slider.track} ${styles.slider.thumb}`,
        'slider',
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
