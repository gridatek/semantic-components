import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Timeline Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/timeline-next');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Status',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/timeline-next');
    await expect(
      page
        .getByRole('region', { name: 'Timeline Next parts' })
        .getByRole('row'),
    ).toHaveCount(8);
    await expect(
      page.getByRole('region', { name: 'ScTimelineNextItem inputs' }),
    ).toContainText('status');
  });
});
