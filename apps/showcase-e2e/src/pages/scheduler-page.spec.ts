import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Scheduler Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scheduler');
    await expectNoA11yViolations(page);
  });
});
