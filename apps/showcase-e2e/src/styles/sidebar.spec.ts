import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Sidebar in its style', () => {
  test(`the sidebar's parts have their style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/sidebar/sidebar-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot=sidebar-inner]'),
        styles.sidebar.inner,
        'inner',
      ],
      [
        page.locator('[data-slot=sidebar-header]'),
        styles.sidebar.header,
        'header',
      ],
      [
        page.locator('[data-slot=sidebar-content]'),
        styles.sidebar.content,
        'content',
      ],
      [
        page.locator('[data-slot=sidebar-group-label]'),
        styles.sidebar.groupLabel,
        'group label',
      ],
      [
        page.locator('[data-slot=sidebar-menu]').nth(1),
        styles.sidebar.menu,
        'menu',
      ],
      [
        page.getByRole('link', { name: 'Inbox' }),
        styles.sidebar.menuButton({}),
        'menu button',
      ],
      [
        page.locator('[data-slot=sidebar-inset]'),
        styles.sidebar.inset,
        'inset',
      ],
    ] as const) {
      const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
      // Read until it has them all: the first render may not have them yet.
      await expect
        .poll(async () => {
          const have = new Set(
            ((await target.getAttribute('class')) ?? '').split(/\s+/),
          );
          return classes.filter((c) => !have.has(c));
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
