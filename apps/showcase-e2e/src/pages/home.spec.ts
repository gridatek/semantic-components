import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Home Page', () => {
  test('the heading and two ways in, then the components at work', async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'warning' || m.type() === 'error')
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Get Started' }).last(),
    ).toHaveAttribute('href', '/docs/getting-started');
    await expect(
      page.getByRole('link', { name: 'View Components' }),
    ).toHaveAttribute('href', '/docs/components');
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
