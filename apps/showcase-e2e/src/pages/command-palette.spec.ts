import { expect, test } from '../test';

test.describe('Command palette', () => {
  test('the sidebar’s every page, each to the same place', async ({ page }) => {
    await page.goto('/docs/overview/introduction');
    const nav = page.getByRole('navigation', { name: 'Documentation' });
    // The lists arrive with components.json.
    await expect.poll(() => nav.locator('a[href]').count()).toBeGreaterThan(50);
    // The sidebar's links, closed groups too (hidden until found).
    const sidebar = await nav
      .locator('a[href]')
      .evaluateAll((links) =>
        links.map(
          (a) =>
            `${a.textContent?.trim()} → ${new URL((a as HTMLAnchorElement).href).pathname}`,
        ),
      );

    await page.getByRole('button', { name: /Search/ }).click();
    const results = page.getByRole('listbox', { name: 'Results' });
    await expect(results).toBeVisible();
    const palette = await results
      .locator('a[href]')
      .evaluateAll((links) =>
        links.map(
          (a) =>
            `${a.textContent?.trim()} → ${new URL((a as HTMLAnchorElement).href).pathname}`,
        ),
      );
    expect(palette).toEqual(sidebar);
  });
});
