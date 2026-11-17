import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Scrollbars Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scrollbars');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/scrollbars');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every variable and class', async ({ page }) => {
    await page.goto('/docs/components/scrollbars');
    const first = (name: string) =>
      page
        .getByRole('region', { name })
        .getByRole('row')
        .locator('td:first-child');
    await expect(first('Scrollbars variables')).toHaveText([
      '--sc-scrollbar-size',
      '--sc-scrollbar-inset',
      '--sc-scrollbar-thumb',
      '--sc-scrollbar-track',
      '--sc-scrollbar-radius',
    ]);
    await expect(first('Scrollbars classes')).toHaveText([
      'no-scrollbar, scrollbar-none',
      'scrollbar-gutter-stable',
      'scrollbar-thin, scrollbar-thumb-*',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/scrollbars');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
