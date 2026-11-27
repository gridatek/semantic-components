import { expect, test } from '@playwright/test';

/** A language chosen in one tab: the user's other tabs reload in it (`ScI18n`). */
test('a language chosen in one tab: the other tabs reload in it', async ({
  page,
  baseURL,
}) => {
  await page
    .context()
    .addCookies([
      { name: 'dashboard-locale', value: 'en', url: baseURL ?? '' },
    ]);
  const other = await page.context().newPage();
  await page.goto('/');
  await other.goto('/');
  await expect(other.locator('html')).toHaveAttribute('lang', 'en');

  await page.getByRole('combobox', { name: 'Language' }).click();
  await page.getByRole('option', { name: 'Français' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(other.locator('html')).toHaveAttribute('lang', 'fr', {
    timeout: 15_000,
  });
});
