import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Message in its preset', () => {
  test(`a message, its content, header and footer have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
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
        }, `${preset} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
