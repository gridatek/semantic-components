import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Icon Sidebar Demo', () => {
  test('trigger reports state; collapsed items keep a tooltip; no persistence', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/sidebar/icon-sidebar-demo');
    const trigger = page.getByRole('button', {
      name: 'Toggle sidebar',
      exact: true,
    });
    const projects = page.getByRole('button', { name: 'Projects' });

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(projects).not.toHaveAttribute('title');

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(projects).toHaveAttribute('title', 'Projects');
    await expect(
      page.getByRole('button', { name: 'Dashboard' }),
    ).toHaveAttribute('aria-current', 'page');

    // [storageKey]="null": the demo never writes the shared cookie.
    const cookies = await page.context().cookies();
    expect(cookies.map((cookie) => cookie.name)).not.toContain(
      'sc-sidebar-state',
    );
    expect(errors).toEqual([]);
  });
});
