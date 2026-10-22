import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors, press, type } from '../../interaction';

const demo = (name: string) =>
  `/demos/tags-input-next/${name}-tags-input-next-demo`;
const tags = (page: Page) => page.locator('[data-slot="tags-input-item"]');
/** The tags' labels (not their remove buttons' names). */
const labels = (page: Page) =>
  page.locator('[data-slot="tags-input-item"] > span');

/**
 * Pastes `text` into the field, as from the clipboard. Firefox drops the data
 * of a made-up paste event, so there the real clipboard pastes it.
 */
async function paste(control: Locator, text: string): Promise<void> {
  const page = control.page();
  if (page.context().browser()?.browserType().name() === 'firefox') {
    await control.focus();
    await page.evaluate(
      (pasted) => navigator.clipboard.writeText(pasted),
      text,
    );
    await page.keyboard.press('Control+V');
    return;
  }
  await control.evaluate((input, pasted) => {
    const data = new DataTransfer();
    data.setData('text/plain', pasted);
    input.dispatchEvent(
      new ClipboardEvent('paste', {
        clipboardData: data,
        bubbles: true,
        cancelable: true,
      }),
    );
  }, text);
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: Enter, a comma and leaving add; a duplicate is refused', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const control = page.getByLabel('Skills');
  await expect(control).toHaveAttribute('data-slot', 'tags-input-control');
  await expect(labels(page)).toHaveText([
    'Angular',
    'TypeScript',
    'Accessibility',
  ]);

  await control.click();
  await type(page, 'RxJS');
  await press(page, 'Enter');
  await type(page, 'Signals,');
  await expect(tags(page)).toHaveCount(5);
  await expect(control).toHaveValue('');

  // A duplicate stays, marked, until edited.
  await type(page, 'Angular');
  await press(page, 'Enter');
  await expect(tags(page)).toHaveCount(5);
  await expect(control).toHaveValue('Angular');
  await expect(control).toHaveAttribute('aria-invalid', 'true');
  await press(page, 'Backspace');
  await expect(control).not.toHaveAttribute('aria-invalid');

  await control.fill('  CSS  ');
  await control.blur();
  await expect(labels(page).last()).toHaveText('CSS');
});

test('Basic: one Tab stop; into the tags and out by keys', async ({ page }) => {
  await page.goto(demo('basic'));
  const control = page.getByLabel('Skills');
  await control.focus();
  await press(page, 'Backspace');
  await expect(tags(page).nth(2)).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(tags(page).nth(1)).toBeFocused();
  await press(page, 'Home');
  await expect(tags(page).nth(0)).toBeFocused();
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await expect(control).toBeFocused();

  // Delete: removed, focus on the one now in its place.
  await press(page, 'ArrowLeft');
  await press(page, 'ArrowLeft');
  await expect(tags(page).nth(1)).toBeFocused();
  await press(page, 'Delete');
  await expect(labels(page)).toHaveText(['Angular', 'Accessibility']);
  await expect(tags(page).nth(1)).toBeFocused();
  await press(page, 'Escape');
  await expect(control).toBeFocused();

  // The remove buttons are not Tab stops.
  await expect(
    page.getByRole('button', { name: 'Remove Angular' }),
  ).toHaveAttribute('tabindex', '-1');
  await page.getByRole('button', { name: 'Remove Angular' }).click();
  await expect(labels(page)).toHaveText(['Accessibility']);
});

test('Basic: right to left, → goes into the tags', async ({ page }) => {
  await page.goto(demo('basic'));
  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  await page.getByLabel('Skills').focus();
  await press(page, 'ArrowLeft');
  await expect(page.getByLabel('Skills')).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(tags(page).nth(2)).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(tags(page).nth(1)).toBeFocused();
  await press(page, 'ArrowLeft');
  await press(page, 'ArrowLeft');
  await expect(page.getByLabel('Skills')).toBeFocused();
});

test('Emails: accept refuses; a pasted list is split', async ({ page }) => {
  await page.goto(demo('emails'));
  const control = page.getByLabel('Invite');
  await control.click();
  await type(page, 'not-an-email');
  await press(page, 'Enter');
  await expect(tags(page)).toHaveCount(1);
  await expect(page.getByText('Not an email address')).toBeVisible();

  await control.fill('');
  await paste(control, 'grace@example.com, oops\nalan@example.com');
  await expect(labels(page)).toHaveText([
    'ada@example.com',
    'grace@example.com',
    'alan@example.com',
  ]);
  await expect(control).toHaveValue('oops');
  await expect(control).toHaveAttribute('aria-invalid', 'true');
});

test('Limit: at five, nothing more; Clear empties it', async ({ page }) => {
  await page.goto(demo('limit'));
  const control = page.getByLabel('Topics');
  const root = page.locator('[data-slot="tags-input"]');
  await control.click();
  await type(page, 'Ops,Data,');
  await expect(tags(page)).toHaveCount(5);
  await expect(root).toHaveAttribute('data-full');
  await expect(page.getByText('5 of 5 topics.')).toBeVisible();
  await type(page, 'More');
  await press(page, 'Enter');
  await expect(tags(page)).toHaveCount(5);

  await page.getByRole('button', { name: 'Clear topics' }).click();
  await expect(tags(page)).toHaveCount(0);
  await expect(control).toBeFocused();
  await expect(
    page.getByRole('button', { name: 'Clear topics' }),
  ).toBeDisabled();
});

test('Form: one to five keywords, from the schema', async ({ page }) => {
  await page.goto(demo('form'));
  const publish = page.getByRole('button', { name: 'Publish' });
  await publish.click();
  await expect(page.getByRole('alert')).toHaveText('Add at least one keyword.');
  const control = page.getByLabel('Keywords');
  await expect(control).toHaveAttribute('aria-invalid', 'true');

  await control.click();
  await type(page, 'a,b,c,d,e,f,');
  // maxLength from the schema: the sixth does not go in.
  await expect(tags(page)).toHaveCount(5);
  await expect(control).toHaveValue('f');
  await control.fill('');
  await publish.click();
  await expect(page.getByRole('status')).toHaveText(
    'Published with a, b, c, d, e.',
  );
});
