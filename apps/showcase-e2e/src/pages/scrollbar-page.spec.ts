import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Scrollbar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/guides/scrollbar');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/guides/scrollbar');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every variable and class', async ({ page }) => {
    await page.goto('/docs/guides/scrollbar');
    const first = (name: string) =>
      page
        .getByRole('region', { name })
        .getByRole('row')
        .locator('td:first-child');
    await expect(first('Scrollbar variables')).toHaveText([
      '--sc-scrollbar-size',
      '--sc-scrollbar-inset',
      '--sc-scrollbar-thumb',
      '--sc-scrollbar-track',
      '--sc-scrollbar-radius',
    ]);
    // The thumb's default: the theme's muted-foreground (3:1, WCAG 1.4.11).
    await expect(
      page
        .getByRole('region', { name: 'Scrollbar variables' })
        .getByRole('row', { name: /--sc-scrollbar-thumb/ }),
    ).toContainText('var(--color-muted-foreground)');
    // The track's: Base UI's, the foreground at 12%.
    await expect(
      page
        .getByRole('region', { name: 'Scrollbar variables' })
        .getByRole('row', { name: /--sc-scrollbar-track/ }),
    ).toContainText('var(--color-foreground) 12%');
    await expect(first('Scrollbar classes')).toHaveText([
      'no-scrollbar, scrollbar-none',
      'scrollbar-gutter-stable',
      'scrollbar-thin, scrollbar-thumb-*',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/guides/scrollbar');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
