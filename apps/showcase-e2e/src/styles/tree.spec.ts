import { test } from '../test';
import { currentStyle, expectClasses } from './style';

test.describe('Tree in its style', () => {
  test(`a row has the style's size, spacing and corners`, async ({ page }) => {
    await page.goto('/demos/tree/tree-usage-demo');
    await expectClasses(
      page.locator('[scTreeItemLabel]').first(),
      currentStyle().tree.label,
      'row',
    );
  });
});
