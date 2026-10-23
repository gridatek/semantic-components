import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Carousel Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/carousel');
    await expectNoA11yViolations(page);
  });
});
