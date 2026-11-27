import { expect, test } from '@playwright/test';

/**
 * The dashboard keeps its choices under its own names
 * (`provideSemanticComponents({ storageKeys })`, i18n's `storageKey`, the
 * sidebar's): none shared with another app on the same host — cookies are
 * the host's, whatever the port (the showcase on 4200 read the dashboard's
 * digits).
 */
test('the user’s choices kept under the dashboard’s names, none under the library’s', async ({
  page,
}) => {
  await page.goto('/pages/account-settings');
  // Numbers: Arabic-Indic.
  await page.getByRole('combobox', { name: 'Numbers' }).click();
  await page.getByRole('option', { name: '١٢٣٤٥٦٧٨٩٠' }).click();
  // Clock: 24 hours (the last choice: h23).
  await page.getByRole('combobox', { name: 'Clock' }).click();
  await page.getByRole('option').last().click();
  // Week: Monday.
  await page.getByRole('combobox', { name: 'Week starts on' }).click();
  await page.getByRole('option', { name: 'Monday' }).click();
  // Mode: dark, from the header.
  await page
    .getByRole('button', { name: /theme|mode|appearance/i })
    .first()
    .click();
  await page.getByRole('menuitemradio', { name: /dark/i }).click();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  // The sidebar: closed (its provider's storageKey input).
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Toggle sidebar' }).click();

  await expect
    .poll(async () =>
      (await page.context().cookies()).map((cookie) => cookie.name).sort(),
    )
    .toEqual(
      expect.arrayContaining([
        'dashboard-first-day-of-week',
        'dashboard-hour-cycle',
        'dashboard-mode',
        'dashboard-numbering-system',
        'dashboard-sidebar-state',
      ]),
    );
  const names = (await page.context().cookies()).map((cookie) => cookie.name);
  expect(names.filter((name) => name.startsWith('sc-'))).toEqual([]);
});
