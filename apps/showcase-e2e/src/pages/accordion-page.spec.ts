import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Accordion Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/accordion');
    await expectNoA11yViolations(page);
  });
});
