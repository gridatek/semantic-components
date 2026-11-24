import { expect, test } from '../test';
import { styleName } from './style';

test.describe('Typeset in its style', () => {
  test(`code blocks and inline code take the style's corners`, async ({
    page,
  }) => {
    const style = styleName();
    await page.goto('/typeset');
    // The style's file, linked at start.
    await expect(page.locator('link#typeset-variables')).toHaveAttribute(
      'href',
      `typeset-variables-${style}.css`,
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
        const block = resolve('var(--sc-typeset-radius)');
        const inline = resolve('var(--sc-typeset-radius-inline)');
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
    const square = style === 'lyra' || style === 'sera';
    expect(corners.pre === '0px').toBe(square);
    expect(corners.code === '0px').toBe(square);
  });

  test(`headings take the style's weight, tracking and case (sera's: uppercase, wider)`, async ({
    page,
  }) => {
    const style = styleName();
    await page.goto('/typeset');
    const heading = page.locator('article.typeset h2').first();
    await expect(heading).toBeVisible();
    // Once its stylesheet has loaded: the variables set.
    await expect
      .poll(() =>
        heading.evaluate((el) =>
          getComputedStyle(el).getPropertyValue('--sc-typeset-heading-case'),
        ),
      )
      .not.toBe('');
    const look = await heading.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        weight: style.fontWeight,
        transform: style.textTransform,
        tracking:
          (parseFloat(style.letterSpacing) || 0) / parseFloat(style.fontSize),
      };
    });
    const sera = style === 'sera';
    expect(look.weight).toBe('600');
    expect(look.transform).toBe(sera ? 'uppercase' : 'none');
    expect(look.tracking).toBeCloseTo(sera ? 0.05 : 0, 3);
  });
});
