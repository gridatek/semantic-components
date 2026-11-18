import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Backdrop in its style', () => {
  test(`the backdrop has its style's shade and blur`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
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
