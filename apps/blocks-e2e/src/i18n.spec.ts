import { type Page, expect, test } from '@playwright/test';

// Translated in the browser: the `ssr` build renders the source locale —
// Angular evaluates a template's messages once per process.
test.skip(!!process.env['SSR'], 'i18n is browser-only');

const heading = (page: Page) => page.getByRole('heading', { level: 1 });

/** The locale chosen before: its cookie, which the server reads too. */
async function chooseLocale(page: Page, id: string): Promise<void> {
  await page
    .context()
    .addCookies([
      { name: 'sc-locale', value: id, url: test.info().project.use.baseURL },
    ]);
}

test.describe('i18n: the browser’s language', () => {
  test('English: the source locale', async ({ page }) => {
    await page.goto('/');
    await expect(heading(page)).toHaveText('Build Something Amazing');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test.describe('French', () => {
    test.use({ locale: 'fr-FR' });

    test('detected, from its base', async ({ page }) => {
      await page.goto('/');
      await expect(heading(page)).toHaveText(
        'Créez quelque chose d’extraordinaire',
      );
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
      await expect(page.getByRole('combobox', { name: 'Langue' })).toHaveText(
        'Français',
      );
    });
  });
});

test('i18n: a saved choice — Arabic, right to left', async ({ page }) => {
  await chooseLocale(page, 'ar');
  await page.goto('/');
  await expect(heading(page)).toHaveText('ابنِ شيئًا مذهلًا');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  // The navbar's start is on the right.
  const brand = await page.getByRole('link', { name: 'Brand' }).boundingBox();
  const width = page.viewportSize()?.width ?? 0;
  expect(brand?.x ?? 0).toBeGreaterThan(width / 2);
});

test('i18n: switched from the select; kept after a reload', async ({
  page,
}) => {
  await page.goto('/');
  const language = page.getByRole('combobox', { name: 'Language' });
  await expect(language).toHaveText('English');
  await language.click();
  await page.getByRole('option', { name: 'Français' }).click();
  await expect(heading(page)).toHaveText(
    'Créez quelque chose d’extraordinaire',
  );
  await page.reload();
  await expect(heading(page)).toHaveText(
    'Créez quelque chose d’extraordinaire',
  );
  await expect(page.getByRole('link', { name: 'Tarifs' })).toBeVisible();
});

test('i18n: translations not loaded — English', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await chooseLocale(page, 'fr');
  await page.route('**/i18n/fr.json', (route) =>
    route.fulfill({ status: 404 }),
  );
  await page.goto('/');
  await expect(heading(page)).toHaveText('Build Something Amazing');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(errors.join('\n')).toContain('"fr" could not be loaded');
});

test.describe('i18n: in code and in formats', () => {
  test.use({ locale: 'fr-FR' });

  test('the data table: headers and values', async ({ page }) => {
    await page.goto('/data-table');
    await expect(
      page.getByRole('columnheader', { name: 'Prénom' }),
    ).toBeVisible();
    await expect(page.getByText('Actif').first()).toBeVisible();
  });

  test('the blog: dates in the locale', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByText('15 janv. 2026').first()).toBeVisible();
  });
});
