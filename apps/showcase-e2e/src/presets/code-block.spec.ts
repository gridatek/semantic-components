import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Code Block in its preset', () => {
  test(`the block and its header have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/code-block/code-block-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="code-block"]'),
        styles.codeBlock.root({}),
        'block',
      ],
      [
        page.locator('[data-slot="code-block-header"]'),
        styles.codeBlock.header,
        'header',
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
