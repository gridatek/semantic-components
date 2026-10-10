import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Select Group Demo', () => {
  test('disabled option looks disabled and cannot be picked', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/select/select-group-demo');
    const trigger = page.locator('[scSelectTrigger]');
    await trigger.click();

    const broccoli = page.getByRole('option', { name: 'Broccoli' });
    await expect(broccoli).toHaveAttribute('aria-disabled', 'true');
    await expect(broccoli).toHaveCSS('opacity', '0.5');
    // pointer-events are off; dispatch directly to check the option itself refuses
    await broccoli.dispatchEvent('click');
    await expect(trigger).not.toContainText('Broccoli');

    await page.getByRole('option', { name: 'Carrot' }).click();
    await expect(trigger).toContainText('Carrot');
    expect(errors).toEqual([]);
  });
});
