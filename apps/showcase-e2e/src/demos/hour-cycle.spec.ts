import { expect, test } from '../test';

/**
 * The user's clock (`injectHourCycle()`, kept as the cookie `sc-hour-cycle`):
 * 24 hours in an English app — 15:05, no AM/PM — as a reader in the Maghreb
 * would choose, whatever the locale's habit. The parts' own `hourCycle`
 * comes after it, the locale's last.
 */
const parts = [
  ['Time Input', '/demos/time-input/time-input-usage-demo'],
  ['Date Time Input', '/demos/date-time-input/date-time-input-usage-demo'],
  ['Time Clock', '/demos/time-clock/basic-time-clock-demo'],
  ['Time Picker', '/demos/time-picker/time-picker-usage-demo'],
  ['Scheduler', '/demos/scheduler/basic-scheduler-demo'],
] as const;

for (const [name, path] of parts)
  test(`${name}: the user's 24-hour clock, no AM/PM`, async ({
    page,
    baseURL,
  }) => {
    await page.context().addCookies([
      {
        name: 'sc-hour-cycle',
        value: 'h23',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(path);
    const root = page.locator('app-root');
    // The part is there, with its times or its fields.
    await expect(root.locator('*').first()).toBeAttached();
    // What it shows — its text, its fields' values, its value texts — has
    // no AM or PM.
    await expect
      .poll(() =>
        root.evaluate((element) =>
          [
            (element as HTMLElement).innerText,
            ...[...element.querySelectorAll('input')].map((i) => i.value),
            ...[...element.querySelectorAll('[aria-valuetext]')].map(
              (e) => e.getAttribute('aria-valuetext') ?? '',
            ),
          ].join(' '),
        ),
      )
      .not.toMatch(/\b(AM|PM)\b/);
  });
