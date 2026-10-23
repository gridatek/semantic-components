import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Basic Navbar Demo', () => {
  test.use({ viewport: { width: 390, height: 700 } });

  test('mobile menu: controls, focus trap, Escape returns focus', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/navbar/basic-navbar-demo');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.focus();
    await press(page, 'Enter');

    const menuId = await page
      .locator('[scNavbarMobileTrigger]')
      .getAttribute('aria-controls');
    const menu = page.locator(`[id="${menuId}"]`);
    await expect(menu).toBeVisible();
    await expect(page.locator('[scNavbarMobileTrigger]')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect
      .poll(() =>
        page.evaluate(
          () => !!document.activeElement?.closest('[scNavbarMobileMenu]'),
        ),
      )
      .toBe(true);

    await press(page, 'Escape');
    await expect(menu).toHaveCount(0);
    await expect(page.locator('[scNavbarMobileTrigger]')).toBeFocused();
    expect(errors).toEqual([]);
  });
});
