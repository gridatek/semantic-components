import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Marker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/marker');
    await expectNoA11yViolations(page);
  });
});
