import { expect, test } from '../test';

/**
 * English with the user's Arabic-Indic digits (`sc-numbering-system`
 * `arab`): to the bidi algorithm these digits are "Arabic numbers", and what
 * stands between two runs of them (", ", " – ", " / ") is laid out right to
 * left — "Nov ٢٧, ٢٠٢٦" drawn "Nov ٢٠٢٦ ,٢٧", "١:٢٣ / ٤:٥٦" drawn
 * "٤:٥٦ / ١:٢٣". The parts keep them in order. Checked where it's drawn:
 * on each line of a part's text, its digit runs left to right as written,
 * across elements too (a player's two times, a field's segments).
 */
const parts = [
  ['Scheduler', '/demos/scheduler/basic-scheduler-demo'],
  // Each time a flex item, laid out apart: in order already — kept so.
  ['Media Player', '/demos/media-player/media-player-usage-demo'],
  // Its segments, flex items too.
  ['Date Time Input', '/demos/date-time-input/date-time-input-usage-demo'],
] as const;

for (const [name, path] of parts)
  test(`${name}: Arabic-Indic digits in English drawn in order`, async ({
    page,
    baseURL,
  }) => {
    await page.context().addCookies([
      {
        name: 'sc-numbering-system',
        value: 'arab',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(path);
    // The part has written its digits.
    await expect(page.locator('app-root')).toContainText(/[\u0660-\u0669]/);
    const wrong = await page.locator('app-root').evaluate((root) => {
      const runs: {
        left: number;
        top: number;
        text: string;
        block: Element;
      }[] = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = (node as Text).data;
        for (const match of text.matchAll(
          /[\u0660-\u0669](?:[٠-٬:/.,]*[\u0660-\u0669])?/g,
        )) {
          const range = document.createRange();
          range.setStart(node, match.index ?? 0);
          range.setEnd(node, (match.index ?? 0) + match[0].length);
          const rect = range.getBoundingClientRect();
          if (!rect.width) continue;
          // The runs of one line of one block: its nearest block parent.
          let block = node.parentElement as Element;
          while (
            block.parentElement &&
            getComputedStyle(block).display.startsWith('inline')
          )
            block = block.parentElement;
          runs.push({ left: rect.left, top: rect.top, text: match[0], block });
        }
      }
      const out: string[] = [];
      for (let i = 1; i < runs.length; i++) {
        const [a, b] = [runs[i - 1], runs[i]];
        const sameLine = a.block === b.block && Math.abs(a.top - b.top) < 2;
        if (sameLine && b.left < a.left) out.push(`${a.text} … ${b.text}`);
      }
      return out;
    });
    expect(wrong).toEqual([]);
  });
