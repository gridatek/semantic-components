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
  const input = page.getByRole('searchbox', { name: 'Search' }).first();
  const closers = {
    'close button': () =>
      page.getByRole('button', { name: 'Close search' }).first().click(),
    Escape: () => input.press('Escape'),
  };
  for (const [name, close] of Object.entries(closers)) {
    await trigger.click();
    await input.fill('the');
    await input.press('Enter');
    // Settled: the match scrolled to, the bar open.
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(400);
    const before = await page.evaluate(() => scrollY);
    await close();
    await expect(input).toBeHidden();
    expect(await page.evaluate(() => scrollY), name).toBe(before);
  }
});
