import { type Locator, type Page, expect, test } from '../../test';

/** What the timer says: each Number Ticker's value, as screen readers get it. */
const values = (timer: Locator) => timer.locator('[scNumberTicker] .sr-only');

async function at(page: Page, url: string): Promise<void> {
  // A clock of our own: the test moves it on (it runs too, as the page loads).
  await page.clock.install({ time: '2026-11-21T10:00:00Z' });
  await page.goto(url);
}

test('Usage: the time left to the launch, rolling down second by second', async ({
  page,
}) => {
  await at(page, '/demos/countdown/countdown-usage-demo');
  const timer = page.getByRole('timer', { name: 'Time left until the launch' });
  // Days and hours: the seconds the page takes to load don't reach them.
  await expect(values(timer)).toHaveText(['12', '05', /^\d\d$/, /^\d\d$/]);
  await expect(timer).toContainText('Days');
  // A jump: each timer once, not every frame of the hour.
  await page.clock.fastForward(3_600_000);
  await expect(values(timer)).toHaveText(['12', '04', /^\d\d$/, /^\d\d$/]);
});

test.describe('Timer', () => {
  test.beforeEach(async ({ page }) => {
    await at(page, '/demos/countdown/timer-countdown-demo');
    await expect(values(page.getByRole('timer', { name: 'Timer' }))).toHaveText(
      ['05', '00'],
    );
  });

  test('Start counts down, Pause holds it, Reset starts again', async ({
    page,
  }) => {
    const timer = page.getByRole('timer', { name: 'Timer' });
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.runFor(2_000);
    await expect(values(timer)).toHaveText(['04', '58']);

    await page.getByRole('button', { name: 'Pause' }).click();
    await page.clock.runFor(5_000);
    await expect(values(timer)).toHaveText(['04', '58']);
    await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();

    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(values(timer)).toHaveText(['05', '00']);
  });

  test('at zero: "Time\'s up" announced, Start off', async ({ page }) => {
    await page.getByRole('button', { name: 'Start' }).click();
    await page.clock.fastForward(301_000);
    await expect(values(page.getByRole('timer', { name: 'Timer' }))).toHaveText(
      ['00', '00'],
    );
    await expect(page.getByRole('status')).toHaveText("Time's up.");
    await expect(page.getByRole('button', { name: 'Start' })).toBeDisabled();
  });
});

test('RTL: the units named in Arabic, by the locale', async ({ page }) => {
  await at(page, '/demos/countdown/rtl-countdown-demo');
  const timer = page.getByRole('timer', {
    name: 'الوقت المتبقي حتى الإطلاق',
  });
  await expect(values(timer)).toHaveCount(4);
  const day = new Intl.DisplayNames('ar', { type: 'dateTimeField' }).of('day');
  await expect(timer).toContainText(day ?? '');
  await expect(timer).not.toContainText('Days');
});
