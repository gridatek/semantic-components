import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Timeline Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/timeline');
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
    await page.goto('/docs/components/timeline');
    await expect(
      page.getByRole('region', { name: 'Timeline parts' }).getByRole('row'),
    ).toHaveCount(9);
    await expect(
      page.getByRole('region', { name: 'ScTimelineItem inputs' }),
    ).toContainText('status');
  });
});
