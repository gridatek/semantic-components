import { expect, test } from '@playwright/test';
import { expectLooksDisabled } from '../../interaction';

test.describe('Disabled Link Demo', () => {
  test('a disabled link looks disabled and is out of the tab order', async ({
    page,
  }) => {
    await page.goto('/demos/link/disabled-link-demo');
    const links = page.locator('a[scLink]');
    await expect(links).toHaveCount(3);
    for (const link of await links.all()) {
      await expectLooksDisabled(link);
      await expect(link).toHaveAttribute('tabindex', '-1');
    }
  });
});
