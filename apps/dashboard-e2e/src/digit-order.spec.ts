import { expect, test } from '@playwright/test';

/**
 * English with the user's Arabic-Indic digits: to the bidi algorithm they
 * are "Arabic numbers", and what stands between two runs of them (", ") is
 * laid out right to left — "Nov ٢٧, ٢٠٢٦" drawn "Nov ٢٠٢٦ ,٢٧". The library's
 * formatters keep them in order; on each line of a block, its runs left to
 * right as written.
 */
const pages = [
  '/',
  '/apps/tickets',
  '/apps/email',
  '/pages/tables',
  '/apps/chats',
];

for (const path of pages)
  test(`${path}: Arabic-Indic digits in English, drawn in order`, async ({
    page,
    baseURL,
  }) => {
    await page.context().addCookies([
      { name: 'dashboard-locale', value: 'en', url: baseURL ?? '' },
      { name: 'dashboard-numbering-system', value: 'arab', url: baseURL ?? '' },
    ]);
    await page.goto(path);
    await expect(page.locator('body')).toContainText(/[\u0660-\u0669]/, {
      timeout: 15_000,
    });
    await expect
      .poll(() =>
        page.locator('body').evaluate((root) => {
          const runs: {
            left: number;
            top: number;
            text: string;
            block: Element;
          }[] = [];
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const text = (node as Text).data;
            for (const m of text.matchAll(
              /[\u0660-\u0669](?:[٠-٬:/.,]*[\u0660-\u0669])?/g,
            )) {
              const range = document.createRange();
              range.setStart(node, m.index ?? 0);
              range.setEnd(node, (m.index ?? 0) + m[0].length);
              const rect = range.getBoundingClientRect();
              if (!rect.width) continue;
              let block = node.parentElement as Element;
              while (
                block.parentElement &&
                getComputedStyle(block).display.startsWith('inline')
              )
                block = block.parentElement;
              runs.push({ left: rect.left, top: rect.top, text: m[0], block });
            }
          }
          const wrong: string[] = [];
          for (let i = 1; i < runs.length; i++) {
            const [a, b] = [runs[i - 1], runs[i]];
            if (
              a.block === b.block &&
              Math.abs(a.top - b.top) < 2 &&
              b.left < a.left
            )
              wrong.push(`${a.text} … ${b.text}`);
          }
          return wrong;
        }),
      )
      .toEqual([]);
  });
