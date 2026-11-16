import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Editor Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/editor');
    await expectNoA11yViolations(page);
  });
});

test('Search, on the long page: its close button and Escape go back to the text without scrolling the page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/docs/components/editor');
  const trigger = page
    .getByRole('button', { name: 'Search and replace' })
    .first();
  await trigger.scrollIntoViewIfNeeded();
  for (const close of ['button', 'Escape'] as const) {
    await trigger.click();
    const input = page.getByRole('searchbox', { name: 'Search' }).first();
    await input.fill('the');
    await input.press('Enter');
    // Settled: the match scrolled to, the bar open.
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(400);
    const before = await page.evaluate(() => scrollY);
    if (close === 'button')
      await page.getByRole('button', { name: 'Close search' }).first().click();
    else await input.press('Escape');
    await expect(input).toBeHidden();
    expect(await page.evaluate(() => scrollY), close).toBe(before);
  }
});
