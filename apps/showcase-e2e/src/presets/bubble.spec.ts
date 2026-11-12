import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Bubble in its preset', () => {
  test(`a bubble's content and reactions have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/bubble/reactions-bubble-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="bubble-content"]').first(),
        styles.bubble.content,
        'content',
      ],
      [
        page.locator('[data-slot="bubble-reactions"]').first(),
        // The first row: at the bottom, at the start.
        `${styles.bubble.reactions} bottom-0 translate-y-3/4 start-3`,
        'reactions',
      ],
    ] as const) {
      const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
      // Read until it has them all: the first render may not have them yet.
      await expect
        .poll(async () => {
          const have = new Set(
            ((await target.getAttribute('class')) ?? '').split(/\s+/),
          );
          return classes.filter((c) => !have.has(c));
        }, `${preset} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
