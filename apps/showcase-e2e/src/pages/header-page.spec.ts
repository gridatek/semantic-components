import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Header Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/header');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('no accessibility violations in dark mode', async ({ page }) => {
    await page.goto('/docs/components/header');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector', async ({ page }) => {
    await page.goto('/docs/components/header');
    const rows = page
      .getByRole('region', { name: 'Header parts' })
      .locator('tbody tr');
    await expect(rows.locator('td:nth-child(1)')).toHaveText([
      'ScHeader',
      'ScHeaderToggle',
      'ScHeaderMobileMenuContent',
    ]);
    await expect(rows.locator('td:nth-child(2)')).toHaveText([
      'header[scHeader]',
      'button[scHeaderToggle]',
      'ng-template[scHeaderMobileMenuContent]',
    ]);
  });
});
