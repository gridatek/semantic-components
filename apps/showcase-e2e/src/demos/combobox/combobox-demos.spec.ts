import { type Locator, type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/combobox/${name}-combobox-demo`;
const usage = '/demos/combobox/combobox-usage-demo';

const options = (page: Page) => page.getByRole('option');
const chips = (page: Page) => page.locator('[data-slot=combobox-chip]');

/** The highlighted option's text (the combobox's aria-activedescendant). */
const activeText = (combobox: Locator) =>
  combobox.evaluate((input) => {
    const id = input.getAttribute('aria-activedescendant');
    return id ? document.getElementById(id)?.textContent?.trim() : null;
  });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a combobox over a listbox; a click opens it, typing filters', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox', { name: 'Framework' });
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await input.click();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  const list = page.getByRole('listbox', { name: 'Frameworks' });
  await expect(input).toHaveAttribute(
    'aria-controls',
    (await list.getAttribute('id')) ?? 'missing',
  );
  await expect(options(page)).toHaveCount(5);
  await page.keyboard.type('n');
  await expect(options(page)).toHaveText([/Next\.js/, /Nuxt\.js/]);
  // As wide as its field.
  const [field, popup] = [
    await box(page.locator('[data-slot=input-group]')),
    await box(page.locator('[data-slot=combobox-content]')),
  ];
  expect(Math.abs(field.width - popup.width)).toBeLessThan(2);
});

test('Usage: the arrows and Enter pick; the input shows the value, focus stays', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox', { name: 'Framework' });
  await input.focus();
  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(() => activeText(input)).toBe('Next.js');
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => activeText(input)).toBe('SvelteKit');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('SvelteKit');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await expect(input).toBeFocused();

  // Opened again: every option, the value selected.
  await page.keyboard.press('ArrowDown');
  await expect(options(page)).toHaveCount(5);
  await expect(page.getByRole('option', { selected: true })).toHaveText(
    /SvelteKit/,
  );
});

test('Usage: text that is no option goes on closing; nothing matches shows Empty', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox', { name: 'Framework' });
  await input.click();
  await page.getByRole('option', { name: 'Remix' }).click();
  await expect(input).toHaveValue('Remix');
  await input.click();
  await page.keyboard.type('zzz');
  await expect(page.getByText('No items found.')).toBeVisible();
  await expect(options(page)).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(input).toHaveValue('Remix');
});

test('Multiple: picking adds and removes, the list stays open; chips by keyboard', async ({
  page,
}) => {
  await page.goto(demo('multiple'));
  const input = page.getByRole('combobox', { name: 'Frameworks' });
  await expect(chips(page)).toHaveText([/Next\.js/]);
  await input.click();
  await expect(page.getByRole('listbox')).toHaveAttribute(
    'aria-multiselectable',
    'true',
  );
  await page.keyboard.type('re');
  await expect(options(page)).toHaveText([/Remix/]);
  // autoHighlight: Enter picks the first match.
  await page.keyboard.press('Enter');
  await expect(chips(page)).toHaveText([/Next\.js/, /Remix/]);
  await expect(input).toHaveValue('');
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(options(page)).toHaveCount(5);

  // A click on a selected option takes it off; focus stays in the input.
  await page.getByRole('option', { name: 'Next.js' }).click();
  await expect(chips(page)).toHaveText([/Remix/]);
  await expect(input).toBeFocused();
  await page.getByRole('option', { name: 'Astro' }).click();
  await expect(chips(page)).toHaveText([/Remix/, /Astro/]);

  // Backspace in the empty input: the last chip.
  await page.keyboard.press('Escape');
  await page.keyboard.press('Backspace');
  await expect(chips(page)).toHaveText([/Remix/]);
  // The arrow towards the chips, then Delete.
  await page.keyboard.press('ArrowLeft');
  await expect(
    page.getByRole('button', { name: 'Remove Remix' }),
  ).toBeFocused();
  await page.keyboard.press('Delete');
  await expect(chips(page)).toHaveCount(0);
  await expect(input).toBeFocused();
});

test('Multiple: a selected value your filter hides stays selected', async ({
  page,
}) => {
  await page.goto(demo('multiple'));
  const input = page.getByRole('combobox', { name: 'Frameworks' });
  await input.click();
  await page.keyboard.type('ast');
  await expect(options(page)).toHaveText([/Astro/]);
  await page.keyboard.press('Enter');
  // Next.js was filtered out while Astro was picked.
  await expect(chips(page)).toHaveText([/Next\.js/, /Astro/]);
});

test('Clear: the button shows with a value, in the chevron’s place; emptying the input clears too', async ({
  page,
}) => {
  await page.goto(demo('clear'));
  const input = page.getByRole('combobox', { name: 'Framework' });
  const clear = page.getByRole('button', { name: 'Clear' });
  const chevron = page.getByRole('button', { name: 'Show the list' });
  await expect(input).toHaveValue('Next.js');
  await expect(clear).toBeVisible();
  await expect(chevron).toBeHidden();
  await clear.click();
  await expect(input).toHaveValue('');
  await expect(clear).toBeHidden();
  await expect(chevron).toBeVisible();
  await expect(input).toBeFocused();

  // The chevron opens and closes, focus in the input.
  await chevron.click();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(input).toBeFocused();
  await page.getByRole('option', { name: 'Astro' }).click();
  await expect(clear).toBeVisible();
  // Emptied by hand: no value.
  await input.fill('');
  await expect(clear).toBeHidden();
});

test('Groups: named groups; one with no match is not rendered', async ({
  page,
}) => {
  await page.goto(demo('groups'));
  await page.getByRole('combobox', { name: 'Timezone' }).click();
  await expect(page.getByRole('group', { name: 'Europe' })).toBeVisible();
  await page.keyboard.type('tok');
  await expect(options(page)).toHaveText([/Tokyo/]);
  await expect(page.getByRole('group', { name: 'Europe' })).toHaveCount(0);
  await expect(page.getByRole('group', { name: 'Asia/Pacific' })).toBeVisible();
});

test('Custom items: an object value, its label shown before the list ever opened', async ({
  page,
}) => {
  await page.goto(demo('custom'));
  const input = page.getByRole('combobox', { name: 'Country' });
  await expect(input).toHaveValue('France');
  await expect(page.getByText('Value: FR')).toBeVisible();
  await input.click();
  await page.getByRole('option', { name: 'Japan' }).click();
  await expect(input).toHaveValue('Japan');
  await expect(page.getByText('Value: JP')).toBeVisible();
});

test('Invalid: aria-invalid once touched, its error read with it; valid once picked', async ({
  page,
}) => {
  await page.goto(demo('invalid'));
  // Named by the field's label.
  const input = page.getByRole('combobox', { name: 'Framework' });
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveAttribute('aria-required', 'true');
  await expect(input).toHaveAccessibleDescription('Please select a framework.');
  await input.click();
  await page.getByRole('option', { name: 'Remix' }).click();
  await expect(input).not.toHaveAttribute('aria-invalid');
});

test('Disabled: the input and its chevron', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('combobox')).toBeDisabled();
  await expect(
    page.getByRole('button', { name: 'Show the list' }),
  ).toBeDisabled();
});

test('Auto highlight: the first match highlighted while typing', async ({
  page,
}) => {
  await page.goto(demo('auto-highlight'));
  const input = page.getByRole('combobox', { name: 'Framework' });
  await input.click();
  await page.keyboard.type('nu');
  await expect.poll(() => activeText(input)).toBe('Nuxt.js');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Nuxt.js');
});

test('Popup: a trigger opens a dialog with the search; a pick closes it, focus back', async ({
  page,
}) => {
  await page.goto(demo('popup'));
  const trigger = page.getByRole('button', { name: /^Country/ });
  await expect(trigger).toHaveText(/Algeria/);
  // Named by the field's label and the value it shows; the label focuses it.
  await expect(trigger).toHaveAccessibleName('Country Algeria');
  await page.getByText('Country', { exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Country' });
  await expect(dialog).toBeVisible();
  const search = page.getByRole('combobox', { name: 'Search countries' });
  await expect(search).toBeFocused();
  // The search inside the popup's edges (once it has zoomed in).
  await expect
    .poll(async () => {
      const [d, s] = [
        await box(dialog),
        await box(dialog.locator('[data-slot=input-group]')),
      ];
      return d.x + d.width - (s.x + s.width);
    })
    .toBeGreaterThan(0);

  await page.keyboard.type('fr');
  await expect(options(page)).toHaveText([/France/]);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(dialog).toBeHidden();
  await expect(trigger).toHaveText(/France/);
  await expect(trigger).toBeFocused();
});

test('Popup: Down opens it with an empty search; Escape and a click outside close it', async ({
  page,
}) => {
  await page.goto(demo('popup'));
  const trigger = page.getByRole('button', { name: /^Country/ });
  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  const search = page.getByRole('combobox', { name: 'Search countries' });
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('');
  await expect(options(page)).toHaveCount(12);
  // A long list: its scrollbar shows (thin).
  await expect(page.getByRole('listbox')).toHaveCSS('scrollbar-width', 'thin');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('Form: required; submitting empty shows the error, a pick submits', async ({
  page,
}) => {
  await page.goto(demo('form'));
  const input = page.getByRole('combobox', { name: 'Framework' });
  await page.getByRole('button', { name: 'Create project' }).click();
  await expect(page.getByText('Please select a framework.')).toBeVisible();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await input.click();
  await page.getByRole('option', { name: 'Astro' }).click();
  await page.getByRole('button', { name: 'Create project' }).click();
  await expect(page.getByText('Created with Astro.')).toBeVisible();
});

test('Async search: your results; the status says when it searches', async ({
  page,
}) => {
  await page.goto(demo('async'));
  const input = page.getByRole('combobox', { name: 'City' });
  await input.click();
  await page.keyboard.type('ma');
  await expect(page.getByRole('status')).toHaveText('Searching…');
  await expect(options(page)).toHaveText([/Madrid/, /Marrakesh/]);
  await expect(page.getByRole('status')).toHaveText('2 results');
  await page.getByRole('option', { name: 'Madrid' }).click();
  await expect(input).toHaveValue('Madrid');
});

test('RTL: the chevron at the left of the input, the check at the left of an option', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const input = page.getByRole('combobox');
  const chevron = page.locator('[data-slot=combobox-trigger]');
  expect((await box(chevron)).x).toBeLessThan((await box(input)).x + 40);
  await input.click();
  await page.getByRole('option', { name: 'Remix' }).click();
  await input.click();
  const option = page.getByRole('option', { name: 'Remix' });
  const [o, check] = [await box(option), await box(option.locator('svg'))];
  expect(check.x).toBeLessThan(o.x + o.width / 2);
});
