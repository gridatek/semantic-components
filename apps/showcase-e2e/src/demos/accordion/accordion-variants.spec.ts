import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Multiple Accordion Demo', () => {
  test('several items can be open; panels are labelled regions', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/accordion/multiple-accordion-demo');
    const triggers = page.locator('[aria-expanded]');
    await expect(triggers.first()).toBeVisible();
    for (const t of await triggers.all()) {
      if ((await t.getAttribute('aria-expanded')) === 'false') await t.click();
    }
    await expect(page.locator('[aria-expanded=true]')).toHaveCount(
      await triggers.count(),
    );

    const first = triggers.first();
    const panel = page.locator(
      `[id="${await first.getAttribute('aria-controls')}"]`,
    );
    await expect(panel).toHaveAttribute('role', 'region');
    await expect(panel).toHaveAttribute(
      'aria-labelledby',
      (await first.getAttribute('id')) as string,
    );
    expect(errors).toEqual([]);
  });
});

test.describe('Disabled Accordion Demo', () => {
  test('disabled item cannot be toggled', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/accordion/disabled-accordion-demo');
    const disabled = page.locator('[aria-expanded][aria-disabled=true]');
    await expect(disabled).toHaveCount(1);
    await disabled.focus();
    await press(page, 'Enter');
    await expect(disabled).toHaveAttribute('aria-expanded', 'false');
    expect(errors).toEqual([]);
  });
});
