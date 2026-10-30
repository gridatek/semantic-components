import { collectErrors, press } from '../../interaction';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/button/${name}-button-demo`;
const button = (page: Page, name: string | RegExp) =>
  page.getByRole('button', { name, exact: typeof name === 'string' });

let errors: string[];
let warnings: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
  warnings = [];
  page.on('console', (m) => {
    if (m.type() === 'warning') warnings.push(m.text());
  });
});

test.afterEach(() => {
  expect(errors).toEqual([]);
  // The parts warn (in development) when something has no name.
  expect(warnings.filter((w) => w.includes('has no name'))).toEqual([]);
});

test('Usage: a button, its type "button" (not submitting a form)', async ({
  page,
}) => {
  await page.goto('/demos/button/button-usage-demo');
  await expect(button(page, 'Click me')).toHaveAttribute('type', 'button');
  await expect(button(page, 'Click me')).toHaveAttribute('data-slot', 'button');
});

test('Size: four sizes, each with its square icon size', async ({ page }) => {
  await page.goto(demo('size'));
  const heights = { 'Extra Small': 24, Small: 28, Default: 32, Large: 36 };
  const icons = page.getByRole('button', { name: 'Submit' });
  await expect(icons).toHaveCount(4);
  let i = 0;
  for (const [name, height] of Object.entries(heights)) {
    await expect(button(page, name)).toHaveCSS('height', `${height}px`);
    await expect(icons.nth(i)).toHaveCSS('height', `${height}px`);
    await expect(icons.nth(i)).toHaveCSS('width', `${height}px`);
    i++;
  }
  // WCAG 2.5.8: even the smallest is a 24px target.
  await expectTargetSize(page.locator('body'), 24);
});

for (const [name, label] of [
  ['default', 'Button'],
  ['outline', 'Outline'],
  ['secondary', 'Secondary'],
  ['ghost', 'Ghost'],
  ['destructive', 'Destructive'],
  ['link', 'Link'],
] as const)
  test(`${label === 'Button' ? 'Default' : label}: one button, its own look`, async ({
    page,
  }) => {
    await page.goto(demo(name));
    await expect(page.getByRole('button')).toHaveCount(1);
    await expect(button(page, label)).toBeVisible();
  });

test('the variants look apart', async ({ page }) => {
  const looks = new Set<string>();
  for (const name of [
    'default',
    'outline',
    'secondary',
    'ghost',
    'destructive',
    'link',
  ]) {
    await page.goto(demo(name));
    const element = page.getByRole('button');
    looks.add(
      await element.evaluate((el) => {
        const style = getComputedStyle(el);
        return `${style.backgroundColor} ${style.color} ${style.borderColor} ${style.textDecorationLine}`;
      }),
    );
  }
  expect(looks.size).toBe(6);
});

test('Icon: a square icon button, named by its sr-only text', async ({
  page,
}) => {
  await page.goto(demo('icon'));
  const upgrade = button(page, 'Upgrade');
  await expect(upgrade).toHaveCSS('width', '32px');
  await expect(upgrade).toHaveCSS('height', '32px');
});

test('With Icon: the side with the icon has less padding (data-icon)', async ({
  page,
}) => {
  await page.goto(demo('with-icon'));
  const branch = button(page, 'New Branch');
  const fork = button(page, 'Fork');
  // sm: 10px each side; 6px on the icon's side.
  await expect(branch).toHaveCSS('padding-inline-start', '6px');
  await expect(branch).toHaveCSS('padding-inline-end', '10px');
  await expect(fork).toHaveCSS('padding-inline-start', '10px');
  await expect(fork).toHaveCSS('padding-inline-end', '6px');
});

test('Rounded: a round icon button', async ({ page }) => {
  await page.goto(demo('rounded'));
  const top = button(page, 'Scroll to top');
  const radius = await top.evaluate((el) =>
    parseFloat(getComputedStyle(el).borderTopLeftRadius),
  );
  expect(radius).toBeGreaterThanOrEqual(16);
});

test('Spinner: busy buttons, disabled, the spinner named and turning', async ({
  page,
}) => {
  await page.goto(demo('spinner'));
  for (const name of [/Generating/, /Downloading/]) {
    const busy = button(page, name);
    await expect(busy).toBeDisabled();
    await expect(busy).toHaveAttribute('aria-disabled', 'true');
    // A button's content is presentational: the spinner by its attribute.
    const spinner = busy.locator('svg[role=status]');
    await expect(spinner).toHaveAttribute('aria-label', 'Loading');
    await expect(spinner).toHaveCSS('animation-name', 'spin');
  }
});

test('Button Group: a named group of buttons, its inner corners square', async ({
  page,
}) => {
  await page.goto(demo('group'));
  const group = page.getByRole('group', { name: 'Message actions' });
  await expect(group.getByRole('button')).toHaveText([
    'Archive',
    'Report',
    'Snooze',
  ]);
  await expect(button(page, 'Report')).toHaveCSS(
    'border-top-left-radius',
    '0px',
  );
});

test('As Link: a link that looks like a button — still a link', async ({
  page,
}) => {
  await page.goto(demo('as-link'));
  const link = page.getByRole('link', { name: 'Go to the Link docs' });
  await expect(link).toHaveAttribute('href', '/docs/components/link');
  await expect(page.getByRole('button')).toHaveCount(0);
  await expect(link).toHaveCSS('height', '32px');
});

test('Disabled: not pressed, not in the tab order', async ({ page }) => {
  await page.goto(demo('disabled'));
  const buttons = page.getByRole('button');
  await expect(buttons).toHaveCount(4);
  for (const each of await buttons.all()) {
    await expect(each).toBeDisabled();
    await expect(each).toHaveAttribute('aria-disabled', 'true');
  }
  await press(page, 'Tab');
  await expect(page.locator(':focus')).toHaveCount(0);
});

test('Keyboard: Tab reaches a button, Enter and Space press it, the ring shows', async ({
  page,
}) => {
  await page.goto(demo('default'));
  const pressed: string[] = [];
  await page.exposeFunction('pressed', (how: string) => pressed.push(how));
  await page
    .getByRole('button')
    .evaluate((el) =>
      el.addEventListener('click', () =>
        (window as unknown as { pressed: (s: string) => void }).pressed(
          'click',
        ),
      ),
    );
  await press(page, 'Tab');
  const target = button(page, 'Button');
  await expect(target).toBeFocused();
  await expect(target).not.toHaveCSS('box-shadow', 'none');
  await press(page, 'Enter');
  await press(page, 'Space');
  await expect.poll(() => pressed.length).toBe(2);
});

test('RTL: the buttons from the right, the arrows pointing the reading way', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const send = button(page, 'إرسال');
  const previous = button(page, 'السابق');
  const next = button(page, 'التالي');
  await expectRtl(send);
  await expectInlineOrder([send, previous, next]);
  // "Previous" leads with its icon: at its right in right to left.
  const icon = previous.locator('svg');
  const [iconBox, buttonBox] = [
    (await icon.boundingBox())!,
    (await previous.boundingBox())!,
  ];
  expect(iconBox.x + iconBox.width).toBeGreaterThan(
    buttonBox.x + buttonBox.width / 2,
  );
  // Mirrored: the left arrow points right, back along the line.
  await expect(icon).toHaveCSS('scale', '-1 1');
});

test('On a phone: the widest demos fit, no sideways scroll @mobile', async ({
  page,
}) => {
  for (const name of ['size', 'group', 'with-icon', 'spinner', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
