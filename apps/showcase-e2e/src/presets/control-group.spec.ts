import { twMerge } from 'cn';
import { type Locator, expect, test } from '../test';
import { presetName, presetStyles } from './preset';

/** Classes, merged as the parts merge them (`cn`). */
const split = (classes: string) =>
  twMerge(classes).split(/\s+/).filter(Boolean);

/** The classes of `classes` the element lacks: read until it has them all. */
const expectClasses = (target: Locator, classes: string[], label: string) =>
  expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, label)
    .toEqual([]);

test.describe('Control Group in its preset', () => {
  test(`the group and its text have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/control-group/text-control-group-demo');
    await expectClasses(
      page.getByRole('group', { name: 'Website' }),
      split(styles.controlGroup({ orientation: 'horizontal' })),
      `${preset} group classes missing`,
    );
    await expectClasses(
      page.getByText('https://'),
      split(styles.controlGroupText),
      `${preset} text classes missing`,
    );
  });
});
