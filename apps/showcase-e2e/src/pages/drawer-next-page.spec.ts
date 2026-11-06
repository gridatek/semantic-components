import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Drawer Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/drawer-next');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/drawer-next');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/drawer-next');
    const table = page.getByRole('region', { name: 'Drawer Next parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScDrawerNextProvider',
      'ScDrawerNextTrigger',
      'ScDrawerNextPortal, ScDrawerNext',
      'ScDrawerNextHandle',
      'ScDrawerNextHeader, ScDrawerNextTitle, ScDrawerNextDescription, ScDrawerNextFooter',
      'ScDrawerNextClose',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/drawer-next');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
