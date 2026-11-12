import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Aspect Ratio in its preset', () => {
  test(`scFrame has its preset's frame`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/aspect-ratio/aspect-ratio-usage-demo');
    const frame = page.locator('[scFrame]');
    const wanted = styles.frame.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await frame.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${preset} frame`)
      .toEqual([]);
  });
});
