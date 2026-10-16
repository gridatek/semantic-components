import { type Page, expect, test } from '@playwright/test';

const title = (page: Page) => page.locator('[data-slot="scheduler-title"]');
const event = (page: Page, name: string) =>
  page.locator('[data-slot="scheduler-event"]', { hasText: name });

test.describe('Basic Scheduler Demo', () => {
  test.beforeEach(async ({ page }) => {
    // Midday on a Thursday: today's events are all in the day.
    await page.clock.setFixedTime('2026-10-15T12:00:00');
    await page.goto('/demos/scheduler/basic-scheduler-demo');
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
    const review = await event(page, 'Design review').boundingBox();
    const oneOnOne = await event(page, '1:1 with Sam').boundingBox();
    expect(review && oneOnOne).toBeTruthy();
    // Overlapping in time (vertically), apart in width.
    expect(oneOnOne!.y).toBeLessThan(review!.y + review!.height);
    expect(oneOnOne!.x).toBeGreaterThanOrEqual(review!.x + review!.width - 1);
  });

  test('the views switch, pressed while shown', async ({ page }) => {
    const month = page.getByRole('button', { name: 'Month' });
    await month.click();
    await expect(month).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('table', { name: 'October 2026' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Day', exact: true }).click();
    await expect(title(page)).toHaveText('Thursday, October 15, 2026');
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

  test('an event is yours to handle: here, selected', async ({ page }) => {
    await event(page, 'Stand-up').click();
    await expect(page.getByText('Selected: Stand-up')).toBeVisible();
  });
});

test.describe('Month Scheduler Demo', () => {
  test('a crowded day shows how many more, and opens the day', async ({
    page,
  }) => {
    await page.clock.setFixedTime('2026-10-15T12:00:00');
    await page.goto('/demos/scheduler/month-scheduler-demo');
    // Tomorrow has four events: one, then "3 more".
    const more = page.getByRole('button', { name: '3 more' });
    await expect(more).toBeVisible();
    await more.click();
    await expect(title(page)).toHaveText('Friday, October 16, 2026');
  });
});
