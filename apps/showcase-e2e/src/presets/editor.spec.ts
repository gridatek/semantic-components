import { type Page, expect, test } from '../test';
import { presetName } from './preset';

/** Each style's checkbox corners (its scCheckbox), which a task's box takes. */
const CHECKBOX_CORNERS = {
  nova: '4px',
  lyra: '0px',
  maia: '6px',
  vega: '4px',
  mira: '4px',
  luma: '5px',
  rhea: '5px',
  sera: '0px',
} as const;

const boxCorners = (page: Page, document: string) =>
  page
    .locator(`${document} ul[data-type="taskList"] > li > label`)
    .first()
    .evaluate(
      (label) => getComputedStyle(label, '::before').borderTopLeftRadius,
    );

test.describe('Editor in its preset', () => {
  test(`a task's box has the style's checkbox corners, in the editor and the display`, async ({
    page,
  }) => {
    const preset = presetName();
    await page.goto('/demos/editor/view-editor-demo');
    const editor = '[role=textbox][aria-label="Post"]';
    const view = 'article[aria-label="Published post"]';
    await expect(page.locator(`${editor} h1`)).toHaveText('Release notes');
    await expect(page.locator(`${view} h1`)).toHaveText('Release notes');
    for (const document of [editor, view])
      await expect
        .poll(() => boxCorners(page, document), `${preset}: ${document}`)
        .toBe(CHECKBOX_CORNERS[preset]);
  });
});

test(`search matches have the style's inline corners (its inline code's), not the theme's radius`, async ({
  page,
}) => {
  await page.goto('/demos/editor/search-editor-demo');
  await page.getByRole('button', { name: 'Search and replace' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('the');
  const match = page.locator('.find-and-replace-result').first();
  await expect(match).toBeVisible();
  // The style's inline corners, as the document resolves them.
  const inline = await match.evaluate((el) => {
    const probe = el.ownerDocument.createElement('span');
    probe.style.borderRadius = 'var(--sc-typeset-radius-inline)';
    el.closest('[data-slot=editor-document]')?.append(probe);
    const corners = getComputedStyle(probe).borderTopLeftRadius;
    probe.remove();
    return corners;
  });
  await expect(match).toHaveCSS('border-top-left-radius', inline);
});

test(`a highlight has the style's inline corners (its inline code's)`, async ({
  page,
}) => {
  await page.goto('/demos/editor/full-featured-editor-demo');
  const mark = page.locator('[data-slot=editor-document] mark').first();
  await expect(mark).toBeVisible();
  const inline = await mark.evaluate((el) => {
    const probe = el.ownerDocument.createElement('span');
    probe.style.borderRadius = 'var(--sc-typeset-radius-inline)';
    el.closest('[data-slot=editor-document]')?.append(probe);
    const corners = getComputedStyle(probe).borderTopLeftRadius;
    probe.remove();
    return corners;
  });
  await expect(mark).toHaveCSS('border-top-left-radius', inline);
});
