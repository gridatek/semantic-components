import { expect, test } from '../test';

/**
 * The previous and next pages at the foot of a docs page: on a phone, two
 * long names don't fit side by side — the next one goes under, at the end,
 * in the column.
 */
test('Page nav, on a phone: Internationalization and Server-side rendering inside the column, the next one under', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/docs/guides/rtl');
  const nav = page.getByRole('navigation', { name: 'Previous and next page' });
  await expect(nav).toBeVisible();
  const n = await nav.boundingBox();
  for (const link of await nav.getByRole('link').all()) {
    const box = await link.boundingBox();
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
      (n?.x ?? 0) + (n?.width ?? 0) + 0.5,
    );
  }
});

/**
 * A component's own entry point (Treemap's): its install command scrolls in
 * its code block, never widening the column — monospace text a third wider,
 * as on Linux and Android, where it ran past a 360px screen.
 */
test('Entry install, on a phone with wider type: the command scrolls in its block, the column holds', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/docs/charts/treemap-chart');
  const install = page.locator('app-entry-install');
  await expect(install.locator('pre').first()).toBeVisible();
  await page.addStyleTag({
    content: 'main code, main pre { letter-spacing: 0.15em; }',
  });
  const column = await page
    .locator('main h1')
    .locator('xpath=..')
    .boundingBox();
  await expect
    .poll(async () => {
      // The block itself (the grid around it stays put; its column grew).
      const box = await install
        .locator('app-package-manager-install')
        .boundingBox();
      return (box?.x ?? 0) + (box?.width ?? 0);
    })
    .toBeLessThanOrEqual((column?.x ?? 0) + (column?.width ?? 0) + 0.5);
});
