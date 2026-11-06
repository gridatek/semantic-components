import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Popover Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/popover-next');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/popover-next');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/popover-next');
    const table = page.getByRole('region', { name: 'Popover Next parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScPopoverNextProvider',
      'ScPopoverNextTrigger',
      'ScPopoverNextPortal, ScPopoverNext',
      'ScPopoverNextHeader, ScPopoverNextTitle, ScPopoverNextDescription',
      'ScPopoverNextClose',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/popover-next');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
