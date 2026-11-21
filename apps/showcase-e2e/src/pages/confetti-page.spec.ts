import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Confetti Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/confetti');
    await expect(page.locator('h2')).toHaveText([
      'Installation',
      'Usage',
      'Anatomy',
      'Effects and colours',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: the trigger, the service and the options', async ({
    page,
  }) => {
    await page.goto('/docs/components/confetti');
    await expect(
      page.getByRole('region', { name: 'Confetti parts' }).getByRole('row'),
    ).toHaveCount(3);
    await expect(
      page.getByRole('region', { name: 'ScConfettiTrigger inputs' }),
    ).toContainText('confettiEffect');
    await expect(
      page.getByRole('region', { name: 'Confetti options' }),
    ).toContainText('duration');
  });
});
