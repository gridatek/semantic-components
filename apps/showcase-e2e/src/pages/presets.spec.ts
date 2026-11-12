import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Presets Page', () => {
  test('the style card picks a preset, which reloads in it', async ({
    page,
  }) => {
    await page.goto('/presets');
    const style = page.getByRole('button', { name: /Style/ });
    await expect(style).toContainText('nova', { ignoreCase: true });
    // The options still to come are there, not usable yet.
    await expect(
      page.getByRole('button', { name: /Base Color/ }),
    ).toBeDisabled();
    await style.click();
    await expect(
      page.getByRole('menuitemradio', { name: 'Nova' }),
    ).toHaveAttribute('aria-checked', 'true');
    await page.getByRole('menuitemradio', { name: 'Maia' }).click();
    await expect(style).toContainText('maia', { ignoreCase: true });
    await expect(
      page.getByRole('heading', { name: 'Contribution History' }),
    ).toBeVisible();
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    await page.goto('/presets');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
