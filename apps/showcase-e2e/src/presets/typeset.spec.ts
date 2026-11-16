import { expect, test } from '../test';
import { presetName } from './preset';

test.describe('Typeset in its preset', () => {
  test(`code blocks and inline code take the preset's corners`, async ({
    page,
  }) => {
    const preset = presetName();
    await page.goto('/typeset');
    // The preset's file, linked at start.
    await expect(page.locator('link#typeset-variables')).toHaveAttribute(
      'href',
      `typeset-variables-${preset}.css`,
    );
    const content = page.locator('article.typeset');
    await expect(content.locator('pre').first()).toBeVisible();
    // Each corner as its variable resolves on this page, beside the element's.
    const read = () =>
      page.evaluate(() => {
        const probe = document.createElement('div');
        document.body.append(probe);
        const resolve = (value: string) => {
          probe.style.borderTopLeftRadius = value;
          return getComputedStyle(probe).borderTopLeftRadius;
        };
        const block = resolve('var(--typeset-radius)');
        const inline = resolve('var(--typeset-radius-inline)');
        probe.remove();
        const radius = (selector: string) =>
          getComputedStyle(document.querySelector(selector) as Element)
            .borderTopLeftRadius;
        return {
          block,
          inline,
          pre: radius('article.typeset pre'),
          code: radius('article.typeset :not(pre) > code'),
        };
      });
    // Once its stylesheet has loaded: the variables set.
    await expect.poll(async () => (await read()).block).not.toBe('');
    const corners = await read();
    expect(corners.pre).toBe(corners.block);
    expect(corners.code).toBe(corners.inline);
    // Square in the square styles, rounded in the others.
    const square = preset === 'lyra' || preset === 'sera';
    expect(corners.pre === '0px').toBe(square);
    expect(corners.code === '0px').toBe(square);
  });
});
