import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const demo = (name: string) =>
  `/demos/file-upload-next/${name}-file-upload-next-demo`;

/** A 1×1 PNG. */
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64',
);
const file = (name: string, size: number, mimeType = 'text/plain') => ({
  name,
  mimeType,
  buffer: Buffer.alloc(size, 'a'),
});
const image = (name: string) => ({ name, mimeType: 'image/png', buffer: PNG });

const items = (page: Page) => page.locator('[data-slot="file-upload-item"]');
const trigger = (page: Page) =>
  page.locator('[data-slot="file-upload-trigger"]');
const dropzone = (page: Page) =>
  page.locator('[data-slot="file-upload-dropzone"]');

/** Picks files through the picker that `opener` opens. */
async function pick(
  page: Page,
  opener: Locator,
  files: Parameters<typeof file>[] | ReturnType<typeof file>[],
): Promise<void> {
  const chooser = page.waitForEvent('filechooser');
  await opener.click();
  await (await chooser).setFiles(files as ReturnType<typeof file>[]);
}

/** Drops files on the zone, as dragged from the desktop. */
async function drop(
  zone: Locator,
  files: { name: string; type: string; size: number }[],
): Promise<void> {
  const transfer = await zone.page().evaluateHandle((list) => {
    const data = new DataTransfer();
    for (const { name, type, size } of list) {
      data.items.add(new File(['a'.repeat(size)], name, { type }));
    }
    return data;
  }, files);
  await zone.dispatchEvent('dragenter', { dataTransfer: transfer });
  await zone.dispatchEvent('dragover', { dataTransfer: transfer });
  await expect(zone).toHaveAttribute('data-dragging');
  await zone.dispatchEvent('drop', { dataTransfer: transfer });
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: picked by the button, added, named and sized', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  // The trigger is the Tab stop: the native input is hidden, out of it.
  const native = page.locator('[data-slot="file-upload-input"]');
  await expect(native).toBeHidden();
  await expect(native).toHaveAttribute('tabindex', '-1');
  await trigger(page).focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(trigger(page)).toBeFocused();

  await pick(page, trigger(page), [
    file('notes.txt', 2000),
    file('report.pdf', 1_500_000, 'application/pdf'),
  ]);
  await expect(items(page)).toHaveCount(2);
  await expect(items(page).nth(0)).toContainText('notes.txt');
  await expect(
    items(page).locator('[data-slot="file-upload-item-size"]'),
  ).toHaveText(['2 kB', '1.5 MB']);

  // Multiple: a second pick adds.
  await pick(page, trigger(page), [file('more.txt', 10)]);
  await expect(items(page).nth(2)).toContainText('10 bytes');
  await expect(items(page)).toHaveCount(3);

  await page.getByRole('button', { name: 'Remove notes.txt' }).click();
  await expect(items(page)).toHaveCount(2);
  await expect(page.getByText('notes.txt')).toHaveCount(0);
});

test('Basic: a click on the zone opens the picker; a drop adds', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await pick(page, dropzone(page).getByText('Drop files here'), [
    file('a.txt', 5),
  ]);
  await expect(items(page)).toHaveCount(1);

  await drop(dropzone(page), [
    { name: 'b.txt', type: 'text/plain', size: 5 },
    { name: 'c.txt', type: 'text/plain', size: 5 },
  ]);
  await expect(items(page)).toHaveCount(3);
  await expect(dropzone(page)).not.toHaveAttribute('data-dragging');
});

test('Single image: a thumbnail, replaced by the next one', async ({
  page,
}) => {
  await page.goto(demo('single'));
  await pick(page, trigger(page), [image('me.png')]);
  await expect(items(page)).toHaveCount(1);
  await expect(items(page).locator('img')).toHaveAttribute('src', /^blob:/);

  await pick(page, trigger(page), [image('me-again.png')]);
  await expect(items(page)).toHaveCount(1);
  await expect(items(page)).toContainText('me-again.png');
  // Not an image: kept out.
  await page
    .locator('[data-slot="file-upload-input"]')
    .setInputFiles([file('notes.txt', 5)]);
  await expect(items(page)).toContainText('me-again.png');
});

test('Rejections: type, size and count, each with its reason', async ({
  page,
}) => {
  await page.goto(demo('rejections'));
  await pick(page, trigger(page), [
    image('one.png'),
    file('notes.txt', 5),
    {
      name: 'huge.png',
      mimeType: 'image/png',
      buffer: Buffer.alloc(1_500_000),
    },
    image('two.png'),
    image('three.png'),
    image('four.png'),
  ]);
  await expect(items(page)).toHaveCount(3);
  const said = page.locator('[aria-live="polite"] li');
  await expect(said).toHaveText([
    /notes\.txt:\s*not an image\./,
    /huge\.png:\s*larger than 1 MB\./,
    /four\.png:\s*three images at most\./,
  ]);
  // The next pick says only its own.
  await page.getByRole('button', { name: 'Remove one.png' }).click();
  await pick(page, trigger(page), [image('five.png')]);
  await expect(said).toHaveCount(0);
  await expect(items(page)).toHaveCount(3);
});

test('Upload progress: the app’s, per file', async ({ page }) => {
  await page.goto(demo('progress'));
  const upload = page.getByRole('button', { name: 'Upload', exact: true });
  await expect(upload).toBeDisabled();
  await pick(page, trigger(page), [file('a.txt', 5), file('b.txt', 5)]);
  await upload.click();
  const bars = page.getByRole('progressbar');
  await expect(bars).toHaveCount(2);
  await expect(
    page.getByRole('progressbar', { name: 'Uploading a.txt' }),
  ).toHaveAttribute('aria-valuenow', '100');
});

test('Form: required and a total size, from the schema', async ({ page }) => {
  await page.goto(demo('form'));
  const send = page.getByRole('button', { name: 'Send application' });
  await send.click();
  await expect(page.getByRole('alert')).toHaveText(
    'Add at least one document.',
  );
  await expect(dropzone(page)).toHaveAttribute('data-invalid');
  await expect(trigger(page)).toHaveAttribute('aria-invalid', 'true');

  await pick(page, trigger(page), [
    file('portfolio.pdf', 6_000_000, 'application/pdf'),
  ]);
  await expect(page.getByRole('alert')).toHaveText('At most 5 MB in all.');
  await page.getByRole('button', { name: 'Remove portfolio.pdf' }).click();
  await pick(page, trigger(page), [file('cv.pdf', 5, 'application/pdf')]);
  await expect(dropzone(page)).not.toHaveAttribute('data-invalid');
  await send.click();
  await expect(page.getByRole('status')).toHaveText('Sent: cv.pdf');
});
