import {
  activeDescendantText,
  collectErrors,
  focus,
  press,
  type,
} from '../../interaction';
import { expect, test } from '../../test';

test.describe('Select Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/select/select-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('trigger is the only tab stop and a combobox', async ({ page }) => {
    const trigger = page.locator('[scSelectTrigger]');
    await expect(trigger).toHaveAttribute('role', 'combobox');
    await expect(trigger).toContainText('Select a category');
    await expect(page.locator('input')).toHaveCount(0);

    // A button after the demo: Tab goes from the trigger straight to it
    // (headless Firefox keeps focus on the page's last element otherwise).
    await page.evaluate(() => {
      const after = document.createElement('button');
      after.textContent = 'After';
      document.body.append(after);
    });
    await press(page, 'Tab');
    await expect(trigger).toBeFocused();
    await press(page, 'Tab');
    await expect(page.getByRole('button', { name: 'After' })).toBeFocused();
  });

  test('keyboard: open, move, select, close', async ({ page }) => {
    const trigger = page.locator('[scSelectTrigger]');
    const listbox = page.getByRole('listbox');
    await focus(trigger);

    await press(page, 'ArrowDown');
    await expect(listbox).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await press(page, 'ArrowDown');
    await expect.poll(() => activeDescendantText(trigger)).toBe('Starred');
    await expect(trigger).toBeFocused();

    await press(page, 'Enter');
    await expect(listbox).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toContainText('Starred');
    await expect(page.getByText('Selected value: starred')).toBeVisible();
  });

  test('mouse: pick, re-pick keeps the value, Escape closes', async ({
    page,
  }) => {
    const trigger = page.locator('[scSelectTrigger]');
    const listbox = page.getByRole('listbox');

    await trigger.click();
    await page.getByRole('option', { name: 'Personal' }).click();
    await expect(listbox).toHaveCount(0);
    await expect(page.getByText('Selected value: personal')).toBeVisible();

    await trigger.click();
    const personal = page.getByRole('option', { name: 'Personal' });
    await expect(personal).toHaveAttribute('aria-selected', 'true');
    await personal.click();
    await expect(listbox).toHaveCount(0);
    await expect(page.getByText('Selected value: personal')).toBeVisible();

    await press(page, 'ArrowDown');
    await expect(listbox).toBeVisible();
    await press(page, 'Escape');
    await expect(listbox).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('type-ahead moves to the matching option', async ({ page }) => {
    const trigger = page.locator('[scSelectTrigger]');
    await focus(trigger);
    await press(page, 'Enter');
    await expect(page.getByRole('option').first()).toBeVisible();
    await type(page, 'tr');
    await expect.poll(() => activeDescendantText(trigger)).toBe('Travel');
    await press(page, 'Enter');
    await expect(page.getByText('Selected value: travel')).toBeVisible();
  });

  test('type-ahead on a closed select opens it at the first match', async ({
    page,
  }) => {
    const trigger = page.locator('[scSelectTrigger]');
    await focus(trigger);
    await press(page, 'w');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(() => activeDescendantText(trigger)).toBe('Work');
    await press(page, 'Enter');
    await expect(page.getByText('Selected value: work')).toBeVisible();
  });

  test('the highlight follows the pointer; keys continue from it', async ({
    page,
  }) => {
    const trigger = page.locator('[scSelectTrigger]');
    await trigger.click();
    const work = page.getByRole('option', { name: 'Work' });
    await work.hover();
    await expect(work).toHaveAttribute('data-active', 'true');
    await expect(page.locator('[role=option][data-active=true]')).toHaveCount(
      1,
    );
    await press(page, 'ArrowDown');
    await expect.poll(() => activeDescendantText(trigger)).toBe('Personal');
    await expect(page.getByText('Selected value: work')).toHaveCount(0);
  });
});
