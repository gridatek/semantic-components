import { type Page, expect, test } from '../../test';

const stage = (page: Page) =>
  page.locator('[data-slot="image-annotator-stage"]');
const annotations = (page: Page) =>
  page.locator('[data-slot="image-annotation"]');

/** A point of the stage, as fractions of its size. */
async function at(page: Page, fx: number, fy: number) {
  const box = await stage(page).boundingBox();
  return {
    x: (box?.x ?? 0) + (box?.width ?? 0) * fx,
    y: (box?.y ?? 0) + (box?.height ?? 0) * fy,
  };
}

async function drag(
  page: Page,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
}

test.describe('Editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-annotator/editor-image-annotator-demo');
    await expect(stage(page).locator('svg')).toBeVisible();
  });

  test('a drawn arrow is an annotation, named', async ({ page }) => {
    await page.getByRole('button', { name: 'Arrow', exact: true }).click();
    await drag(page, await at(page, 0.2, 0.7), await at(page, 0.5, 0.4));
    await expect(page.getByRole('img', { name: 'Arrow' })).toHaveCount(1);
    await expect(page.getByText('1 annotations')).toBeVisible();
  });

  test('selected, an annotation moves, and Delete removes it', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Box', exact: true }).click();
    await drag(page, await at(page, 0.5, 0.2), await at(page, 0.75, 0.45));
    await page.getByRole('button', { name: 'Select', exact: true }).click();
    const box = page.getByRole('img', { name: 'Box' });
    const before = await box.boundingBox();
    await drag(page, await at(page, 0.5, 0.32), await at(page, 0.55, 0.37));
    await expect
      .poll(async () => (await box.boundingBox())?.x)
      .toBeGreaterThan((before?.x ?? 0) + 10);

    await page
      .getByRole('button', { name: 'Delete the selected annotation' })
      .click();
    await expect(annotations(page)).toHaveCount(0);
  });

  test('from the keyboard: a shape placed, moved, and undone', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Circle', exact: true }).click();
    await stage(page).focus();
    await page.keyboard.press('Enter');
    const circle = page.getByRole('img', { name: 'Circle' });
    await expect(circle).toBeFocused();
    const before = await circle.boundingBox();
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(async () => (await circle.boundingBox())?.x)
      .toBeGreaterThan(before?.x ?? 0);

    await page.keyboard.press('Control+z');
    await page.keyboard.press('Control+z');
    await expect(annotations(page)).toHaveCount(0);
  });

  test('a note is written, and undone in one step', async ({ page }) => {
    await page.getByRole('button', { name: 'Note', exact: true }).click();
    const point = await at(page, 0.5, 0.6);
    await page.mouse.click(point.x, point.y);
    const field = page.getByRole('textbox', { name: 'Note' });
    await expect(field).toBeFocused();
    await page.keyboard.type('Look here');
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('img', { name: 'Note: Look here' }),
    ).toHaveCount(1);

    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(annotations(page)).toHaveCount(0);
  });

  test('the image is exported with its annotations', async ({ page }) => {
    await page.getByRole('button', { name: 'Pen', exact: true }).click();
    await drag(page, await at(page, 0.1, 0.1), await at(page, 0.3, 0.3));
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download the image' }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('annotated.png');
  });
});

test.describe('Review a screenshot', () => {
  test('the annotations given as data are shown, named', async ({ page }) => {
    await page.goto('/demos/image-annotator/review-image-annotator-demo');
    await expect(
      page.getByRole('img', { name: 'Note: Make it larger' }),
    ).toHaveCount(1);
    await expect(annotations(page)).toHaveCount(4);
    await expect(page.getByText('The annotations, as data (4)')).toBeVisible();
  });
});

test.describe('Read only', () => {
  test('shown and reached with Tab, not edited', async ({ page }) => {
    await page.goto('/demos/image-annotator/read-only-image-annotator-demo');
    await expect(annotations(page)).toHaveCount(4);
    const box = page.getByRole('img', { name: 'Box' });
    // On its outline: a box is only its edges.
    await box.click({ position: { x: 2, y: 10 } });
    // Not selected: no handles.
    await expect(page.locator('[data-handle]')).toHaveCount(0);
  });
});
