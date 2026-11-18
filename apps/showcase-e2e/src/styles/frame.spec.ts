import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Frame in its style', () => {
  test(`scFrame has its style's frame`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/frame/frame-usage-demo');
    const part = page.locator('[scFrame]');
    const wanted = styles.frame.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await part.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${preset} frame`)
      .toEqual([]);
  });
});
