import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) =>
  `/demos/sortable-list-next/${name}-sortable-list-next-demo`;
const item = (page: Page, text: string) =>
  page.locator('[data-slot="sortable-list-item"]', { hasText: text });
const order = (page: Page, name: string) => page.getByTestId(`${name}-order`);
const said = (page: Page) => page.locator('.cdk-live-announcer-element');
/** A photo's item, by its picture's name. */
const photo = (page: Page, name: string) =>
  page.locator('[data-slot="sortable-list-item"]', {
    has: page.getByAltText(name, { exact: true }),
  });

/** Where it is on screen. */
async function box(locator: Locator) {
  const found = await locator.boundingBox();
  if (!found) throw new Error('not shown');
  return found;
}

/** Drags `from` by `grip` (its start, by default) to a point of `to`. */
async function drag(
  page: Page,
  from: Locator,
  to: Locator,
  at: { x: number; y: number },
  grip: Locator = from,
): Promise<void> {
  const start = await box(grip);
  const end = await box(to);
  await page.mouse.move(start.x + 8, start.y + start.height / 2);
  await page.mouse.down();
  await page.mouse.move(start.x + 14, start.y + start.height / 2 + 6, {
    steps: 3,
  });
  await page.mouse.move(end.x + end.width * at.x, end.y + end.height * at.y, {
    steps: 12,
  });
  await page.mouse.up();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('basic'));
  });

  test('dragged with the mouse: down, then up', async ({ page }) => {
    await drag(page, item(page, 'Performance'), item(page, 'Documentation'), {
      x: 0.5,
      y: 0.9,
    });
    await expect(order(page, 'basic')).toHaveText(
      'Customer support, Accessibility, New features, Documentation, Performance',
    );
    await drag(
      page,
      item(page, 'Documentation'),
      item(page, 'Customer support'),
      {
        x: 0.5,
        y: 0.1,
      },
    );
    await expect(order(page, 'basic')).toHaveText(
      'Documentation, Customer support, Accessibility, New features, Performance',
    );
    await expect(item(page, 'Documentation')).toHaveCSS('translate', 'none');
  });

  test('dragged by touch: a hold, then a move', async ({ page }) => {
    const touch = (target: Locator, type: string, x: number, y: number) =>
      target.dispatchEvent(type, {
        pointerType: 'touch',
        pointerId: 3,
        isPrimary: true,
        clientX: x,
        clientY: y,
        bubbles: true,
      });
    const moving = item(page, 'Customer support');
    const from = await box(moving);
    const to = await box(item(page, 'New features'));
    await touch(moving, 'pointerdown', from.x + 10, from.y + 10);
    // Held past the drag's wait.
    await new Promise((resolve) => setTimeout(resolve, 400));
    await touch(moving, 'pointermove', to.x + 10, to.y + to.height - 4);
    await expect(moving).toHaveAttribute('data-dragging');
    await touch(moving, 'pointerup', to.x + 10, to.y + to.height - 4);
    await expect(order(page, 'basic')).toHaveText(
      'Performance, Accessibility, New features, Customer support, Documentation',
    );
  });

  test('the keyboard: lift, move, drop — each step said', async ({ page }) => {
    await item(page, 'Accessibility').focus();
    await press(page, 'Space');
    await expect(item(page, 'Accessibility')).toHaveAttribute('data-lifted');
    await expect(said(page)).toHaveText('Lifted Accessibility, 3 of 5.');
    await press(page, 'ArrowUp');
    await press(page, 'ArrowUp');
    await expect(said(page)).toHaveText('Accessibility: 1 of 5.');
    await expect(item(page, 'Accessibility')).toBeFocused();
    await press(page, 'Space');
    await expect(said(page)).toHaveText('Dropped Accessibility at 1 of 5.');
    await expect(order(page, 'basic')).toHaveText(
      'Accessibility, Customer support, Performance, New features, Documentation',
    );

    // End, then Escape: back where it was.
    await press(page, 'Enter');
    await press(page, 'End');
    await expect(said(page)).toHaveText('Accessibility: 5 of 5.');
    await press(page, 'Escape');
    await expect(said(page)).toHaveText('Accessibility back at 1 of 5.');
    await expect(order(page, 'basic')).toHaveText(
      'Accessibility, Customer support, Performance, New features, Documentation',
    );
  });
});

