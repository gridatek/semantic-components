import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Gantt Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/gantt');
    await expectNoA11yViolations(page);
  });
});
