import { expect, test } from '@playwright/test';
import { orphanLabels } from '../axe';

/**
 * A `<label>` tied to no control (WAVE's "Orphaned form label"): axe checks
 * from the control's side only, so the page-level helper checks this too.
 * Plain markup: no app.
 */
test('a label tied to nothing is found, and a `for` to no native control even when that control names itself with the label; a for, a wrapped control or an aria-labelledby is not', async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <label>Orphan</label>
      <label for="missing">Points to nothing</label>
      <label for="name">Name</label><input id="name" />
      <label>Wrapped <input /></label>
      <label id="topic-label">Topic</label>
      <div role="combobox" aria-labelledby="topic-label" tabindex="0"></div>
      <label id="sc-select-label-0">Size</label>
      <div role="combobox" aria-labelledby="sc-select-label-0 sc-select-value-0" tabindex="0"></div>
      <label id="rating-label" for="rating">Rating</label>
      <div id="rating" role="slider" aria-labelledby="rating-label" tabindex="0"></div>
      <div inert><label>Inert, left out as axe leaves it</label></div>
    </main>
  `);
  expect(await orphanLabels(page)).toEqual([
    '<label>Orphan</label>',
    '<label for="missing">Points to nothing</label>',
    '<label id="rating-label" for="rating">Rating</label>',
  ]);
});
