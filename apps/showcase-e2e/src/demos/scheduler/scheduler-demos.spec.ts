import { type Page, expect, test } from '../../test';

const title = (page: Page) => page.locator('[scSchedulerTitle]');
const event = (page: Page, name: string) =>
  page.locator('[scSchedulerEvent]', { hasText: name });
/** The day the keyboard is on in a month: its data-day-button. */
const focusedDay = (page: Page) =>
  page.evaluate(
    () => (document.activeElement as HTMLElement | null)?.dataset['dayButton'],
  );

// Midday on a Thursday: today's events are all in the day.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime('2026-10-15T12:00:00');
});

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/scheduler/basic-scheduler-demo');
    // Its text first: the element is there before its week is written.
    await expect(title(page)).toHaveText(/\d{4}/);
  });

  test('previous, next and today move the week', async ({ page }) => {
    const shown = await title(page).textContent();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(title(page)).not.toHaveText(shown ?? '');
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(title(page)).toHaveText(shown ?? '');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Today' }).click();
    await expect(title(page)).toHaveText(shown ?? '');
  });

  test('overlapping events sit side by side', async ({ page }) => {
    await expect(event(page, 'Design review')).toBeVisible();
    const review = await event(page, 'Design review').boundingBox();
    const oneOnOne = await event(page, '1:1 with Sam').boundingBox();
    // Overlapping in time (vertically), apart in width.
    expect(oneOnOne!.y).toBeLessThan(review!.y + review!.height);
    expect(oneOnOne!.x).toBeGreaterThanOrEqual(review!.x + review!.width - 1);
  });

  test('the views switch, pressed while shown — month, day, agenda', async ({
    page,
  }) => {
    const month = page.getByRole('button', { name: 'Month' });
    await month.click();
    await expect(month).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('grid', { name: 'October 2026' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Day', exact: true }).click();
    await expect(title(page)).toHaveText('Thursday, October 15, 2026');

    await page.getByRole('button', { name: 'Agenda' }).click();
    await expect(title(page)).toHaveText('October 2026');
    await expect(
      page
        .getByRole('list', { name: 'Thursday, October 15, 2026' })
        .getByRole('button', { name: /Stand-up/ }),
    ).toBeVisible();
  });

  test("a month's day number opens the day", async ({ page }) => {
    await page.getByRole('button', { name: 'Month' }).click();
    await page
      .getByRole('button', { name: 'Tuesday, October 20, 2026' })
      .click();
    await expect(title(page)).toHaveText('Tuesday, October 20, 2026');
    await expect(
      page.getByRole('button', { name: 'Day', exact: true }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  test('the month is one Tab stop on its days; the keys move it', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Month' }).click();
    const grid = page.getByRole('grid', { name: 'October 2026' });
    await expect(grid).toBeVisible();
    await expect(grid.locator('[data-day-button][tabindex="0"]')).toHaveCount(
      1,
    );
    const today = page.getByRole('button', {
      name: 'Thursday, October 15, 2026',
    });
    await expect(today).toHaveAttribute('tabindex', '0');
    await today.focus();
    await expect(today).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect.poll(() => focusedDay(page)).toBe('2026-10-16');
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => focusedDay(page)).toBe('2026-10-23');
    await page.keyboard.press('Home');
    await expect.poll(() => focusedDay(page)).toBe('2026-10-18');
    // Past the month: the next one shows.
    await page.keyboard.press('PageDown');
    await expect.poll(() => focusedDay(page)).toBe('2026-11-18');
    await expect(title(page)).toHaveText('November 2026');
    await page.keyboard.press('Enter');
    await expect(title(page)).toHaveText('Wednesday, November 18, 2026');
  });

  test('an event is yours to handle: here, selected', async ({ page }) => {
    await event(page, 'Stand-up').click();
    await expect(page.getByText('Selected: Stand-up')).toBeVisible();
  });
});

test('Month: a crowded day shows how many more, and opens the day', async ({
  page,
}) => {
  await page.goto('/demos/scheduler/month-scheduler-demo');
  // Tomorrow has four events: one, then "3 more".
  const more = page.getByRole('button', { name: '3 more' });
  await expect(more).toBeVisible();
  await more.click();
  await expect(title(page)).toHaveText('Friday, October 16, 2026');
});

test('Over days: a bar across its days, going on into the next week', async ({
  page,
}) => {
  await page.goto('/demos/scheduler/multi-day-scheduler-demo');
  const trip = event(page, 'Trip to Lisbon');
  // Tuesday 13 to Sunday 18: Tuesday–Saturday, then Sunday in the next week.
  await expect(trip).toHaveCount(2);
  const day = await page
    .getByRole('button', { name: 'Wednesday, October 14, 2026' })
    .boundingBox();
  const cell = await page.locator('[data-day="2026-10-14"]').boundingBox();
  const first = await trip.first().boundingBox();
  expect(first!.width).toBeGreaterThan(cell!.width * 4.5);
  expect(day).toBeTruthy();
  // An overnight event is a bar too, over its two days.
  const launch = await event(page, 'Night launch').boundingBox();
  expect(launch!.width).toBeGreaterThan(cell!.width * 1.5);
});

test('Agenda: the days with events, each a list; an empty month says so', async ({
  page,
}) => {
  await page.goto('/demos/scheduler/agenda-scheduler-demo');
  await expect(
    page.getByRole('list', { name: 'Saturday, October 17, 2026' }),
  ).toContainText('Conference');
  await expect(
    page.getByRole('list', { name: 'Sunday, October 18, 2026' }),
  ).toContainText('Conference');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('No events this month.')).toBeVisible();
});

test.describe('Editable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/scheduler/editable-scheduler-demo');
    await expect(event(page, 'Write the brief')).toBeVisible();
  });

  const time = (page: Page, name: string) => event(page, name).locator('time');
  const last = (page: Page) => page.getByTestId('last');

  test('Alt and the arrows move and resize an event; the keyboard stays on it', async ({
    page,
  }) => {
    const brief = event(page, 'Write the brief');
    await brief.focus();
    await expect(brief).toBeFocused();
    await page.keyboard.press('Alt+ArrowDown');
    await expect(time(page, 'Write the brief')).toHaveText('9:15 – 10:15 AM');
    await expect(last(page)).toHaveText('Moved Write the brief');
    await expect(event(page, 'Write the brief')).toBeFocused();

    await page.keyboard.press('Alt+Shift+ArrowDown');
    await expect(time(page, 'Write the brief')).toHaveText('9:15 – 10:30 AM');

    const before = (await event(page, 'Write the brief').boundingBox())?.x ?? 0;
    await page.keyboard.press('Alt+ArrowRight');
    await expect
      .poll(
        async () =>
          (await event(page, 'Write the brief').boundingBox())?.x ?? 0,
      )
      .toBeGreaterThan(before + 20);
    await expect(event(page, 'Write the brief')).toBeFocused();
  });

  test('a drag moves an event, its bottom edge resizes it', async ({
    page,
  }) => {
    const review = event(page, 'Review designs');
    await expect(time(page, 'Review designs')).toHaveText(
      '11:00 AM – 12:30 PM',
    );
    let box = (await review.boundingBox())!;
    const hour = await page.evaluate(
      () =>
        document
          .querySelector(
            '[scSchedulerTimeGrid] .h-\\(--sc-scheduler-hour-height\\)',
          )!
          .getBoundingClientRect().height,
    );
    // Two hours down.
    await page.mouse.move(box.x + box.width / 2, box.y + 10);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 10 + hour, {
      steps: 4,
    });
    await page.mouse.move(box.x + box.width / 2, box.y + 10 + hour * 2, {
      steps: 4,
    });
    await page.mouse.up();
    await expect(time(page, 'Review designs')).toHaveText('1:00 – 2:30 PM');
    await expect(last(page)).toHaveText('Moved Review designs');

    // Its bottom edge, an hour down: it ends an hour later.
    box = (await review.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height - 2);
    await page.mouse.down();
    await page.mouse.move(
      box.x + box.width / 2,
      box.y + box.height - 2 + hour,
      {
        steps: 4,
      },
    );
    await page.mouse.up();
    await expect(time(page, 'Review designs')).toHaveText('1:00 – 3:30 PM');
  });

  test('an empty time picked — a click, or the keys in the hours — adds one', async ({
    page,
  }) => {
    // A click in Friday's column, away from the events.
    const friday = page.getByRole('group', {
      name: 'Friday, October 16, 2026',
    });
    const box = (await friday.boundingBox())!;
    await friday.click({
      position: { x: box.width / 2, y: box.height * 0.75 },
    });
    await expect(last(page)).toHaveText('Added New task 1');
    await expect(event(page, 'New task 1')).toBeVisible();

    // The keys: the hours focused, a slot down, Enter.
    const hours = page.locator('[scSchedulerTimeGrid] > [tabindex="0"]');
    await hours.focus();
    await expect(hours).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(last(page)).toHaveText('Added New task 2');
    await expect(time(page, 'New task 2')).toHaveText('8:15 – 8:30 AM');
  });

  test('in the month, a drag over days picks them; a drag of an event moves it', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Month' }).click();
    await expect(page.getByRole('grid')).toBeVisible();
    const from = (await page.locator('[data-day="2026-10-20"]').boundingBox())!;
    const to = (await page.locator('[data-day="2026-10-22"]').boundingBox())!;
    await page.mouse.move(from.x + from.width / 2, from.y + from.height - 8);
    await page.mouse.down();
    await page.mouse.move(to.x + to.width / 2, to.y + to.height - 8, {
      steps: 5,
    });
    await page.mouse.up();
    await expect(last(page)).toHaveText('Added New task 1');
    const cell = from.width;
    await expect
      .poll(
        async () => (await event(page, 'New task 1').boundingBox())?.width ?? 0,
      )
      .toBeGreaterThan(cell * 2.5);

    // The task on the 15th, dragged to the 16th.
    const brief = event(page, 'Write the brief');
    const box = (await brief.boundingBox())!;
    const target = (await page
      .locator('[data-day="2026-10-16"]')
      .boundingBox())!;
    await page.mouse.move(box.x + 10, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(target.x + 10, box.y + box.height / 2, { steps: 5 });
    await page.mouse.up();
    await expect(last(page)).toHaveText('Moved Write the brief');
    await expect
      .poll(async () => (await brief.boundingBox())?.x ?? 0)
      .toBeGreaterThan(box.x + cell / 2);
  });
});

test('RTL: in the month, ← goes on to the next day', async ({ page }) => {
  await page.goto('/demos/scheduler/rtl-scheduler-demo');
  await page.getByRole('button', { name: 'شهر' }).click();
  const today = page.locator('[data-day-button="2026-10-15"]');
  await expect(today).toHaveAttribute('tabindex', '0');
  await today.focus();
  await expect(today).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => focusedDay(page)).toBe('2026-10-16');
});
