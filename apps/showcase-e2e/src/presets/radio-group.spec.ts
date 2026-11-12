import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Radio Group in its preset', () => {
  test(`the group and a radio have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/radio-group/fieldset-radio-group-demo');
    for (const [target, wanted, what] of [
      [page.locator('[scRadioGroup]'), styles.radioGroup.group, 'group'],
      [
        page.locator('input[scRadio]').first(),
        `${styles.radioGroup.item} ${styles.radioGroup.dot}`,
        'radio',
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
