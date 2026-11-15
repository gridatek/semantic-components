import { expect, test } from '../test';

test.describe('Docs layout', () => {
  test('the sidebar’s scrollbar is the list’s — the rail at its edge doesn’t take it', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'a scrollbar that takes room (Chromium’s), to press',
    );
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/docs/components/button');
    const nav = page.getByRole('navigation', { name: 'Documentation' });
    // The lists arrive with components.json: then it scrolls.
    await expect
      .poll(() => nav.evaluate((el) => el.scrollHeight > el.clientHeight))
      .toBe(true);
    const box = (await nav.boundingBox()) ?? { x: 0, y: 0, width: 0 };
    // On the scrollbar, along the edge. (A synthetic press doesn't move a
    // scrollbar: what's under the pointer is what decides.)
    const x = box.x + box.width - 3;
    const y = box.y + 30;
    expect(
      await page.evaluate(
        ([x, y]) => document.elementFromPoint(x, y)?.getAttribute('data-slot'),
        [x, y],
      ),
    ).toBe('sidebar-content');
    await page.mouse.click(x, y);
    await expect(page.locator('[data-slot=sidebar]').first()).toHaveAttribute(
      'data-state',
      'expanded',
    );
  });
});
