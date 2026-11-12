import type { ScPreset } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { twMerge } from 'cn';
import { expectNoA11yViolations } from '../../axe';
import { expect, test } from '../../test';

/** Every preset, as the showcase's preset sheet lists them. */
const PRESETS: Record<string, ScPreset> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

test.describe('Message Scroller in every preset', () => {
  // A docs page and axe, twice: slow under load.
  test.slow();

  for (const [preset, styles] of Object.entries(PRESETS))
    test(`${preset}: the rows' gap and the button have their preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
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

      await page.goto('/docs/components/message-scroller');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
