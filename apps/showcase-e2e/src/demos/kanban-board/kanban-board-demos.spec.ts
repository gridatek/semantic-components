import { collectErrors, press } from '../../interaction';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/kanban-board/${name}-kanban-board-demo`;
const column = (page: Page, name: string) =>
  page.getByRole('list', { name: new RegExp(`^${name}`) });
const card = (page: Page, title: string) =>
  page.locator('[data-slot="kanban-card"]', { hasText: title });
/** A column's cards' texts, in order. */
const titles = (list: Locator) =>
  list
    .locator('[data-slot="kanban-card"]')
    .evaluateAll((cards) => cards.map((c) => c.textContent?.trim() ?? ''));
const said = (page: Page) => page.locator('.cdk-live-announcer-element');
/** Where it is on screen. */
async function box(locator: Locator) {
  const found = await locator.boundingBox();
  if (!found) throw new Error('not shown');
  return found;
}

/** Drags `from` with the mouse to a point of `to` (its middle by default). */
async function drag(
  page: Page,
  from: Locator,
  to: Locator,
  at: { x?: number; y?: number } = {},
): Promise<void> {
  const start = await from.boundingBox();
  const end = await to.boundingBox();
  if (!start || !end) throw new Error('not shown');
  await page.mouse.move(start.x + 20, start.y + start.height / 2);
  await page.mouse.down();
  await page.mouse.move(start.x + 30, start.y + start.height / 2 + 5, {
    steps: 3,
  });
  await page.mouse.move(
    end.x + (at.x ?? end.width / 2),
    end.y + (at.y ?? end.height / 2),
    { steps: 12 },
  );
  await page.mouse.up();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Pointer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('basic'));
  });

  test('a card dragged to another column, at the place it is let go', async ({
    page,
  }) => {
    await drag(
      page,
      card(page, 'Plan the next sprint'),
      card(page, 'Fix the login redirect'),
      { y: 2 },
    );
    await expect
      .poll(() => titles(column(page, 'In progress')))
      .toEqual([
        'Design the settings page',
        'Plan the next sprint',
        'Fix the login redirect',
      ]);
    await expect
      .poll(() => titles(column(page, 'To do')))
      .toEqual(['Write the release notes', 'Update the dependencies']);
    await expect(card(page, 'Plan the next sprint')).not.toHaveAttribute(
      'data-dragging',
    );
    await expect(card(page, 'Plan the next sprint')).toHaveCSS(
      'translate',
      'none',
    );
  });

  test('within a column: reordered', async ({ page }) => {
    const todo = column(page, 'To do');
    await drag(
      page,
      card(page, 'Write the release notes'),
      card(page, 'Update the dependencies'),
      { y: 30 },
    );
    await expect
      .poll(() => titles(todo))
      .toEqual([
        'Plan the next sprint',
        'Update the dependencies',
        'Write the release notes',
      ]);
  });

  test('while dragged: marked, followed; Escape puts it back', async ({
    page,
  }) => {
    const moving = card(page, 'Write the release notes');
    const at = await box(moving);
    await page.mouse.move(at.x + 20, at.y + 10);
    await page.mouse.down();
    await page.mouse.move(at.x + 300, at.y + 40, { steps: 10 });
    await expect(moving).toHaveAttribute('data-dragging');
    await expect(column(page, 'In progress')).toHaveAttribute('data-over');
    await press(page, 'Escape');
    await page.mouse.up();
    await expect(moving).not.toHaveAttribute('data-dragging');
    await expect
      .poll(() => titles(column(page, 'To do')))
      .toEqual([
        'Write the release notes',
        'Plan the next sprint',
        'Update the dependencies',
      ]);
  });

  test('touch: a hold, then a drag; a quick swipe is a scroll', async ({
    page,
  }) => {
    const touch = async (target: Locator, type: string, x: number, y: number) =>
      target.dispatchEvent(type, {
        pointerType: 'touch',
        pointerId: 7,
        isPrimary: true,
        clientX: x,
        clientY: y,
        bubbles: true,
      });
    const moving = card(page, 'Update the dependencies');
    const from = await box(moving);
    const to = await box(column(page, 'Done'));
    const [x, y] = [from.x + 20, from.y + 10];

    // Swiped at once: no drag.
    await touch(moving, 'pointerdown', x, y);
    await touch(moving, 'pointermove', x + 40, y);
    await touch(moving, 'pointerup', x + 40, y);
    await expect(moving).not.toHaveAttribute('data-dragging');

    // Held, then moved: dragged.
    await touch(moving, 'pointerdown', x, y);
    // Held past the drag's wait.
    await new Promise((resolve) => setTimeout(resolve, 400));
    await touch(
      moving,
      'pointermove',
      to.x + to.width / 2,
      to.y + to.height - 4,
    );
    await expect(card(page, 'Update the dependencies')).toHaveAttribute(
      'data-dragging',
    );
    await touch(
      card(page, 'Update the dependencies'),
      'pointerup',
      to.x + to.width / 2,
      to.y + to.height - 4,
    );
    await expect
      .poll(() => titles(column(page, 'Done')))
      .toEqual(['Set up the CI', 'Update the dependencies']);
  });
});

test.describe('Keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('basic'));
  });

  test('Space lifts, arrows move, Space drops — each step said', async ({
    page,
  }) => {
    const moving = card(page, 'Plan the next sprint');
    await moving.focus();
    await press(page, 'Space');
    await expect(moving).toHaveAttribute('data-lifted');
    await expect(said(page)).toHaveText(
      'Lifted Plan the next sprint, in To do, 2 of 3.',
    );
    await press(page, 'ArrowRight');
    await expect(card(page, 'Plan the next sprint')).toBeFocused();
    await expect(said(page)).toHaveText(
      'Plan the next sprint: In progress, 2 of 3.',
    );
    await press(page, 'ArrowUp');
    await expect(said(page)).toHaveText(
      'Plan the next sprint: In progress, 1 of 3.',
    );
    // Tab, while lifted, stays.
    await press(page, 'Tab');
    await expect(card(page, 'Plan the next sprint')).toBeFocused();
    await press(page, 'Space');
    await expect(said(page)).toHaveText(
      'Dropped Plan the next sprint in In progress, 1 of 3.',
    );
    await expect(card(page, 'Plan the next sprint')).not.toHaveAttribute(
      'data-lifted',
    );
    await expect
      .poll(() => titles(column(page, 'In progress')))
      .toEqual([
        'Plan the next sprint',
        'Design the settings page',
        'Fix the login redirect',
      ]);
  });

  test('Escape puts it back', async ({ page }) => {
    await card(page, 'Set up the CI').focus();
    await press(page, 'Enter');
    await press(page, 'ArrowLeft');
    await press(page, 'ArrowLeft');
    await expect(said(page)).toHaveText('Set up the CI: To do, 1 of 4.');
    await press(page, 'Escape');
    await expect(said(page)).toHaveText('Set up the CI back in Done, 1 of 1.');
    await expect(card(page, 'Set up the CI')).toBeFocused();
    await expect
      .poll(() => titles(column(page, 'Done')))
      .toEqual(['Set up the CI']);
  });

  test('right to left: ← goes to the next column', async ({ page }) => {
    await page.evaluate(() =>
      document.documentElement.setAttribute('dir', 'rtl'),
    );
    await card(page, 'Set up the CI').focus();
    await press(page, 'Space');
    await press(page, 'ArrowLeft');
    await expect(said(page)).toHaveText(
      'Lifted Set up the CI, in Done, 1 of 1.',
    );
    await press(page, 'ArrowRight');
    await expect(said(page)).toHaveText('Set up the CI: In progress, 1 of 3.');
  });
});

test('Rich cards: Move to… through move()', async ({ page }) => {
  await page.goto(demo('rich'));
  await page.getByRole('button', { name: 'Move Customer interviews' }).click();
  await page.getByRole('menuitem', { name: 'Move to Done' }).click();
  await expect
    .poll(() => titles(column(page, 'Done')))
    .toEqual([
      expect.stringContaining('Customer interviews'),
      expect.stringContaining('Billing migration'),
    ]);
  // A press on the card's button is the button's, not a drag.
  await expect(card(page, 'Customer interviews')).not.toHaveAttribute(
    'data-dragging',
  );
});

test('From a flat list: each move written back', async ({ page }) => {
  await page.goto(demo('flat'));
  const stored = page.getByLabel('Stored issues');
  await expect(stored).toContainText('ISS-1 → todo');
  await drag(page, card(page, 'ISS-1'), column(page, 'Done'));
  await expect(stored).toContainText('ISS-1 → done');
  await expect(stored).toContainText('ISS-2 → doing');
});

test('Add and limit: an empty column takes a card; the limit is said', async ({
  page,
}) => {
  await page.goto(demo('add'));
  const done = column(page, 'Done');
  await drag(page, card(page, 'Send invites'), done);
  await expect.poll(() => titles(done)).toEqual(['Send invites']);

  await page.getByLabel('New card in To do').fill('Order the food');
  await page.getByLabel('New card in To do').press('Enter');
  await expect
    .poll(() => titles(column(page, 'To do')))
    .toContain('Order the food');

  await expect(page.getByText('Over the limit')).toHaveCount(0);
  await drag(page, card(page, 'Order the food'), column(page, 'In progress'));
  await drag(page, card(page, 'Send invites'), column(page, 'In progress'));
  await expect(page.getByText('Over the limit')).toBeVisible();
});
