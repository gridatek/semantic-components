import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { collectErrors } from '../../interaction';

// order-form.pdf: Quantity × Unit price = Total, computed by the PDF's own
// JavaScript; a Gift wrap checkbox.
test.describe('PDF Viewer forms', () => {
  test('runs the form script and saves the values into the PDF', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/pdf-viewer/pdf-viewer-form-demo');

    const quantity = page.getByRole('textbox', { name: 'Quantity' });
    const price = page.getByRole('textbox', { name: 'Unit price' });
    const total = page.getByRole('textbox', { name: 'Total' });
    // The first load fetches pdf.js's worker.
    await expect(quantity).toBeVisible({ timeout: 20_000 });
    await quantity.fill('3');
    await price.click();
    await price.fill('4');
    await price.press('Tab');
    await expect(total).toHaveValue('12');
    await page.getByRole('checkbox', { name: 'Gift wrap' }).check();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download' }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('order-form.pdf');
    // pdf.js appends the changed fields as an incremental update.
    const saved = readFileSync(await download.path()).toString('latin1');
    expect(saved).toMatch(/\/T \(Quantity\)[^]*?\/V \(3\)/);
    expect(saved).toMatch(/\/V \(12\)/);
    expect(saved).toMatch(/\/T \(Gift wrap\)[^]*?\/V \/Yes/);

    expect(errors).toEqual([]);
  });
});
