import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

const pages = [
  { path: '/docs/guides/theming', title: 'Theming', group: 'Guides' },
  { path: '/docs/guides/forms', title: 'Forms', group: 'Guides' },
  {
    path: '/docs/guides/accessibility',
    title: 'Accessibility',
    group: 'Guides',
  },
  {
    path: '/docs/guides/ssr',
    title: 'Server-side rendering',
    group: 'Guides',
  },
  {
    path: '/docs/guides/why',
    title: 'Why Semantic Components',
    group: 'Guides',
  },
  { path: '/docs/about/changelog', title: 'Changelog', group: 'About' },
  { path: '/docs/about/credits', title: 'Credits', group: 'About' },
  { path: '/docs/about/roadmap', title: 'Roadmap', group: 'About' },
];

test.describe('Guides and About pages', () => {
  for (const { path, title, group } of pages) {
    test(`${title}: no accessibility violations, light and dark`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });

    test(`${title}: its group is open in the sidebar and in the breadcrumb`, async ({
      page,
    }) => {
      await page.goto(path);
      const nav = page.getByRole('navigation', { name: 'Documentation' });
      await expect(nav.getByRole('button', { name: group })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
      await expect(
        nav.getByRole('link', { name: title, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole('navigation', { name: 'Where you are' }),
      ).toHaveText(new RegExp(`Docs\\s*${group}\\s*${title}`));
    });
  }

  test('the sidebar’s groups, in order', async ({ page }) => {
    await page.goto('/docs/guides/theming');
    const nav = page.getByRole('navigation', { name: 'Documentation' });
    await expect(nav.locator('[scCollapsibleTrigger]')).toHaveText([
      'Get Started',
      'Guides',
      'Components',
      'Charts',
      'Utilities',
      'AI Elements',
      'About',
    ]);
  });
});
