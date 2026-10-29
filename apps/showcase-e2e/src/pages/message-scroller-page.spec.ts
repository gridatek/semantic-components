import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Message Scroller Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/message-scroller');
    await expectNoA11yViolations(page);
  });
});
