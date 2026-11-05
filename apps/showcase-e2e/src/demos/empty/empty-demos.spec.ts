import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/empty/${name}-empty-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a heading, why, and what to do — centred', async ({ page }) => {
  await page.goto('/demos/empty/empty-usage-demo');
  const title = page.getByRole('heading', {
    level: 2,
    name: 'No Projects Yet',
  });
  await expect(title).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Create Project' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Learn More' })).toBeVisible();
  const [root, heading] = [
    await box(page.locator('[scEmpty]')),
    await box(title),
  ];
  const centre = (b: { x: number; width: number }) => b.x + b.width / 2;
  expect(Math.abs(centre(root) - centre(heading))).toBeLessThan(2);
});

test('Outline: a dashed border', async ({ page }) => {
  await page.goto(demo('outline'));
  await expect(page.locator('[scEmpty]')).toHaveCSS(
    'border-top-style',
    'dashed',
  );
});

test('Input group: a named search inside it', async ({ page }) => {
  await page.goto(demo('input-group'));
  await expect(
    page.getByRole('textbox', { name: 'Search pages' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Contact support' }),
  ).toBeVisible();
});

test('Card: the empty state in a card, its actions a link and a button', async ({
  page,
}) => {
  await page.goto(demo('card'));
  await expect(
    page.getByRole('link', { name: 'Create project' }),
  ).toHaveAttribute('href', '#card');
  await expect(
    page.getByRole('button', { name: 'Import project' }),
  ).toBeVisible();
});

test('RTL: right to left', async ({ page }) => {
  await page.goto(demo('rtl'));
  await expectRtl(page.locator('[scEmpty]'));
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['usage', 'input-group', 'card', 'rtl']) {
    await page.goto(
      name === 'usage' ? '/demos/empty/empty-usage-demo' : demo(name),
    );
    await expectNoHorizontalScroll(page);
  }
});
