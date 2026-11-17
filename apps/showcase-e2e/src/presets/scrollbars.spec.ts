import { expectStyledScrollbar } from '../looks';
import { test } from '../test';
import { presetName } from './preset';

// ui's scrollbars.css with the preset's scrollbars-variables.css: shadcn's
// Scroll Area thumb on the browser's scrollbars — square in lyra and sera.
const corners = () =>
  ['lyra', 'sera'].includes(presetName()) ? 'square' : 'round';

test.describe('Scrollbars in their preset', () => {
  test('the page’s own scrollbar', async ({ page }) => {
    await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
    await expectStyledScrollbar(page.locator('html'), corners());
  });

  test('a box’s scrollbar (Scroll Area Next2)', async ({ page }) => {
    await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
    await expectStyledScrollbar(page.locator('[scScrollAreaNext2]'), corners());
  });
});
