import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Linear Stepper Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/stepper/linear-stepper-demo');
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('an invalid step blocks Next and shows its errors', async ({ page }) => {
    const tabs = page.getByRole('tab');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(
      page.locator('[data-slot=stepper-indicator]').first(),
    ).toHaveAttribute('data-state', 'active');
  });

  test('later steps cannot be reached before earlier ones are valid', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    await expect(tabs.nth(2)).toHaveAttribute('aria-disabled', 'true');
    await tabs.first().focus();
    await page.keyboard.press('End');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  });

  test('valid steps advance, complete, and can be revisited', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    const indicators = page.locator('[data-slot=stepper-indicator]');

    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(indicators.first()).toHaveAttribute('data-state', 'complete');

    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('ada@example.com')).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

    await tabs.nth(2).click();
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByRole('status')).toContainText(
      'Account created for Ada Lovelace',
    );
  });
});
