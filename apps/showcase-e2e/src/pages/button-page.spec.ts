import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Button Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/button');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/button');
    await expectNoA11yViolations(page, { dark: true });
  });
});
