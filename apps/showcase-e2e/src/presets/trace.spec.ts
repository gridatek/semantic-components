import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Trace in its preset', () => {
  test(`a trace, its line and a collapsible's trigger have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/trace/trace-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="trace"]').first(),
        // The demo narrows it (max-w-sm).
        `${styles.trace.root} max-w-sm`,
        'trace',
      ],
      [
        page.locator('[data-slot="trace-line"]').nth(1),
        styles.trace.line,
        'line',
      ],
      [
        page.locator('[data-slot="trace-collapsible-trigger"]').first(),
        styles.trace.collapsibleTrigger,
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
