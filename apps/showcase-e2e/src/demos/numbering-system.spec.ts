import { expect, test } from '../test';

/**
 * The user's numbering system (`injectNumberingSystem()`, kept as the cookie
 * `sc-numbering-system`): what the parts write follows it — here Arabic-Indic
 * digits in English demos. Calendar and Scheduler have their own, closer
 * checks; values and what is typed stay Latin.
 */
const parts = [
  ['Time Input', '/demos/time-input/time-input-usage-demo'],
  ['Date Time Input', '/demos/date-time-input/date-time-input-usage-demo'],
  ['Meter', '/demos/meter/meter-usage-demo'],
  ['Time Picker', '/demos/time-picker/time-picker-usage-demo'],
  ['Number Ticker', '/demos/number-ticker/number-ticker-usage-demo'],
  ['Waterfall', '/demos/waterfall/waterfall-usage-demo'],
  ['Media Player', '/demos/media-player/media-player-usage-demo'],
] as const;

for (const [name, path] of parts)
  test(`${name}: its numbers in the user's numbering system (Arabic-Indic)`, async ({
    page,
    baseURL,
  }) => {
    await page.context().addCookies([
      {
        name: 'sc-numbering-system',
        value: 'arab',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(path);
    // What the part wrote: its text, its fields' values, its value texts.
    await expect
      .poll(() =>
        page.evaluate(() => {
          const root = document.querySelector('app-root') as HTMLElement;
          const shown = [
            root.innerText,
            ...[...root.querySelectorAll('input')].map((i) => i.value),
            ...[...root.querySelectorAll('[aria-valuetext]')].map(
              (e) => e.getAttribute('aria-valuetext') ?? '',
            ),
          ].join(' ');
          return /[٠-٩]/.test(shown);
        }),
      )
      .toBe(true);
  });
