import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Input in its preset', () => {
  test(`the input has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/input/basic-input-demo');
    const target = page.getByRole('textbox', { name: 'Text' });
    const classes = twMerge(styles.input).split(/\s+/).filter(Boolean);
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
