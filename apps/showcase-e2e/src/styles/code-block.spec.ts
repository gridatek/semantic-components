import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Code Block in its style', () => {
  test(`the block and its header have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
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
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
