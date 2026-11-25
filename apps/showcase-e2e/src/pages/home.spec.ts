import { expectNoA11yViolations } from '../axe';
import { fromOtherSite } from '../interaction';
import { expect, test } from '../test';

test.describe('Home Page', () => {
  test('the heading and two ways in, then the components at work', async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      // Another site's resource isn't ours: GitHub's API refuses a burst of
      // requests (403) in CI, and the navbar asks it for the stars.
      if (
        (m.type() === 'warning' || m.type() === 'error') &&
        !fromOtherSite(m, page)
      )
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Get Started' }).last(),
    ).toHaveAttribute('href', '/docs/overview/get-started');
    await expect(
      page.getByRole('link', { name: 'View Components' }),
    ).toHaveAttribute('href', '/components');
    // The cards: parts working, not pictures of them.
    await expect(
      page.getByRole('heading', { name: 'Savings Targets' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Alert Dialog' }).click();
    await expect(page.getByRole('alertdialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
    expect(messages).toEqual([]);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    await page.goto('/');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
