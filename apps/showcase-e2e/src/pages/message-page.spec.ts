import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Message Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/message');
    await expectNoA11yViolations(page);
  });
});
