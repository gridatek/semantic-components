import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Typeset Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/typeset');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/typeset');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: the directive, every variable and class', async ({
    page,
  }) => {
    await page.goto('/docs/components/typeset');
    const first = (name: string) =>
      page
        .getByRole('region', { name })
        .getByRole('row')
        .locator('td:first-child');
    await expect(first('Typeset directive')).toHaveText(['ScTypeset']);
    await expect(first('Typeset variables')).toHaveText([
      '--typeset-size',
      '--typeset-leading',
      '--typeset-flow',
      '--typeset-font-body',
      '--typeset-font-heading',
      '--typeset-font-mono',
      '--typeset-radius',
      '--typeset-radius-inline',
      '--typeset-heading-weight',
      '--typeset-heading-tracking',
      '--typeset-heading-case',
    ]);
    await expect(first('Typeset classes')).toHaveText([
      'typeset',
      'not-typeset',
      'typeset-scroll',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/typeset');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
