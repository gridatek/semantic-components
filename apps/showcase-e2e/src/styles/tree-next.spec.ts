import { test } from '../test';
import { currentStyle, expectClasses } from './style';

test.describe('Tree Next in its style', () => {
  test(`a row has the style's size, spacing and corners`, async ({ page }) => {
    await page.goto('/demos/tree-next/tree-next-usage-demo');
    await expectClasses(
      page.locator('[scTreeNextItemLabel]').first(),
      currentStyle().treeNext.label,
      'row',
    );
  });
});
