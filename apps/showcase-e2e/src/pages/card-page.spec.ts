import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Card Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/card');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/card');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector', async ({ page }) => {
    await page.goto('/docs/components/card');
    const parts = page.getByRole('region', { name: 'Card parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScCard',
      'ScCardHeader',
      'ScCardTitle',
      'ScCardDescription',
      'ScCardAction',
      'ScCardContent',
      'ScCardFooter',
    ]);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/card');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
