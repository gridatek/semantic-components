import { twMerge } from 'cn';
import { type Locator, expect, test } from '../test';
import { presetName, presetStyles } from './preset';

/** Read until the element has them all: the first render may not have them yet. */
async function expectClasses(target: Locator, wanted: string, what: string) {
  const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, `${what} classes missing`)
    .toEqual([]);
}

test.describe('Navigation Menu in its preset', () => {
  test(`trigger, panel, link and box have the preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/navigation-menu/navigation-menu-usage-demo');
    const n = styles.navigationMenu;
    await expectClasses(
      page.getByRole('button', { name: 'Getting started' }),
      n.trigger,
      `${preset} trigger`,
    );
    await expectClasses(
      page.locator('[scNavigationMenuContent]').first(),
      n.content,
      `${preset} content`,
    );
    // The panel's links: the preset's, but for the transition (the part's).
    await expectClasses(
      page.locator('[scNavigationMenuContent] a').first(),
      n.link.replace(/\btransition-all\b/, ''),
      `${preset} link`,
    );
    await expectClasses(
      page.locator('nav > div[aria-hidden]'),
      n.popup,
      `${preset} box`,
    );
  });
});
