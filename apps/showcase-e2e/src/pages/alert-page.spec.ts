import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Alert Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/alert');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/alert');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector; Announcing explains the roles', async ({
    page,
  }) => {
    await page.goto('/docs/components/alert');
    const parts = page.getByRole('region', { name: 'Alert parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScAlert',
      'ScAlertTitle',
      'ScAlertDescription',
      'ScAlertAction',
    ]);
    await expect(
      page.getByRole('heading', { name: 'Announcing' }),
    ).toBeVisible();
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/alert');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
