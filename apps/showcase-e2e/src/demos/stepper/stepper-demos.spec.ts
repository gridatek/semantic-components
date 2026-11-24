import { collectErrors, press } from '../../interaction';
import { expectNoHorizontalScroll } from '../../mobile';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/stepper/${name}-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('stepper-usage'));
    await expect(page.getByRole('tab')).toHaveCount(3);
  });

  test('a named tablist; each tab named by its title, linked to its panel', async ({
    page,
  }) => {
    await expect(
      page.getByRole('tablist', { name: 'Sign-up steps' }),
    ).toBeVisible();
    const first = page.getByRole('tab', { name: /Account/ });
    await expect(first).toHaveAttribute('aria-selected', 'true');
    await expect(first).toHaveAttribute('aria-posinset', '1');
    await expect(first).toHaveAttribute('aria-setsize', '3');
    const panel = page.getByRole('tabpanel');
    await expect(panel).toHaveCount(1);
    await expect(panel).toHaveAccessibleName(/Account/);
    await expect(panel).toContainText('Step 1');
    await expect(first).toHaveAttribute(
      'aria-controls',
      (await panel.getAttribute('id')) as string,
    );
  });

  test('one Tab stop; ← → Home End move, and the step shown follows', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1');
    await tabs.first().focus();
    await expect(tabs.first()).toBeFocused();
    await press(page, 'ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await press(page, 'End');
    await expect(tabs.nth(2)).toBeFocused();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await press(page, 'Home');
    await expect(tabs.first()).toBeFocused();
    await expect(page.getByRole('tabpanel')).toContainText('Step 1');
  });

  test('Continue and Back; a step left is complete, its connector filled', async ({
    page,
  }) => {
    const items = page.locator('[scStepperItem]');
    const back = page.getByRole('button', { name: 'Back' });
    await expect(back).toBeDisabled();
    await expect(items.first()).toHaveAttribute('data-current', '');
    await expect(items.nth(1)).toHaveAttribute('data-upcoming', '');

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(items.first()).toHaveAttribute('data-complete', '');
    await expect(items.nth(1)).toHaveAttribute('data-current', '');
    await expect(page.getByRole('tabpanel')).toContainText('Step 2');
    // A check in the done step's indicator; its line in the primary colour.
    await expect(items.first().locator('svg')).toBeVisible();
    await expect(items.first().locator('[scStepperConnector]')).toHaveClass(
      /\bbg-primary\b/,
    );
    await expect(items.nth(1).locator('[scStepperConnector]')).not.toHaveClass(
      /\bbg-primary\b/,
    );
    // None after the last step.
    await expect(items.last().locator('[scStepperConnector]')).toBeHidden();

    await back.click();
    await expect(items.first()).toHaveAttribute('data-current', '');
  });
});

test('Numbers only: the titles hidden, still naming the tabs', async ({
  page,
}) => {
  await page.goto(demo('numbers-stepper'));
  await expect(page.getByRole('tab')).toHaveCount(4);
  await expect(page.getByRole('tab', { name: /Payment/ })).toBeVisible();
  await expect(page.locator('[scStepperTitle]').first()).toHaveClass(
    /\bsr-only\b/,
  );
});

test('Vertical: ↓ and ↑ move; the connector runs down under the indicator', async ({
  page,
}) => {
  await page.goto(demo('vertical-stepper'));
  const tabs = page.getByRole('tab');
  await expect(page.getByRole('tablist')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  await tabs.first().focus();
  await expect(tabs.first()).toBeFocused();
  await press(page, 'ArrowDown');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await press(page, 'ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await press(page, 'ArrowUp');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');

  // Taller than wide, centred under the first indicator.
  const connector = page.locator('[scStepperConnector]').first();
  const indicator = page.locator('[scStepperIndicator]').first();
  await expect
    .poll(async () => {
      const [c, i] = [
        await connector.boundingBox(),
        await indicator.boundingBox(),
      ];
      return (
        c!.height > c!.width &&
        Math.abs(c!.x + c!.width / 2 - (i!.x + i!.width / 2)) <= 1
      );
    })
    .toBe(true);
});

test.describe('Linear, with a form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('linear-stepper'));
    await expect(page.getByRole('tab')).toHaveCount(3);
  });

  test('an invalid step refuses Next and shows its errors', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Email is required')).toBeVisible();
    // Still the current step (failed shows once another step is shown).
    await expect(page.locator('[scStepperItem]').first()).toHaveAttribute(
      'data-current',
      '',
    );
  });

  test('later steps can’t be reached before the earlier are valid', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    await expect(tabs.nth(2)).toHaveAttribute('aria-disabled', 'true');
    await tabs.first().focus();
    await expect(tabs.first()).toBeFocused();
    await press(page, 'End');
    // Focus moves; the step shown doesn't.
    await expect(tabs.nth(2)).toBeFocused();
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    // A click on it (aria-disabled: sent as is) changes nothing.
    await tabs.nth(2).dispatchEvent('click');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  });

  test('valid steps go on, complete, and can be gone back to; a step left invalid is failed', async ({
    page,
  }) => {
    const tabs = page.getByRole('tab');
    const items = page.locator('[scStepperItem]');

    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(items.first()).toHaveAttribute('data-complete', '');

    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('ada@example.com')).toBeVisible();

    // Back to the profile, its name emptied, then back again: left invalid, it is failed.
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.getByLabel('Full name').fill('');
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(items.nth(1)).toHaveAttribute('data-failed', '');
    await expect(tabs.nth(2)).toHaveAttribute('aria-disabled', 'true');

    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByLabel('Full name').fill('Ada Lovelace');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await page.getByRole('button', { name: 'Create account' }).click();
    await expect(page.getByRole('status')).toContainText(
      'Account created for Ada Lovelace',
    );
  });
});

test('RTL: the steps from the right; ← goes on to the next', async ({
  page,
}) => {
  await page.goto(demo('rtl-stepper'));
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  const [a, b] = [
    await tabs.first().boundingBox(),
    await tabs.nth(1).boundingBox(),
  ];
  expect(a!.x).toBeGreaterThan(b!.x);
  await tabs.first().focus();
  await expect(tabs.first()).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('On a phone: the steps fit, the descriptions read only by screen readers @mobile', async ({
  page,
}) => {
  await page.goto(demo('stepper-usage'));
  await expect(page.getByRole('tab')).toHaveCount(3);
  await expectNoHorizontalScroll(page);
  // Out of sight, still in the tab's name.
  await expect(page.locator('[scStepperDescription]').first()).toHaveCSS(
    'position',
    'absolute',
  );
  await expect(page.getByRole('tab').first()).toHaveAccessibleName(
    /Your email and password/,
  );
});
