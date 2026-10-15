import { type Page, expect, test } from '@playwright/test';

const story = (page: Page) => page.getByRole('textbox', { name: 'Story' });

/** A 1×1 transparent PNG. */
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

async function pick(page: Page, name: string): Promise<void> {
  const chooser = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: 'Add image' }).click();
  await (await chooser).setFiles({ name, mimeType: 'image/png', buffer: PNG });
}

test.describe('Images Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/images-editor-demo');
    await expect(story(page)).toBeVisible();
  });

  test('a picked image is uploaded, then inserted', async ({ page }) => {
    await story(page).click();
    await pick(page, 'harbour.png');
    await expect(
      page.getByRole('progressbar', { name: 'Uploading harbour.png' }),
    ).toBeVisible();
    await expect(story(page).locator('img')).toHaveAttribute('alt', 'harbour');
    await expect(page.getByText('Uploading harbour.png')).toBeHidden();
  });

  test('a cancelled upload inserts nothing', async ({ page }) => {
    await story(page).click();
    await pick(page, 'harbour.png');
    await page.getByRole('button', { name: 'Cancel upload' }).click();
    await expect(page.getByText('Uploading harbour.png')).toBeHidden();

    // Another, started after: once it is in, the first would have been too.
    await pick(page, 'lighthouse.png');
    await expect(story(page).locator('img')).toHaveAttribute(
      'alt',
      'lighthouse',
    );
    await expect(story(page).locator('img')).toHaveCount(1);
  });
});
