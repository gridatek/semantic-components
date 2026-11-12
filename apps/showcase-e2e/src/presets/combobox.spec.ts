import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Combobox in its preset', () => {
  test(`the popup, the list and an option have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/combobox/combobox-usage-demo');
    await page.getByRole('combobox').click();
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot=combobox-content]'),
        styles.combobox.popup,
        'popup',
      ],
      [page.getByRole('listbox'), styles.combobox.list, 'list'],
      [page.getByRole('option').first(), styles.combobox.item, 'item'],
      [
        page.locator('[data-slot=combobox-trigger]'),
        styles.combobox.triggerIcon,
        'trigger',
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
