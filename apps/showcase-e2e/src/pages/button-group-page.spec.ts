import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Button Group Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/button-group');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/button-group');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: each part, its inputs', async ({ page }) => {
    await page.goto('/docs/components/button-group');
    await expect(
      page.getByRole('heading', { name: 'API reference' }),
    ).toBeVisible();
    for (const [part, inputs] of [
      ['ScButtonGroup', ['orientation', 'class']],
      ['ScButtonGroupText', ['class']],
      ['ScButtonGroupSeparator', ['orientation', 'class']],
    ] as const) {
      const table = page.getByRole('region', { name: `${part} inputs` });
      await expect(table.getByRole('row').locator('td:first-child')).toHaveText(
        [...inputs],
      );
    }
    await expect(
      page
        .getByRole('region', { name: 'ScButtonGroupSeparator inputs' })
        .getByRole('row', { name: /^orientation/ })
        .locator('td')
        .nth(2),
    ).toHaveText("'vertical'");
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/button-group');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
