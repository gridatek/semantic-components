import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Questionnaire in its style', () => {
  test(`a question, a choice and its indicator have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/questionnaire/questionnaire-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="questionnaire-item"]').first(),
        styles.questionnaire.item,
        'item',
      ],
      [
        page.locator('[data-slot="questionnaire-choice"]').first(),
        styles.questionnaire.choice,
        'choice',
      ],
      [
        page.locator('[data-slot="questionnaire-choice-indicator"]').first(),
        styles.questionnaire.indicator,
        'indicator',
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
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
