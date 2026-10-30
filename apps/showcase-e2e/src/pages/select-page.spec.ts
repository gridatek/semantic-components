import { expectNoA11yViolations } from '../axe';
import { expectNoHorizontalScroll } from '../mobile';
import { expect, test } from '../test';

test.describe('Select Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/select');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    await page.goto('/docs/components/select');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: each part, its inputs', async ({ page }) => {
    await page.goto('/docs/components/select');
    for (const [part, inputs] of [
      ['ScSelect', ['value', 'items', 'disabled', 'class']],
      ['ScSelectTrigger', ['size', 'class']],
      ['ScSelectValue', ['placeholder', 'class']],
      ['ScSelectPopup', ['alignItemWithTrigger', 'class']],
      ['ScSelectItem', ['value', 'label', 'disabled', 'class']],
    ] as const) {
      const table = page.getByRole('region', { name: `${part} inputs` });
      await expect(table.getByRole('row').locator('td:first-child')).toHaveText(
        [...inputs],
      );
    }
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/select');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
