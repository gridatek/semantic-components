import { expectStyledScrollbar } from '../looks';
import { test } from '../test';
import { presetName } from './preset';

// ui's scrollbars.css with the preset's scrollbars-variables.css: shadcn's
// Scroll Area thumb on the browser's scrollbars — square in lyra and sera.
const corners = () =>
  ['lyra', 'sera'].includes(presetName()) ? 'square' : 'round';

test.describe('Scrollbars in their preset', () => {
  test('the page’s own scrollbar', async ({ page }) => {
    await page.goto('/demos/sidebar/sidebar-usage-demo');
    await expectStyledScrollbar(page.locator('html'), corners());
  });

  test('a part’s scrollbar (the Sidebar’s content)', async ({ page }) => {
    await page.goto('/demos/sidebar/sidebar-usage-demo');
    await expectStyledScrollbar(
      page.locator('[data-slot=sidebar-content]'),
      corners(),
    );
  });
});
