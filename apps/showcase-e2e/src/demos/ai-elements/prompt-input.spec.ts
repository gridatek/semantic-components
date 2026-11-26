import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

for (const route of [
  '/demos/ai-elements/prompt-input-usage-demo',
  '/demos/ai-elements/model-selector-usage-demo',
])
  test(`${route}: in the docs on a phone (280px), Send inside the composer — its menus' text gives way`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(route);
    // The docs' frame on a phone: 40px a side (their margin and its padding).
    await page.addStyleTag({
      content: 'app-root { padding-inline: 40px !important; }',
    });
    const composer = page.locator('[scInputGroup]');
    const send = page.getByRole('button', { name: 'Send' });
    await expect(send).toBeVisible();
    const [c, s] = [await composer.boundingBox(), await send.boundingBox()];
    expect((s?.x ?? 0) + (s?.width ?? 0)).toBeLessThanOrEqual(
      (c?.x ?? 0) + (c?.width ?? 0) + 0.5,
    );
    // The model's and the effort's names whole: no text wider than its box
    // (no ellipsis).
    const cut = await page
      .locator('[scInputGroupAddon] button[aria-haspopup]')
      .evaluateAll((buttons) =>
        buttons.flatMap((button) =>
          [...button.querySelectorAll('*'), button]
            .filter(
              (e) =>
                getComputedStyle(e).position !== 'absolute' &&
                [...e.childNodes].some(
                  (n) => n.nodeType === 3 && n.textContent?.trim(),
                ),
            )
            .filter((e) => {
              const range = document.createRange();
              range.selectNodeContents(e);
              return (
                range.getBoundingClientRect().width >
                e.getBoundingClientRect().width + 0.5
              );
            })
            .map((e) => e.textContent?.trim()),
        ),
      );
    expect(cut).toEqual([]);
    // The effort still named in full for screen readers.
    await expect(
      page.getByRole('button', { name: /Effort/ }),
    ).toHaveAccessibleName(/Effort\s+Medium/);
  });
