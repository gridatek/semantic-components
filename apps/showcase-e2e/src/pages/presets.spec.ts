import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Presets Page', () => {
  test('the style card picks a preset, which reloads in it', async ({
    page,
  }) => {
    await page.goto('/presets');
    const style = page.getByRole('button', { name: /Style/ });
    await expect(style).toContainText('nova', { ignoreCase: true });
    // The options still to come are there, not usable yet.
    await expect(
      page.getByRole('button', { name: /Base Color/ }),
    ).toBeDisabled();
    await style.click();
    await expect(
      page.getByRole('menuitemradio', { name: 'Nova' }),
    ).toHaveAttribute('aria-checked', 'true');
    await page.getByRole('menuitemradio', { name: 'Maia' }).click();
    await expect(style).toContainText('maia', { ignoreCase: true });
    await expect(
      page.getByRole('heading', { name: 'Contribution History' }),
    ).toBeVisible();
  });

  test("shadcn's Create demos, both pages, at work", async ({ page }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      // The avatars are GitHub's, as in shadcn's demos: GitHub sometimes
      // refuses a burst of them (403), which is the network, not the page.
      const external = !m.location().url.startsWith('http://localhost');
      if (m.text().startsWith('Failed to load resource') && external) return;
      if (m.type() === 'warning' || m.type() === 'error')
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/presets');
    // A card from each page of shadcn's preview.
    await expect(
      page.getByRole('heading', { name: 'Recent Transactions' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Invoice #INV-2847' }),
    ).toBeVisible();
    // The scenes set the sliders; off disables them.
    const kitchen = page.locator('app-preview-kitchen-island');
    await kitchen.getByRole('button', { name: 'Nightlight' }).click();
    await expect(
      kitchen.getByRole('slider', { name: 'Brightness' }),
    ).toHaveValue('15');
    await kitchen.getByRole('switch', { name: 'Kitchen Island' }).click();
    await expect(
      kitchen.getByRole('slider', { name: 'Brightness' }),
    ).toBeDisabled();
    // Its dialog opens on its first field and closes.
    await page.getByRole('button', { name: 'Share Feedback' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    expect(messages).toEqual([]);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    await page.goto('/presets');
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
