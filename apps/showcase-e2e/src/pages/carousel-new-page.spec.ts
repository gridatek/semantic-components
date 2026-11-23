import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Carousel New Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/carousel-new');
    await expect(page.locator('h2')).toHaveText([
      'Installation',
      'Usage',
      'Anatomy',
      'Pages',
      'Autoplay',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
