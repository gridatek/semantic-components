import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

// handbook.pdf: page 1 "Preface", page 2 "Contents", page 3 "Chapter 1…".
test.describe('PDF Viewer presentation mode', () => {
  test('shows one page at a time and restores the view', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/pdf-viewer/pdf-viewer-presentation-demo');
    const present = page.getByRole('button', { name: 'Present' });
    await expect(present).toBeEnabled({ timeout: 20_000 });
    await present.click();

    const viewer = page.locator('[scPdfViewer]');
    await expect(viewer).toHaveAttribute('data-presenting', 'true');
    await expect(page.getByRole('toolbar', { name: 'Handbook' })).toBeHidden();
    const shown = page.locator('div[data-page]:visible .textLayer');
    await expect(shown).toHaveCount(1);
    await expect(shown).toContainText('Preface');

    // Click: next page. Shift+click: previous. Keys too.
    const canvas = page.locator('[scPdfViewerCanvas]');
    await canvas.click();
    await expect(shown).toContainText('Contents');
    await canvas.click({ modifiers: ['Shift'] });
    await expect(shown).toContainText('Preface');
    await page.keyboard.press('ArrowRight');
    await expect(shown).toContainText('Contents');

    // Leaving fullscreen (Escape) ends it and restores the view.
    await page.evaluate(() => document.exitFullscreen());
    await expect(viewer).not.toHaveAttribute('data-presenting');
    await expect(page.getByRole('toolbar', { name: 'Handbook' })).toBeVisible();
    await expect(page.locator('div[data-page]:visible')).toHaveCount(6);

    expect(errors).toEqual([]);
  });
});
