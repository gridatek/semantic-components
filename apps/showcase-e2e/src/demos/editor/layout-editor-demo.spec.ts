import { type Page, expect, test } from '../../test';

const letter = (page: Page) => page.getByRole('textbox', { name: 'Letter' });
const content = (page: Page) => page.locator('[data-layout]');
const layout = (page: Page, name: 'Default' | 'Page') =>
  page.getByRole('group', { name: 'Layout' }).getByRole('button', { name });

test.describe('Layout Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/demos/editor/layout-editor-demo');
    await expect(letter(page).locator('h2')).toHaveText('A letter');
  });

  test('the page layout is a centred column', async ({ page }) => {
    await expect(content(page)).toHaveAttribute('data-layout', 'page');
    const box = await content(page).boundingBox();
    const text = await letter(page).boundingBox();
    expect(text?.width).toBeLessThanOrEqual(648);
    // Centred: the same space on either side.
    const left = (text?.x ?? 0) - (box?.x ?? 0);
    const right =
      (box?.x ?? 0) + (box?.width ?? 0) - ((text?.x ?? 0) + (text?.width ?? 0));
    expect(Math.abs(left - right)).toBeLessThan(20);
  });

  test('the default layout goes edge to edge', async ({ page }) => {
    await layout(page, 'Default').click();
    await expect(content(page)).toHaveAttribute('data-layout', 'default');
    const box = await content(page).boundingBox();
    const text = await letter(page).boundingBox();
    expect(text?.width).toBeGreaterThan(648);
    expect((text?.x ?? 0) - (box?.x ?? 0)).toBeLessThan(20);
  });
});
