import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Sidebar in its preset', () => {
  test(`the sidebar's parts have their preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
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
        }, `${preset} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
