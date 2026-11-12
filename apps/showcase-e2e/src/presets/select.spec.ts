import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Select in its preset', () => {
  test(`the trigger has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/select/select-usage-demo');
    const target = page.getByRole('combobox', { name: 'Theme' });
    // The demo widens it: w-full over the preset's w-fit.
    const classes = twMerge(`${styles.select.trigger} w-full`)
      .split(/\s+/)
      .filter(Boolean);
    // Read until it has them all: the first render may not have them yet.
    await expect
      .poll(async () => {
        const have = new Set(
          ((await target.getAttribute('class')) ?? '').split(/\s+/),
        );
        return classes.filter((c) => !have.has(c));
      }, `${preset} classes missing`)
      .toEqual([]);
  });
});
