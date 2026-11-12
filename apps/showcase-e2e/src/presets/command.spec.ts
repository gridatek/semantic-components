import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Command in its preset', () => {
  test(`the command and its parts have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/command/command-usage-demo');
    for (const [target, wanted, what] of [
      // The frame round it (scFrame), over the root's corners.
      [
        page.locator('[data-slot=command]'),
        `${styles.command.root} ${styles.frame}`,
        'root',
      ],
      [page.locator('[role=combobox]'), styles.command.input, 'input'],
      [page.locator('[role=listbox]'), styles.command.list, 'list'],
      [page.locator('[role=group]').first(), styles.command.group, 'group'],
      [
        page.locator('[data-slot=command-group-label]').first(),
        styles.command.groupLabel,
        'group label',
      ],
      [page.locator('[role=option]').first(), styles.command.item, 'item'],
      [
        page.locator('[data-slot=command-shortcut]').first(),
        styles.command.shortcut,
        'shortcut',
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
