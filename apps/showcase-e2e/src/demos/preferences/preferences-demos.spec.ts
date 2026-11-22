import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/preferences/${name}-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test('the choice on the element, and kept after a reload', async ({
    page,
  }) => {
    await page.goto(demo('preferences-usage'));
    const applied = page.locator('[data-slot=preferences]');
    await expect(applied).toHaveAttribute('data-view', 'list');
    await page.getByRole('radio', { name: 'Grid' }).click();
    await expect(applied).toHaveAttribute('data-view', 'grid');
    await page.reload();
    await expect(page.locator('[data-slot=preferences]')).toHaveAttribute(
      'data-view',
      'grid',
    );
    await expect(page.getByRole('radio', { name: 'Grid' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  test('a saved value not in its list: the default', async ({
    page,
    context,
    baseURL,
  }) => {
    await context.addCookies([
      { name: 'sc-demo-view', value: 'tiles', url: baseURL ?? '' },
    ]);
    await page.goto(demo('preferences-usage'));
    await expect(page.locator('[data-slot=preferences]')).toHaveAttribute(
      'data-view',
      'list',
    );
  });

  test("another tab's choice comes through", async ({ page }) => {
    await page.goto(demo('preferences-usage'));
    const applied = page.locator('[data-slot=preferences]');
    await expect(applied).toHaveAttribute('data-view', 'list');
    await page.evaluate(() =>
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'sc-demo-view', newValue: 'grid' }),
      ),
    );
    await expect(applied).toHaveAttribute('data-view', 'grid');
  });
});

test('Read the value: a switch elsewhere sets it', async ({ page }) => {
  await page.goto(demo('read-preference'));
  const toggle = page.getByRole('button', { name: 'Grid view' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('picked')).toHaveText('grid');
  await expect(page.locator('[data-slot=preferences]')).toHaveAttribute(
    'data-view',
    'grid',
  );
});

test('The whole page: on <html>', async ({ page }) => {
  await page.goto(demo('global-preference'));
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-density', 'comfortable');
  await page.getByRole('radio', { name: 'Compact' }).click();
  await expect(html).toHaveAttribute('data-density', 'compact');
  await expect(page.locator('[data-slot=preferences]')).not.toHaveAttribute(
    'data-density',
  );
});

test('Several: both attributes on one element, the second not saved', async ({
  page,
}) => {
  await page.goto(demo('several-preferences'));
  const applied = page.getByTestId('applied');
  await expect(applied).toHaveAttribute('data-view', 'list');
  await expect(applied).toHaveAttribute('data-size', 'small');
  await page.getByRole('button', { name: 'Large text' }).click();
  await expect(applied).toHaveAttribute('data-size', 'large');
  await page.reload();
  await expect(page.getByTestId('applied')).toHaveAttribute(
    'data-size',
    'small',
  );
});
