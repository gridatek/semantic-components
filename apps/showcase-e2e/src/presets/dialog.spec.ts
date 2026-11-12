import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Dialog in its preset', () => {
  test(`the dialog, its title and its closes have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/dialog/dialog-usage-demo');
    await page.getByRole('button', { name: 'Open Dialog' }).click();
    for (const [target, wanted, what] of [
      // The demo narrows it (sm:max-w-sm), as shadcn's does; its full width
      // is w-screen (the CDK's pane gives w-full nothing to fill).
      [
        page.getByRole('dialog'),
        `${styles.dialog.content} w-screen sm:max-w-sm`,
        'dialog',
      ],
      [
        page.getByRole('heading', { name: 'Edit profile' }),
        styles.dialog.title,
        'title',
      ],
      // The ✕ and Cancel: the preset's button, each its variant and size.
      [
        page.getByRole('button', { name: 'Close' }),
        styles.button({ variant: 'ghost', size: 'icon-sm' }),
        'the ✕',
      ],
      [
        page.getByRole('button', { name: 'Cancel' }),
        styles.button({ variant: 'outline', size: 'default' }),
        'Cancel',
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
