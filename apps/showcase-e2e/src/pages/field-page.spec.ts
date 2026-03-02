import { test, expect } from '../axe-fixture';

test.describe('Field Page Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/field');
  });

  test('should have no accessibility violations', async ({
    makeAxeBuilder,
  }) => {
    const results = await makeAxeBuilder()
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
