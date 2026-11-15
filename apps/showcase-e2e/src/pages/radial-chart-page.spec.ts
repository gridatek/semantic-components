import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Radial Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/radial-chart');
    await expectNoA11yViolations(page);
  });

  test('Usage, anatomy, accessibility; the API reference: its inputs', async ({
    page,
  }) => {
    await page.goto('/docs/components/radial-chart');
    for (const name of ['Usage', 'Anatomy', 'Accessibility', 'API reference'])
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    const inputs = page
      .getByRole('region', { name: 'ScChartRadialBar inputs' })
      .locator('tbody tr td:first-child');
    await expect(inputs.first()).toHaveText('key');
    await expect(inputs.last()).toHaveText('class');
  });

  test("Nova: every radial on the page has the style's rounded ends", async ({
    page,
    baseURL,
  }) => {
    // Charts drawn before they're in the page (the examples) too: their
    // corners measured once laid out.
    await page.context().addCookies([
      {
        name: 'sc-preset',
        value: 'nova',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto('/docs/components/radial-chart');
    const charts = page.locator(
      '[data-slot=chart]:has([data-slot=chart-radial-bar])',
    );
    await expect(charts).toHaveCount(5);
    // Each enters once seen: scrolled to, as a reader would.
    for (const chart of await charts.all())
      await chart.scrollIntoViewIfNeeded();
    // Each chart's second bar (the first is a whole ring): more than its two
    // edges' arcs — a small one at each rounded corner.
    await expect
      .poll(() =>
        charts.evaluateAll((all) =>
          all.map(
            (chart) =>
              (
                chart
                  .querySelectorAll(
                    '[data-slot=chart-radial-bar] path:not(.fill-muted)',
                  )[1]
                  ?.getAttribute('d') ?? ''
              ).split('A').length - 1,
          ),
        ),
      )
      .toEqual([6, 6, 6, 6, 6]);
  });
});
