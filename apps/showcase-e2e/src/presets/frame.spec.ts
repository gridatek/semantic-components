import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Frame in its preset', () => {
  test(`scFrame has its preset's frame`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
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
