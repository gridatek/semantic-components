import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Progress Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/progress');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/progress');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/progress');
    const table = page.getByRole('region', { name: 'Progress parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScProgress',
      'ScProgressLabel, ScProgressValueText',
      'ScProgressTrack, ScProgressRange',
      'ScProgressCircle',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/progress');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
