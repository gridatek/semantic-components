import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Backdrop in its preset', () => {
  test(`the backdrop has its preset's shade and blur`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/backdrop/backdrop-usage-demo');
    await page.getByRole('button', { name: 'Backdrop' }).click();
    const backdrop = page.locator('[scBackdrop]');
    const wanted = styles.backdrop.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await backdrop.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${preset} backdrop`)
      .toEqual([]);
  });
});
