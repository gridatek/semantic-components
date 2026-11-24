import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Attachment in its style', () => {
  test(`an attachment and its media have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/attachment/sizes-attachment-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="attachment"]').first(),
        // The demo widens it (w-full).
        `${styles.attachment.root({})} w-full`,
        'attachment',
      ],
      [
        page.locator('[data-slot="attachment-media"]').first(),
        styles.attachment.media({}),
        'media',
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
