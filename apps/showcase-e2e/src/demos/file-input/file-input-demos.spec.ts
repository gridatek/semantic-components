import { collectErrors, focus, press } from '../../interaction';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/file-input/${name}-demo`;
const picker = (page: Page) => page.locator('input[type=file]');
const items = (page: Page) => page.locator('[data-slot=file-input-item]');
const file = (name: string, mimeType = 'text/plain', size = 10) => ({
  name,
  mimeType,
  buffer: Buffer.alloc(size, 'a'),
});

async function open(page: Page, name: string) {
  await page.goto(demo(name));
  await expect(page.locator('[data-slot=file-input]')).toBeVisible();
}

/** Files dragged over, then dropped on, an element. */
async function drop(
  target: Locator,
  files: { name: string; type: string }[],
  { release = true } = {},
) {
  await target.evaluate(
    (element, { files, release }) => {
      const data = new DataTransfer();
      for (const { name, type } of files)
        data.items.add(new File(['x'], name, { type }));
      const fire = (type: string) =>
        element.dispatchEvent(
          new DragEvent(type, {
            dataTransfer: data,
            bubbles: true,
            cancelable: true,
          }),
        );
      fire('dragenter');
      fire('dragover');
      if (release) fire('drop');
    },
    { files, release },
  );
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => open(page, 'file-input-usage'));

  test('picked files listed, sized, announced', async ({ page }) => {
    await picker(page).setInputFiles([file('a.txt'), file('b.txt')]);
    await expect(items(page)).toHaveCount(2);
    await expect(items(page).first()).toContainText('a.txt');
    await expect(items(page).first()).toContainText('10 bytes');
    await expect(page.getByRole('status')).toHaveText(
      /a\.txt added\.\s+b\.txt added\./,
    );
  });

  test('files dropped on the dropzone are added', async ({ page }) => {
    await drop(page.locator('[data-slot=file-input-dropzone]'), [
      { name: 'photo.png', type: 'image/png' },
    ]);
    await expect(items(page)).toHaveText([/photo\.png/]);
  });

  test('the list is one Tab stop; Delete removes, focus on to the next', async ({
    page,
  }) => {
    await picker(page).setInputFiles([
      file('a.txt'),
      file('b.txt'),
      file('c.txt'),
    ]);
    await expect(items(page)).toHaveCount(3);
    await focus(page.getByRole('button', { name: 'Browse files' }));
    await press(page, 'Tab');
    await expect(items(page).first()).toBeFocused();
    await press(page, 'ArrowDown');
    await expect(items(page).nth(1)).toBeFocused();
    await press(page, 'Delete');
    await expect(items(page)).toHaveText([/a\.txt/, /c\.txt/]);
    await expect(items(page).nth(1)).toBeFocused();
    await expect(page.getByRole('status')).toHaveText('b.txt removed.');
    // The remove buttons are out of the Tab order: on past the list.
    await expect(
      page.getByRole('button', { name: 'Remove a.txt' }),
    ).toHaveAttribute('tabindex', '-1');
  });

  test('the last file removed: focus back on the trigger', async ({ page }) => {
    await picker(page).setInputFiles([file('a.txt')]);
    await focus(items(page).first());
    await press(page, 'Backspace');
    await expect(items(page)).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Browse files' }),
    ).toBeFocused();
  });
});

test('Upload button: one file, its name; a new one replaces it', async ({
  page,
}) => {
  await open(page, 'upload-button-file-input');
  await expect(page.getByTestId('picked')).toHaveText('No file chosen');
  await picker(page).setInputFiles([file('resume.pdf', 'application/pdf')]);
  await expect(page.getByTestId('picked')).toHaveText('resume.pdf');
  await picker(page).setInputFiles([file('cv.pdf', 'application/pdf')]);
  await expect(page.getByTestId('picked')).toHaveText('cv.pdf');
});

test.describe('Accepted types', () => {
  test.beforeEach(({ page }) => open(page, 'accepted-types-file-input'));

  test('others kept out, with their reason', async ({ page }) => {
    await picker(page).setInputFiles([
      file('a.png', 'image/png'),
      file('b.txt'),
      file('c.pdf', 'application/pdf'),
    ]);
    await expect(items(page)).toHaveText([/a\.png/, /c\.pdf/]);
    await expect(page.getByTestId('rejected')).toHaveText(
      'b.txt: not an accepted type',
    );
  });

  test('dragging: accepted or rejected, before the drop', async ({ page }) => {
    const zone = page.locator('[data-slot=file-input-dropzone]');
    await drop(zone, [{ name: 'a.png', type: 'image/png' }], {
      release: false,
    });
    await expect(zone).toHaveAttribute('data-drag-accept');
    await drop(zone, [{ name: 'a.txt', type: 'text/plain' }], {
      release: false,
    });
    await expect(zone).toHaveAttribute('data-drag-reject');
  });
});

test('Limits: three at most, not empty', async ({ page }) => {
  await open(page, 'limits-file-input');
  await picker(page).setInputFiles([
    file('a.txt'),
    file('empty.txt', 'text/plain', 0),
    file('b.txt'),
    file('c.txt'),
    file('d.txt'),
  ]);
  await expect(items(page)).toHaveText([/a\.txt/, /b\.txt/, /c\.txt/]);
  await expect(page.getByTestId('rejected')).toHaveText(
    /empty\.txt: empty\s*d\.txt: one file too many/,
  );
});

test('One file: the trigger says replace', async ({ page }) => {
  await open(page, 'one-file-file-input');
  const trigger = page.locator('[data-slot=file-input-trigger]');
  await expect(trigger).toHaveText('Choose a PDF');
  await picker(page).setInputFiles([file('a.pdf', 'application/pdf')]);
  await expect(trigger).toHaveText('Replace the PDF');
  await picker(page).setInputFiles([file('b.pdf', 'application/pdf')]);
  await expect(items(page)).toHaveText([/b\.pdf/]);
});

test('Validation: a file already chosen, or twice in one pick', async ({
  page,
}) => {
  await open(page, 'validation-file-input');
  await picker(page).setInputFiles([file('a.txt')]);
  await expect(items(page)).toHaveCount(1);
  await picker(page).setInputFiles([
    file('a.txt'),
    file('b.txt'),
    file('b.txt'),
  ]);
  await expect(items(page)).toHaveText([/a\.txt/, /b\.txt/]);
  await expect(page.getByTestId('rejected')).toHaveText(
    /a\.txt: already chosen\s*b\.txt: already chosen/,
  );
});

test('Previews: an image becomes its thumbnail', async ({ page }) => {
  await open(page, 'previews-file-input');
  await picker(page).setInputFiles([file('a.png', 'image/png')]);
  await expect(
    page.locator('[data-slot=file-input-item-preview] img'),
  ).toHaveAttribute('src', /^blob:/);
});

test('Uploading: progress per file, yours', async ({ page }) => {
  await open(page, 'uploading-file-input');
  await picker(page).setInputFiles([file('a.txt')]);
  await page.getByRole('button', { name: 'Upload' }).click();
  await expect(
    page.getByRole('progressbar', { name: 'Uploading a.txt' }),
  ).toHaveAttribute('aria-valuenow', '100', { timeout: 10_000 });
});

test.describe('Attachments', () => {
  test('files pasted into the textarea are attached; text stays text', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit makes no ClipboardEvent with files in a test',
    );
    await open(page, 'attachments-file-input');
    const message = page.getByRole('textbox', { name: 'Message' });
    await message.evaluate((element) => {
      const data = new DataTransfer();
      data.items.add(new File(['x'], 'shot.png', { type: 'image/png' }));
      const paste = new ClipboardEvent('paste', {
        clipboardData: data,
        bubbles: true,
        cancelable: true,
      });
      // Firefox ignores the clipboardData given to a made-up event (an empty
      // one instead): set on the event itself, as a real paste carries it.
      Object.defineProperty(paste, 'clipboardData', { value: data });
      element.dispatchEvent(paste);
    });
    await expect(items(page)).toHaveText([/shot\.png/]);
    await message.fill('Hello');
    await expect(message).toHaveValue('Hello');
    await expect(items(page)).toHaveCount(1);
  });
});

test('Page-wide drop: an overlay while dragging; a drop anywhere taken', async ({
  page,
}) => {
  await open(page, 'page-drop-file-input');
  const overlay = page.locator('[data-slot=file-input-dropzone]');
  await expect(overlay).toBeHidden();
  await drop(page.locator('body'), [{ name: 'a.txt', type: 'text/plain' }], {
    release: false,
  });
  await expect(overlay).toBeVisible();
  await drop(page.locator('body'), [{ name: 'a.txt', type: 'text/plain' }]);
  await expect(overlay).toBeHidden();
  await expect(items(page)).toHaveText([/a\.txt/]);
});

test('Folders: the picker takes a folder', async ({ page }) => {
  await open(page, 'folders-file-input');
  await expect(picker(page)).toHaveAttribute('webkitdirectory', '');
  await expect(picker(page)).toHaveAttribute('multiple', '');
});

test('Camera: the picker asks for the back camera', async ({ page }) => {
  await open(page, 'camera-file-input');
  await expect(picker(page)).toHaveAttribute('capture', 'environment');
  await expect(picker(page)).toHaveAttribute('accept', 'image/*');
});

test('Form: the label opens the picker; at least one file', async ({
  page,
}) => {
  await open(page, 'form-file-input');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('alert')).toHaveText('Add a proof of address.');
  const trigger = page.getByRole('button', {
    name: 'Proof of address Browse files',
  });
  await expect(trigger).toHaveAttribute('aria-invalid', 'true');
  const chooser = page.waitForEvent('filechooser');
  await page.getByText('Proof of address', { exact: true }).click();
  await (await chooser).setFiles([file('bill.pdf', 'application/pdf')]);
  await expect(items(page)).toHaveText([/bill\.pdf/]);
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('status')).toHaveText('Sent 1 file(s).');
});

test('RTL: the remove button at the inline end', async ({ page }) => {
  await open(page, 'rtl-file-input');
  await picker(page).setInputFiles([file('a.txt')]);
  const remove = await page
    .locator('[data-slot=file-input-item-remove]')
    .boundingBox();
  const preview = await page
    .locator('[data-slot=file-input-item-preview]')
    .boundingBox();
  expect(remove?.x ?? 0).toBeLessThan(preview?.x ?? 0);
});
