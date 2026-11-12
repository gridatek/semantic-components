import type { ScPreset } from '@semantic-components/presets';
import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

/**
 * The classes a default button gets in a preset: its base, variant and size,
 * merged as `scButton` merges them (`cn`: a size's icon size wins over the
 * base's, so the base's isn't there).
 */
const classesOf = ({ button }: ScPreset) =>
  twMerge(button({ variant: 'default', size: 'default' }))
    .split(/\s+/)
    .filter(Boolean);

test.describe('Button in its preset', () => {
  test(`the button has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/button/default-button-demo');
    // Read until the button has its classes: the first render may not
    // have applied them yet.
    const target = page.getByRole('button', { name: 'Button' });
    await expect
      .poll(async () => {
        const have = new Set(
          ((await target.getAttribute('class')) ?? '').split(/\s+/),
        );
        return classesOf(styles).filter((c) => !have.has(c));
      }, `${preset} classes missing`)
      .toEqual([]);
  });
});
