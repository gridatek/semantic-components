import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Internationalization Page', () => {
  test("the week's first day: for every locale or one, in the config", async ({
    page,
  }) => {
    await page.goto('/docs/guides/i18n');
    const section = page
      .getByRole('heading', { name: "The week's first day" })
      .locator('xpath=ancestor::section[1]');
    await expect(section).toContainText('firstDayOfWeek');
    await expect(section).toContainText('ar-u-fw-sun');
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/guides/i18n');
    await expectNoA11yViolations(page);
  });
});
