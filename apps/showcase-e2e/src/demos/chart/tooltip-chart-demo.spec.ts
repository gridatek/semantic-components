import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test('Tooltip: its indicator, as chosen; a legend', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/demos/chart/tooltip-chart-demo');
  const tooltip = page.locator('[data-slot=chart-tooltip]');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText(
    'Mobile',
  );

  await page.locator('[data-slot=chart-plot]').focus();
  // A dot: square.
  const mark = tooltip.locator('[aria-hidden=true]').first();
  await expect(mark).toHaveCSS('width', '10px');
  await page.getByRole('button', { name: 'Line', exact: true }).click();
  await page.locator('[data-slot=chart-plot]').focus();
  // A line: narrow, as tall as its row.
  await expect(mark).toHaveCSS('width', '4px');
  expect(errors).toEqual([]);
});
