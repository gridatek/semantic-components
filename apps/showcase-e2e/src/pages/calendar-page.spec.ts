import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Calendar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    // Many calendars, 42 days each: over 30 s on CI in Firefox.
    test.slow();
    await page.goto('/docs/components/calendar');
    await expectNoA11yViolations(page);
  });
});
