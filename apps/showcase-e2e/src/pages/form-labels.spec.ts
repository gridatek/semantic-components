import { expect, test } from '@playwright/test';
import { formLabelProblems } from '../axe';

/**
 * WAVE's "Missing form label" and "Multiple form labels": a form control
 * with no name — hidden ones too (a file input's native picker), which axe
 * skips — or with two labels. Plain markup: no app.
 */
test('a control with no name, hidden too, is found, and one with two labels; one named by a label, aria-label or aria-labelledby is not', async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <input id="a" /><label for="a">A</label>
      <input aria-label="B" />
      <span id="c-name">C</span><input aria-labelledby="c-name" />
      <input type="file" hidden aria-hidden="true" tabindex="-1" class="picker" />
      <label for="d">D</label><label for="d">D again</label><input id="d" />
      <input type="hidden" name="token" />
      <button type="button">A button</button>
    </main>
  `);
  expect(await formLabelProblems(page)).toEqual([
    'no label: <input type="file" hidden="" aria-hidden="true" tabindex="-1" class="picker">',
    'two labels: <input id="d">',
  ]);
});
