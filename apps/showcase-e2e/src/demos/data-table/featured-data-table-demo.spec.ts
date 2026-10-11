import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Featured Data Table Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/data-table/featured-data-table-demo');
    await expect(page.locator('tbody tr').first()).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('headers are labelled and sort the rows', async ({ page }) => {
    const name = page.getByRole('columnheader', { name: 'Name' });
    await expect(name).toHaveAttribute('aria-sort', 'none');
    await name.getByRole('button').click();
    await expect(name).toHaveAttribute('aria-sort', 'ascending');
    await expect(page.locator('tbody tr').first()).toContainText('Alice Brown');
    await name.getByRole('button').click();
    await expect(name).toHaveAttribute('aria-sort', 'descending');
    await expect(page.locator('tbody tr').first()).toContainText(
      'Julia Anderson',
    );
  });

  test('search filters rows and resets the page', async ({ page }) => {
    await expect(page.locator('tbody tr')).toHaveCount(5);
    await page.getByPlaceholder('Search all columns...').fill('admin');
    await expect(page.locator('tbody tr')).toHaveCount(3);
    await expect(page.getByText('Page 1 of 1')).toBeVisible();
  });

  test('pagination pages through filtered, sorted data', async ({ page }) => {
    await expect(page.getByText('Page 1 of 3')).toBeVisible();
    await page.getByRole('button', { name: 'Next page' }).click();
    await expect(page.getByText('Page 2 of 3')).toBeVisible();
    await expect(page.locator('tbody tr').first()).toContainText(
      'Diana Miller',
    );
    await page.getByLabel('Rows per page').selectOption('10');
    await expect(page.getByText('Page 1 of 2')).toBeVisible();
    await expect(page.locator('tbody tr')).toHaveCount(10);
  });

  test('selection survives sorting', async ({ page }) => {
    await page.getByLabel('Select John Doe').check();
    await page
      .getByRole('columnheader', { name: 'Name' })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Next page' }).click();
    await page.getByRole('button', { name: 'Next page' }).click();
    await expect(page.getByLabel('Select John Doe')).toBeChecked();
    await expect(page.getByText('1 of 12 row(s) selected.')).toBeVisible();
  });

  test('columns disclosure hides a column; Escape returns focus', async ({
    page,
  }) => {
    const toggle = page.getByRole('button', { name: 'Columns' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page
      .getByRole('group', { name: 'Toggle columns' })
      .getByLabel('Email')
      .uncheck();
    await expect(
      page.getByRole('columnheader', { name: 'Email' }),
    ).toBeHidden();
    await expect(page.getByText('john@example.com')).toBeHidden();
    await press(page, 'Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});
