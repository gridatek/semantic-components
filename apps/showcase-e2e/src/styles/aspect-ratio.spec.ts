import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Aspect Ratio in its style', () => {
  test(`scFrame has its style's frame`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/aspect-ratio/aspect-ratio-usage-demo');
    const frame = page.locator('[scFrame]');
    const wanted = styles.frame.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await frame.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${style} frame`)
      .toEqual([]);
  });
});
