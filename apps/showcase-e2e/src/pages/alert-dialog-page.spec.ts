import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Alert Dialog Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/alert-dialog');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/alert-dialog');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector; a Keyboard section', async ({
    page,
  }) => {
    await page.goto('/docs/components/alert-dialog');
    const parts = page.getByRole('region', { name: 'Alert Dialog parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScAlertDialogProvider',
      'ScAlertDialogTrigger',
      'ScAlertDialogPortal',
      'ScAlertDialog',
      'ScAlertDialogHeader',
      'ScAlertDialogMedia',
      'ScAlertDialogTitle, ScAlertDialogDescription',
      'ScAlertDialogFooter',
      'ScAlertDialogCancel, ScAlertDialogAction',
    ]);
    await expect(page.getByRole('heading', { name: 'Keyboard' })).toBeVisible();
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/alert-dialog');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
