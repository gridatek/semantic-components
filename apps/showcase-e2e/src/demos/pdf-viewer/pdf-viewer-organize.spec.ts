import { workspaceRoot } from '@nx/devkit';
import { type Page, expect, test } from '@playwright/test';
import { join } from 'node:path';
import { collectErrors } from '../../interaction';

const HANDBOOK = join(workspaceRoot, 'apps/showcase/public/pdf/handbook.pdf');

/** Opens handbook.pdf in the full demo with More → Open file…. */
async function openHandbook(page: Page): Promise<void> {
  await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
  await page.getByRole('button', { name: 'More' }).click();
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('menuitem', { name: 'Open file…' }).click(),
  ]);
  await chooser.setFiles(HANDBOOK);
  await expect(page.getByTestId('page-count')).toHaveText('(1 of 6)', {
    timeout: 20_000,
  });
}

/** The text of the first page. */
const firstPage = (page: Page) => page.locator('div[data-page="1"] .textLayer');

test.describe('PDF Viewer document features', () => {
  test('outline: opens as the document asks, goes to bookmarks', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await openHandbook(page);

    // /PageMode /UseOutlines opens the sidebar on the outline.
    const outline = page.getByRole('navigation', { name: 'Outline' });
    await expect(outline).toBeVisible();
    // Chapter 1 is open, chapter 2 closed (their /Count).
    await expect(
      outline.getByRole('button', { name: 'Middle of chapter 1' }),
    ).toBeVisible();
    await expect(outline.getByRole('button', { name: 'API' })).toHaveCount(0);

    await outline.getByRole('button', { name: 'Middle of chapter 1' }).click();
    await expect(page.getByTestId('page-count')).toHaveText('(3 of 6)');
    // The current bookmark: the first (top-level first) for the page, as
    // pdf.js — Chapter 1 also starts on page 3.
    await expect(outline.locator('[aria-current="location"]')).toHaveText(
      'Chapter 1',
    );

    // Back returns to where the bookmark jumped from; Forward goes again.
    const back = page.getByRole('button', { name: 'Back', exact: true });
    const forward = page.getByRole('button', { name: 'Forward', exact: true });
    await expect(forward).toBeDisabled();
    await back.click();
    await expect(page.getByTestId('page-count')).toHaveText('(1 of 6)');
    await expect(back).toBeDisabled();
    await forward.click();
    await expect(page.getByTestId('page-count')).toHaveText('(3 of 6)');
    expect(errors).toEqual([]);
  });

  test('pages: move, undo, delete, copy and paste', async ({ page }) => {
    const errors = collectErrors(page);
    await openHandbook(page);
    await page.getByRole('tab', { name: 'Pages' }).click();
    const pageCount = page.getByTestId('page-count');

    // Move page ii before page i.
    await page.getByRole('checkbox', { name: 'Select page ii' }).check();
    await page.getByRole('button', { name: 'Move earlier' }).click();
    await expect(firstPage(page)).toContainText('Contents', {
      timeout: 10_000,
    });
    await expect(
      page.getByRole('checkbox', { name: /Select page/ }).first(),
    ).toBeChecked();

    // Undo.
    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(firstPage(page)).toContainText('Preface', {
      timeout: 10_000,
    });

    // Delete the selected page (labelled 2: the 4th).
    await page
      .getByRole('checkbox', { name: /Select page/ })
      .first()
      .uncheck();
    await page.getByRole('checkbox', { name: 'Select page 2' }).check();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(pageCount).toContainText('of 5', { timeout: 10_000 });

    // Copy page i and paste it after the current page. Pages from another
    // document (the clipboard) drop the page labels: plain numbers now.
    await page
      .getByRole('checkbox', { name: 'Select page i', exact: true })
      .check();
    await page.getByRole('button', { name: 'Copy' }).click();
    await page.getByRole('button', { name: 'Paste' }).click();
    await expect(pageCount).toHaveText('/ 6', { timeout: 10_000 });

    expect(errors).toEqual([]);
  });
});
