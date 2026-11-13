import { collectErrors } from '../../interaction';
import { openStill } from '../../looks';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('No room below: the model menu flips up, above its trigger, inside the window', async ({
  page,
}) => {
  await openStill(page, '/demos/ai-elements/model-selector-usage-demo');
  const trigger = page.getByRole('button', { name: /^Model:/ });
  // The trigger 24px above the window's bottom edge.
  await trigger.evaluate((el) => {
    const room = innerHeight - el.getBoundingClientRect().bottom - 24;
    document.body.style.paddingTop = `${Math.max(0, room)}px`;
  });
  await trigger.click();
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  // Its items render after it opens, making it taller than when it was placed:
  // it places itself again, and flips.
  await expect
    .poll(async () => {
      const m = await menu.boundingBox();
      const t = await trigger.boundingBox();
      return m && t ? m.y + m.height <= t.y + 1 : false;
    })
    .toBe(true);
  const box = await menu.boundingBox();
  expect(box?.y ?? -1).toBeGreaterThanOrEqual(0);
});
