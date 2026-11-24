import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Accordion in its style', () => {
  test(`the item and its trigger have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/accordion/accordion-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[scAccordionItem]').first(),
        styles.accordion.item,
        'item',
      ],
      [
        page.locator('button[scAccordionTrigger]').first(),
        styles.accordion.trigger,
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
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
