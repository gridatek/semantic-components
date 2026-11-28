import { expect, test } from '@playwright/test';
import { smallText } from '../axe';

/**
 * WAVE's "Very small text": visible text of 10px or less. 11px is the floor
 * (`text-[0.6875rem]`). Plain markup: no app.
 */
test("visible text of 10px or less is found; 11px, hidden, or a PDF page's text layer, is not", async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <span style="font-size: 10px">Ten</span>
      <span style="font-size: 9.6px" aria-hidden="true">Shown, hidden from screen readers</span>
      <span style="font-size: 11px">Eleven</span>
      <span style="font-size: 8px; display: none">Not shown</span>
      <svg><text style="font-size: 6px">A chart's tick</text></svg>
      <div class="textLayer"><span style="font-size: 8px">A PDF page's words, at its zoom</span></div>
    </main>
  `);
  expect(await smallText(page)).toEqual([
    '10px: Ten',
    '9.6px: Shown, hidden from screen readers',
  ]);
});
