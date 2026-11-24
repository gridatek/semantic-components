import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Message in its style', () => {
  test(`a message, its content, header and footer have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/message/message-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="message"]').first(),
        styles.message.root,
        'message',
      ],
      [
        page.locator('[data-slot="message-content"]').first(),
        styles.message.content,
        'content',
      ],
      [
        page.locator('[data-slot="message-header"]').first(),
        styles.message.header,
        'header',
      ],
      [
        page.locator('[data-slot="message-footer"]').first(),
        styles.message.footer,
        'footer',
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