test('Handle: only the grip drags; the checkbox stays a checkbox', async ({
  page,
}) => {
  await page.goto(demo('handle'));
  const task = item(page, 'Collect the figures');
  // A press on the label: no drag.
  const label = await box(task.getByText('Collect the figures'));
  await page.mouse.move(label.x + 5, label.y + 5);
  await page.mouse.down();
  await page.mouse.move(label.x + 5, label.y - 80, { steps: 8 });
  await expect(task).not.toHaveAttribute('data-dragging');
  await page.mouse.up();
  await expect(order(page, 'handle')).toHaveText(
    'Write the outline, Draft the introduction, Collect the figures, Ask for a review',
  );

  await drag(
    page,
    task,
    item(page, 'Write the outline'),
    { x: 0.5, y: 0.1 },
    task.locator('[data-slot="sortable-list-handle"]'),
  );
  await expect(order(page, 'handle')).toHaveText(
    'Collect the figures, Write the outline, Draft the introduction, Ask for a review',
  );

  const box2 = task.getByRole('checkbox');
  await box2.click();
  await expect(box2).toBeChecked();
});

test('Horizontal: along the row; ← → follow the reading direction', async ({
  page,
}) => {
  await page.goto(demo('horizontal'));
  await drag(page, item(page, 'Ship'), item(page, 'Plan'), { x: 0.1, y: 0.5 });
  await expect(order(page, 'horizontal')).toHaveText(
    'Ship, Plan, Design, Build, Test',
  );
  await item(page, 'Plan').focus();
  await press(page, 'Space');
  await press(page, 'ArrowRight');
  await press(page, 'Space');
  await expect(order(page, 'horizontal')).toHaveText(
    'Ship, Design, Plan, Build, Test',
  );

  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  await item(page, 'Plan').focus();
  await press(page, 'Space');
  await press(page, 'ArrowLeft');
  await press(page, 'Space');
  await expect(order(page, 'horizontal')).toHaveText(
    'Ship, Design, Build, Plan, Test',
  );
});

test('Grid: reading order; ← → by one, ↑ ↓ by a row', async ({ page }) => {
  await page.goto(demo('grid'));
  await drag(page, photo(page, 'Café'), photo(page, 'Summit'), {
    x: 0.2,
    y: 0.5,
  });
  await expect(order(page, 'grid')).toHaveText(
    'Coast, Forest, Gorge, Mountains, Shed, Café, Summit, Waterfall',
  );
  await photo(page, 'Coast').focus();
  await press(page, 'Space');
  await press(page, 'ArrowDown');
  await expect(said(page)).toHaveText('Coast: 5 of 8.');
  await press(page, 'ArrowRight');
  await press(page, 'Space');
  await expect(order(page, 'grid')).toHaveText(
    'Forest, Gorge, Mountains, Shed, Café, Coast, Summit, Waterfall',
  );
});

test('Move buttons: move(), one place at a time', async ({ page }) => {
  await page.goto(demo('buttons'));
  await expect(
    page.getByRole('button', { name: 'Move Opening theme up' }),
  ).toBeDisabled();
  await page.getByRole('button', { name: 'Move Slow morning up' }).click();
  await expect(order(page, 'buttons')).toHaveText(
    'Opening theme, Slow morning, Night drive, Last call',
  );
  // A press on a button is the button's, not a drag.
  await expect(item(page, 'Slow morning')).not.toHaveAttribute('data-dragging');
});

test('Disabled: not moved, not Tab stops', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(item(page, 'First')).not.toHaveAttribute('tabindex');
  await drag(page, item(page, 'First'), item(page, 'Third'), {
    x: 0.5,
    y: 0.9,
  });
  await expect(order(page, 'disabled')).toHaveText('First, Second, Third');

  await page.getByText('Locked', { exact: true }).click();
  await expect(item(page, 'First')).toHaveAttribute('tabindex', '0');
  await drag(page, item(page, 'First'), item(page, 'Third'), {
    x: 0.5,
    y: 0.9,
  });
  await expect(order(page, 'disabled')).toHaveText('Second, Third, First');
});
