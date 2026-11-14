import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/collapsible/${name}-collapsible-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the trigger opens and closes its panel (aria-expanded, aria-controls)', async ({
  page,
}) => {
  await page.goto('/demos/collapsible/collapsible-usage-demo');
  const trigger = page.getByRole('button', { name: 'Toggle details' });
  const details = page.getByText('Shipping address');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(details).toBeHidden();
  // aria-controls names its panel.
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toContainText('Shipping address');

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(details).toBeVisible();

  await trigger.focus();
  await press(page, 'Enter');
  await expect(details).toBeHidden();
});

test('Basic: Space toggles it', async ({ page }) => {
  await page.goto(demo('basic'));
  const trigger = page.getByRole('button', { name: 'Product details' });
  await trigger.focus();
  await press(page, ' ');
  await expect(page.getByRole('button', { name: 'Learn More' })).toBeVisible();
});

test('File tree: a folder in a folder opens on its own', async ({ page }) => {
  await page.goto(demo('file-tree'));
  await page.getByRole('button', { name: 'components' }).click();
  await expect(page.getByRole('button', { name: 'ui' })).toBeVisible();
  await expect(page.getByText('button.tsx')).toBeHidden();
  await page.getByRole('button', { name: 'ui' }).click();
  await expect(page.getByText('button.tsx')).toBeVisible();
});

test('Hidden until found: closed, hidden="until-found"; a find match opens it', async ({
  page,
}) => {
  await page.goto(demo('hidden-until-found'));
  const trigger = page.getByRole('button', { name: 'Shipping details' });
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toHaveAttribute('hidden', 'until-found');
  // What find-in-page does on a match inside it.
  await panel.evaluate((el) => el.dispatchEvent(new Event('beforematch')));
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).not.toHaveAttribute('hidden');
});

test('Disabled: its trigger does nothing', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(
    page.getByRole('button', { name: 'Archived notes' }),
  ).toBeDisabled();
});

test('Open by default: shown, then closed by its trigger', async ({ page }) => {
  await page.goto(demo('open'));
  await expect(page.getByText('Version 2 adds dark mode')).toBeVisible();
  await page.getByRole('button', { name: 'Release notes' }).click();
  await expect(page.getByText('Open: false')).toBeVisible();
});
