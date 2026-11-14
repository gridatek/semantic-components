import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Charts Page', () => {
  test('every chart type, each example at work; the types bar jumps to one', async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      if (m.type() === 'warning' || m.type() === 'error')
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/charts');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Charts');
    // Each type's section, its examples as charts with their code.
    await expect(page.getByRole('heading', { level: 2 })).toHaveCount(12);
    await expect(page.locator('[data-slot=chart]')).toHaveCount(36);
    await expect(
      page.getByRole('link', { name: 'Docs' }).first(),
    ).toHaveAttribute('href', '/docs/components/area-chart');

    // A type's link: to its section, below the header and the types bar.
    const types = page.getByRole('navigation', { name: 'Chart types' });
    await types.getByRole('link', { name: 'Pie' }).click();
    await expect(page).toHaveURL(/\/charts#pie-chart$/);
    const title = page.getByRole('heading', { name: 'Pie Charts' });
    await expect
      .poll(async () => {
        const bar = await types.boundingBox();
        const heading = await title.boundingBox();
        return !!bar && !!heading && heading.y >= bar.y + bar.height;
      })
      .toBe(true);
    await expect(title).toBeInViewport();
    expect(messages).toEqual([]);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    test.slow();
    await page.goto('/charts');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
