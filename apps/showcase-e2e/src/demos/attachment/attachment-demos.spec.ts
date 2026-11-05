import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/attachment/${name}-attachment-demo`;
const usage = '/demos/attachment/attachment-usage-demo';
const attachments = (page: Page) => page.locator('[data-slot="attachment"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: images in a row the keyboard can scroll; an upload with its named spinner', async ({
  page,
}) => {
  await page.goto(usage);
  const row = page.getByRole('group', { name: 'Images' });
  await expect(row).toHaveAttribute('tabindex', '0');
  await expect(row.locator('img')).toHaveCount(3);
  await expect(page.getByRole('status', { name: 'Uploading' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Cancel upload' }),
  ).toHaveAttribute('type', 'button');
});

test('Image: square images; the remove button above the card’s link', async ({
  page,
}) => {
  await page.goto(demo('image'));
  const first = page.locator('[data-slot="attachment-media"]').first();
  await expect(first).toHaveAttribute('data-variant', 'image');
  const media = await box(first);
  expect(Math.abs(media.width - media.height)).toBeLessThan(2);
  // The link fills the card, named; the action sits above it.
  const link = page.getByRole('link', { name: 'Open cafe.jpg' });
  await expect(link).toHaveAttribute('href', '/images/gallery/cafe.jpg');
  const remove = page.getByRole('button', { name: 'Remove cafe.jpg' });
  await remove.click();
  await expect(page).toHaveURL(/image-attachment-demo/);
});

test('States: each one marked; the title shimmers while uploading or processing', async ({
  page,
}) => {
  await page.goto(demo('states'));
  const states = await attachments(page).evaluateAll((all) =>
    all.map((a) => a.getAttribute('data-state')),
  );
  expect(states).toEqual(['idle', 'uploading', 'processing', 'error', 'done']);
  const title = (n: number) =>
    attachments(page).nth(n).locator('[data-slot="attachment-title"]');
  await expect(title(1)).toHaveClass(/shimmer/);
  await expect(attachments(page).nth(0)).toHaveCSS('border-style', 'dashed');
  await expect(
    page.getByRole('button', { name: 'Retry financial-model.xlsx' }),
  ).toBeVisible();
});

test('Sizes: each smaller than the last', async ({ page }) => {
  await page.goto(demo('sizes'));
  const heights = await attachments(page).evaluateAll((all) =>
    all.map((a) => a.getBoundingClientRect().height),
  );
  expect(heights[0]).toBeGreaterThan(heights[1]);
  expect(heights[1]).toBeGreaterThan(heights[2]);
});

test('Trigger: the card opens the dialog; an action doesn’t', async ({
  page,
}) => {
  await page.goto(demo('trigger'));
  const trigger = page.getByRole('button', {
    name: 'Preview research-summary.pdf',
  });
  await expect(trigger).toHaveAttribute('type', 'button');
  await page.getByRole('button', { name: 'Copy link' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await trigger.click();
  await expect(
    page.getByRole('dialog', { name: 'research-summary.pdf' }),
  ).toBeVisible();
});

test('RTL: the media on the right, the actions on the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const first = attachments(page).first();
  await expectRtl(first);
  const [media, action] = [
    await box(first.locator('[data-slot="attachment-media"]')),
    await box(first.locator('[data-slot="attachment-action"]')),
  ];
  expect(media.x).toBeGreaterThan(action.x);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['states', 'group', 'trigger', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
