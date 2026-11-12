import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Attachment in its preset', () => {
  test(`an attachment and its media have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
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
        }, `${preset} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
