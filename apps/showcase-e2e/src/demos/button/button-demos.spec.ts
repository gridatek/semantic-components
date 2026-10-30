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

test('Submit: a button doesn’t submit the form, a submit button does', async ({
  page,
}) => {
  await page.goto(demo('submit'));
  const name = page.getByRole('textbox', { name: 'Name' });
  const status = page.getByRole('status');
  await expect(button(page, 'Cancel')).toHaveAttribute('type', 'button');
  await expect(button(page, 'Save')).toHaveAttribute('type', 'submit');

  // Empty: submitting shows the error, nothing is saved.
  await button(page, 'Save').click();
  await expect(page.getByText('Enter a name.')).toBeVisible();
  await expect(status).toHaveCount(0);

  await name.fill('Ada');
  await button(page, 'Save').click();
  await expect(status).toHaveText('Saved: Ada');

  // Cancel resets, without submitting (no error for the empty name).
  await button(page, 'Cancel').click();
  await expect(status).toHaveText('Cancelled');
  await expect(name).toHaveValue('');
  await expect(page.getByText('Enter a name.')).toHaveCount(0);

  // Enter in the field submits too: through the submit button.
  await name.fill('Grace');
  await name.press('Enter');
  await expect(status).toHaveText('Saved: Grace');
});

test.describe('States', () => {
  /** The look a style property has, now. */
  const look = (page: Page, name: string, property: string) =>
    button(page, name).evaluate(
      (el, p) => getComputedStyle(el).getPropertyValue(p),
      property,
    );

  test('hover: each variant answers', async ({ page }) => {
    for (const [name, label, property] of [
      ['default', 'Button', 'background-color'],
      ['outline', 'Outline', 'background-color'],
      ['secondary', 'Secondary', 'background-color'],
      ['ghost', 'Ghost', 'background-color'],
      ['destructive', 'Destructive', 'background-color'],
      ['link', 'Link', 'text-decoration-line'],
    ] as const) {
      await page.goto(demo(name));
      await page.mouse.move(0, 0);
      const before = await look(page, label, property);
      await button(page, label).hover();
      await expect
        .poll(() => look(page, label, property), `${name} on hover`)
        .not.toBe(before);
    }
  });

  test('pressed: it moves down a pixel', async ({ page }) => {
    await page.goto(demo('default'));
    const target = button(page, 'Button');
    const box = (await target.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect.poll(() => look(page, 'Button', 'translate')).toBe('0px 1px');
    await page.mouse.up();
  });

  test('focus: a ring, red on Destructive', async ({ page }) => {
    const ring = async (name: string, label: string) => {
      await page.goto(demo(name));
      await press(page, 'Tab');
      await expect(button(page, label)).toBeFocused();
      await expect.poll(() => look(page, label, 'box-shadow')).not.toBe('none');
      return look(page, label, 'box-shadow');
    };
    expect(await ring('destructive', 'Destructive')).not.toBe(
      await ring('default', 'Button'),
    );
  });

  test('open (aria-expanded): outline and ghost take their open look, secondary keeps its own', async ({
    page,
  }) => {
    for (const [name, label] of [
      ['outline', 'Outline'],
      ['ghost', 'Ghost'],
    ] as const) {
      await page.goto(demo(name));
      await page.mouse.move(0, 0);
      const closed = await look(page, label, 'background-color');
      // As a menu's trigger would set it.
      await button(page, label).evaluate((el) =>
        el.setAttribute('aria-expanded', 'true'),
      );
      await expect
        .poll(() => look(page, label, 'background-color'), name)
        .not.toBe(closed);
    }
    // Secondary keeps its own background, open or not.
    await page.goto(demo('secondary'));
    await page.mouse.move(0, 0);
    const rest = await look(page, 'Secondary', 'background-color');
    await button(page, 'Secondary').evaluate((el) =>
      el.setAttribute('aria-expanded', 'true'),
    );
    expect(await look(page, 'Secondary', 'background-color')).toBe(rest);
  });

  test('invalid (aria-invalid): a red border and ring', async ({ page }) => {
    await page.goto(demo('outline'));
    const valid = await look(page, 'Outline', 'border-top-color');
    await button(page, 'Outline').evaluate((el) =>
      el.setAttribute('aria-invalid', 'true'),
    );
    await expect
      .poll(() => look(page, 'Outline', 'border-top-color'))
      .not.toBe(valid);
    await expect
      .poll(() => look(page, 'Outline', 'box-shadow'))
      .not.toBe('none');
  });
});
