import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/checkbox-group/${name}-checkbox-group-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named group; its value ticks the checkboxes', async ({
  page,
}) => {
  await page.goto('/demos/checkbox-group/checkbox-group-usage-demo');
  const group = page.getByRole('group', { name: 'Apples' });
  await expect(group.getByRole('checkbox', { name: 'Fuji' })).toBeChecked();
  await expect(group.getByRole('checkbox', { name: 'Gala' })).not.toBeChecked();
  await group.getByRole('checkbox', { name: 'Gala' }).focus();
  await press(page, ' ');
  await expect(group.getByRole('checkbox', { name: 'Gala' })).toBeChecked();
});

test('Parent: mixed over some, then all, then none', async ({ page }) => {
  await page.goto(demo('parent'));
  const parent = page.getByRole('checkbox', { name: 'Apples' });
  const fuji = page.getByRole('checkbox', { name: 'Fuji' });
  await fuji.click();
  await expect(parent).toHaveJSProperty('indeterminate', true);
  await parent.click();
  for (const name of ['Fuji', 'Gala', 'Granny Smith'])
    await expect(page.getByRole('checkbox', { name })).toBeChecked();
  await expect(parent).toHaveJSProperty('indeterminate', false);
  await parent.click();
  await expect(fuji).not.toBeChecked();
});

test('Nested parent: a nested group ticks its parent and the top one follows', async ({
  page,
}) => {
  await page.goto(demo('nested-parent'));
  const top = page.getByRole('checkbox', { name: 'User Permissions' });
  const manage = page.getByRole('checkbox', { name: 'Manage Users' });
  await page.getByRole('checkbox', { name: 'Edit User' }).click();
  await expect(manage).toHaveJSProperty('indeterminate', true);
  await expect(top).toHaveJSProperty('indeterminate', true);
  await manage.click();
  for (const name of ['Create User', 'Delete User', 'Assign Roles'])
    await expect(page.getByRole('checkbox', { name })).toBeChecked();
  await top.click();
  for (const name of ['View Dashboard', 'Access Reports', 'Manage Users'])
    await expect(page.getByRole('checkbox', { name })).toBeChecked();
});

test('Form: the model follows; none ticked is invalid once touched', async ({
  page,
}) => {
  await page.goto(demo('form'));
  const https = page.getByRole('checkbox', { name: 'HTTPS' });
  await page.getByRole('checkbox', { name: 'SSH' }).click();
  await expect(page.locator('pre')).toContainText('"ssh"');
  await page.getByRole('checkbox', { name: 'SSH' }).click();
  await https.click();
  await page.locator('pre').click();
  await expect(https).toHaveAttribute('aria-invalid', 'true');
});

test('Disabled: every checkbox out of reach', async ({ page }) => {
  await page.goto(demo('disabled'));
  for (const name of ['Fuji', 'Gala', 'Granny Smith'])
    await expect(page.getByRole('checkbox', { name })).toBeDisabled();
});

test('RTL: the checkboxes at the right of their text', async ({ page }) => {
  await page.goto(demo('rtl'));
  const [checkbox, label] = [
    await box(page.getByRole('checkbox', { name: 'فوجي' })),
    await box(page.getByText('فوجي')),
  ];
  expect(checkbox.x).toBeGreaterThan(label.x);
});
