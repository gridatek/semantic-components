import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/gantt/${name}-gantt-demo`;
const row = (page: Page, name: string | RegExp) =>
  page.getByRole('row', { name });
const bar = (page: Page, name: string | RegExp) =>
  row(page, name).locator('[data-slot=gantt-bar]');
/** A bar's dates as read out: "Nov 2 – 5, 2026" (thin spaces around the dash). */
const dates = (text: string) => new RegExp(text.replace(/ – /g, '\\s–\\s'));

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Project Plan: a tree grid of bars, summaries, links and today', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(page.getByRole('treegrid', { name: 'Plan' })).toBeVisible();
  await expect(bar(page, /^Research/)).toHaveAttribute('data-kind', 'task');
  await expect(bar(page, /^Design (?!review)/).first()).toHaveAttribute(
    'data-kind',
    'summary',
  );
  // Read with the row: its dates and progress.
  await expect(row(page, /^Research/)).toContainText(dates('Nov 2 – 5, 2026'));
  await expect(row(page, /^Wireframes/)).toContainText('60%');
  // Six dependencies, six arrows.
  await expect(
    page.locator('[data-slot=gantt-links] path[stroke]'),
  ).toHaveCount(6);
  await expect(page.locator('[data-slot=gantt-marker]')).toHaveText('Today');
  // 32px a day: Research (4 days) is 128px wide.
  await expect(bar(page, /^Research/)).toHaveCSS('width', '128px');
});

test('Project Plan: Alt+arrows move a bar, its end, its progress — announced', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const url = page.url();
  const research = row(page, /^Research/);
  await focus(research);
  await press(page, 'Alt+ArrowRight');
  await expect(research).toContainText(dates('Nov 3 – 6, 2026'));
  await expect(page.getByRole('status')).toHaveText(dates('Nov 3 – 6, 2026'));
  // The parent follows its children (the demo's data does it).
  await expect(row(page, /^Design (?!review)/)).toContainText(
    dates('Nov 3 – 13, 2026'),
  );
  await press(page, 'Alt+Shift+ArrowRight');
  await expect(research).toContainText(dates('Nov 3 – 7, 2026'));
  await press(page, 'Alt+Shift+ArrowLeft');
  await press(page, 'Alt+ArrowLeft');
  await expect(research).toContainText(dates('Nov 2 – 5, 2026'));
  // Alt+← is not the browser's Back here.
  expect(page.url()).toBe(url);
  await expect(research).toBeFocused();

  const wireframes = row(page, /^Wireframes/);
  await focus(wireframes);
  await press(page, 'Alt+ArrowUp');
  await expect(wireframes).toContainText('70%');
  await expect(page.getByRole('status')).toHaveText('70%');
  // A summary has no bar of its own to move.
  const design = row(page, /^Design (?!review)/);
  await focus(design);
  await press(page, 'Alt+ArrowRight');
  await expect(design).toContainText(dates('Nov 2 – 13, 2026'));
});

test('Project Plan: dragging a bar, its end and its progress', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const review = bar(page, /^Design review/);
  await expect(review).toBeVisible();
  // Two days later: 64px.
  let box = (await review.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2, {
    steps: 4,
  });
  await page.mouse.move(box.x + box.width / 2 + 64, box.y + box.height / 2, {
    steps: 4,
  });
  await page.mouse.up();
  await expect(row(page, /^Design review/)).toContainText(
    dates('Nov 13 – 15, 2026'),
  );

  // Its end, a day later.
  box = (await review.boundingBox())!;
  const end = review.locator('[data-handle=end]');
  const endBox = (await end.boundingBox())!;
  await page.mouse.move(endBox.x + endBox.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(endBox.x + endBox.width / 2 + 32, box.y + 10, {
    steps: 4,
  });
  await page.mouse.up();
  await expect(row(page, /^Design review/)).toContainText(
    dates('Nov 13 – 16, 2026'),
  );

  // Progress, to the middle.
  const wireframes = bar(page, /^Wireframes/);
  await wireframes.hover();
  const handle = wireframes.locator('[data-handle=progress]');
  const handleBox = (await handle.boundingBox())!;
  const barBox = (await wireframes.boundingBox())!;
  await page.mouse.move(
    handleBox.x + handleBox.width / 2,
    handleBox.y + handleBox.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(barBox.x + barBox.width / 2, handleBox.y, { steps: 4 });
  await page.mouse.up();
  await expect(row(page, /^Wireframes/)).toContainText('50%');
});

test('Scales: days, weeks from Monday, months', async ({ page }) => {
  await page.goto(demo('scales'));
  const lower = page.locator('[data-slot=gantt-scale] > div').nth(1);
  await expect(lower).toContainText('1/4');
  await page.getByRole('button', { name: 'Months' }).click();
  await expect(lower).toContainText('Feb');
  await expect(bar(page, /^Alpha/)).toHaveCSS('width', `${40 * 4}px`);
  await page.getByRole('button', { name: 'Days' }).click();
  await expect(bar(page, /^Alpha/)).toHaveCSS('width', `${40 * 32}px`);
});

test('Milestones, Read Only: diamonds, links, a marker; nothing moves', async ({
  page,
}) => {
  await page.goto(demo('milestones'));
  await expect(bar(page, /^Kick-off/)).toHaveAttribute(
    'data-kind',
    'milestone',
  );
  await expect(row(page, /^Kick-off/)).toContainText(dates('Nov 2, 2026'));
  await expect(
    page.locator('[data-slot=gantt-links] path[stroke]'),
  ).toHaveCount(4);
  await expect(page.locator('[data-slot=gantt-marker]')).toHaveText(
    'Code freeze',
  );
  const spec = row(page, /^Specification/);
  await focus(spec);
  await press(page, 'Alt+ArrowRight');
  await expect(spec).toContainText(dates('Nov 3 – 9, 2026'));
  await expect(
    bar(page, /^Specification/).locator('[data-handle]'),
  ).toHaveCount(0);
});

test('RTL: the timeline runs from the right; Alt+← moves later', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const plan = bar(page, /^التخطيط/);
  const build = bar(page, /^التطوير/);
  expect((await plan.boundingBox())!.x).toBeGreaterThan(
    (await build.boundingBox())!.x,
  );
  const planRow = row(page, /^التخطيط/);
  const before = (await plan.boundingBox())!.x;
  await focus(planRow);
  await press(page, 'Alt+ArrowLeft');
  await expect
    .poll(async () => (await plan.boundingBox())!.x)
    .toBe(before - 32);
});
