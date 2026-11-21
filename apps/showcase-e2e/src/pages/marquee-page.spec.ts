import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Marquee Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/marquee');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'How it moves',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/marquee');
    await expect(
      page.getByRole('region', { name: 'Marquee parts' }).getByRole('row'),
    ).toHaveCount(4);
    await expect(
      page.getByRole('region', { name: 'ScMarquee inputs' }),
    ).toContainText('direction');
  });
});
