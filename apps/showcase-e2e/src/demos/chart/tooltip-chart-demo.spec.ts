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

test('Tooltip: announced, never shown twice — the live region hidden', async ({
  page,
}) => {
  await page.goto('/demos/chart/tooltip-chart-demo');
  await page.locator('[data-slot=chart-plot]').focus();
  // The CDK's announcer writes the tooltip there: for screen readers only.
  const region = page.locator('.cdk-live-announcer-element');
  await expect(region).toContainText('January');
  await expect(region).toHaveCSS('position', 'absolute');
  await expect(region).toHaveCSS('width', '1px');
});

test('Tooltip: one indicator always chosen — the pressed one stays pressed', async ({
  page,
}) => {
  await page.goto('/demos/chart/tooltip-chart-demo');
  const dashed = page.getByRole('button', { name: 'Dashed', exact: true });
  await dashed.click();
  await expect(dashed).toHaveAttribute('aria-pressed', 'true');
  // Clicked again: still the choice, not none. Read once the page has
  // drawn the click (true is already there before it).
  await dashed.click();
  await page.evaluate(
    () =>
      new Promise((done) =>
        requestAnimationFrame(() => requestAnimationFrame(done)),
      ),
  );
  await expect(dashed).toHaveAttribute('aria-pressed', 'true');
});
