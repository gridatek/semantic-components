import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Avatar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/avatar');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/avatar');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector; a Loading section', async ({
    page,
  }) => {
    await page.goto('/docs/components/avatar');
    const parts = page.getByRole('region', { name: 'Avatar parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScAvatar',
      'ScAvatarImage',
      'ScAvatarFallback',
      'ScAvatarBadge',
      'ScAvatarGroup',
      'ScAvatarGroupCount',
    ]);
    await expect(page.getByRole('heading', { name: 'Loading' })).toBeVisible();
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto('/docs/components/avatar');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
