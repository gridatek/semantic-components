import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test('date-range-input page: no axe violations', async ({ page }) => {
  await page.goto('/docs/components/date-range-input');
  await expect(page.locator('h2').first()).toHaveText('Usage');
  await expectNoA11yViolations(page);
});
