import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Marker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/marker');
    await expectNoA11yViolations(page);
  });
});
