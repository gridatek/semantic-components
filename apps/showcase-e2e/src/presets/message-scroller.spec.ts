import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Message Scroller in its preset', () => {
  test(`the rows' gap and the button have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/message-scroller/message-scroller-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="message-scroller-content"]').first(),
        // The demo pads it (p-4).
        `${styles.messageScrollerContent} p-4`,
        'content',
      ],
      [
        page.locator('[data-slot="message-scroller-button"]').first(),
        // The part's colours over the button's (twMerge keeps the later).
        `${styles.button({ variant: 'secondary', size: 'icon-sm' })} border-border bg-background text-foreground hover:bg-muted hover:text-foreground transition-[translate,scale,opacity]`,
        'button',
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
