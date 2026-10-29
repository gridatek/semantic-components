import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Questionnaire Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/questionnaire');
    await expectNoA11yViolations(page);
  });
});
