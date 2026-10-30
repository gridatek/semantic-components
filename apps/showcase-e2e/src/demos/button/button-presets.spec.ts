import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expectNoA11yViolations } from '../../axe';
import { expect, test } from '../../test';

/** The presets, and each one's button base classes, from its source. */
const PRESETS = [
  'nova',
  'vega',
  'maia',
  'lyra',
  'mira',
  'luma',
  'sera',
  'rhea',
];
const baseOf = (preset: string) => {
  const source = readFileSync(
    resolve(__dirname, `../../../../../libs/presets/${preset}/src/button.ts`),
    'utf8',
  );
  const base = source.match(/cva\(\s*(["'`])([\s\S]*?)\1/)?.[2] ?? '';
  return base.split(/\s+/).filter(Boolean);
};

test.describe('Button in every preset', () => {
  for (const preset of PRESETS)
    test(`${preset}: the button has its preset's classes; no axe violation, light and dark`, async ({
      page,
      context,
      baseURL,
    }) => {
      // The preset the showcase's sheet saves, read when the app starts.
      await context.addCookies([
        { name: 'sc-preset', value: preset, url: baseURL! },
      ]);
      await page.goto('/demos/button/default-button-demo');
      const classes = await page
        .getByRole('button', { name: 'Button' })
        .getAttribute('class');
      const have = new Set((classes ?? '').split(/\s+/));
      const missing = baseOf(preset).filter((c) => !have.has(c));
      expect(missing, `${preset} classes missing`).toEqual([]);

      await page.goto('/docs/components/button');
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
