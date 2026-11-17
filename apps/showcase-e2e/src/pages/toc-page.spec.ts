import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

const url = '/docs/components/toc';

test.describe('Table of Contents Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto(url);
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto(url);
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part with its selector', async ({ page }) => {
    await page.goto(url);
    const parts = page.getByRole('region', { name: 'Table of contents parts' });
    await expect(parts.getByRole('row').locator('td:first-child')).toHaveText([
      'ScToc',
      'ScTocList',
      'ScTocLink',
      'ScTocHeading',
      'ScTocScope',
    ]);
  });

  test('each demo lists its own headings; ids unique on the page', async ({
    page,
  }) => {
    await page.goto(url);
    // Levels and RTL both have an "npm" heading: the second one's id differs.
    const npm = page.getByRole('heading', { name: 'npm', exact: true });
    await expect(npm).toHaveCount(2);
    await expect(npm.nth(0)).toHaveAttribute('id', 'npm');
    await expect(npm.nth(1)).toHaveAttribute('id', 'npm-2');
    // A scope's list: its headings only, not the page's.
    await expect(
      page
        .getByRole('navigation', { name: 'Article contents' })
        .getByRole('link'),
    ).toHaveCount(5);
  });

  test('the page fits a phone @mobile', async ({ page }) => {
    await page.goto(url);
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
