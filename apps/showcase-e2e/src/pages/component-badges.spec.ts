import { expect, test } from '../test';

test.describe('Component badges', () => {
  test('Sera: the category and the status side by side, centred alike', async ({
    page,
    baseURL,
  }) => {
    // Sera's badge is small text with no box: a badge left on the line's
    // baseline shows below the one centred in the row.
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: 'sera',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto('/docs/components/dialog');
    const row = page.locator('app-component-badges');
    const centre = (badge: string) =>
      row.getByText(badge, { exact: true }).evaluate((el) => {
        const box = el.getBoundingClientRect();
        return box.top + box.height / 2;
      });
    await expect(row.getByText('Experimental', { exact: true })).toBeVisible();
    expect(await centre('Experimental')).toBeCloseTo(
      await centre('Feedback'),
      0,
    );
  });
});
