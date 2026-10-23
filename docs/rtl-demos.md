# RTL demos

Every component has a demo in right-to-left, with Arabic written in the demo — no translation layer, no locale switch: the text is part of the example, as English is in the others. It shows the component mirrored, and it is what the RTL column of the [roadmap](roadmap.md) ticks.

## The demo

- **Name**: `rtl-<component>-demo` (`rtl-button-demo`), titled **RTL**, last on the component's page.
- **Container**: the demo's root is `<div dir="rtl" lang="ar">` — `dir` mirrors the layout, `lang` lets screen readers and fonts (Noto Sans Arabic, after Geist) treat the text as Arabic.
- **Text**: Arabic in the template, the same content as the basic demo. Numbers, dates and times through `Intl` with an Arabic locale (`ar`, or `ar-MA`, `ar-EG`… for Western digits or a region's habits).
- **Nothing else**: no CSS of the demo's own for direction — a component that needs one is the bug to fix.

## What it checks

- **Logical properties only**: `ms-*`, `pe-*`, `start-*`, `end-*`, `border-s`, `text-start`, `rounded-e-*` — a physical one (`ml-*`, `left-*`, `text-left`) is a bug ([shadcn-style-reference.md](shadcn-style-reference.md)).
- **Icons that point** (chevrons, arrows, "next", "back") flip: `rtl:rotate-180` or `rtl:-scale-x-100`. Icons that don't point (search, close, check) don't.
- **Keys along the line reverse**: ArrowLeft goes to the next item, ArrowRight to the previous one (tabs, radio groups, sliders, menus across, carousels). Up and Down don't change.
- **Overlays open on the right side**: `start` / `end` alignment, not `left` / `right`.
- **Text**: Arabic joins its letters — nothing that cuts it into letters (letter-spacing, `truncate` in the middle of a word is fine).

## The test

Each RTL demo gets an e2e test, with the helpers in `apps/showcase-e2e/src/rtl.ts`:

```ts
import { expectInlineOrder, expectRtl, inlineKey } from '../../rtl';

test('RTL: mirrored, keys reversed', async ({ page }) => {
  await page.goto(demo('rtl'));
  const tabs = page.getByRole('tab');
  await expectRtl(tabs.first());
  // The first tab on the right, the next to its left.
  await expectInlineOrder([tabs.nth(0), tabs.nth(1), tabs.nth(2)]);
  await tabs.first().focus();
  await page.keyboard.press(inlineKey('rtl', 'next'));
  await expect(tabs.nth(1)).toBeFocused();
});
```

## Sample texts

Common words for demos — use them as they fit:

| English                            | Arabic                                           |
| ---------------------------------- | ------------------------------------------------ |
| Save · Cancel · Delete · Edit      | حفظ · إلغاء · حذف · تعديل                        |
| Close · Open · Next · Previous     | إغلاق · فتح · التالي · السابق                    |
| Search · Settings · Profile · Home | بحث · الإعدادات · الملف الشخصي · الرئيسية        |
| Name · Email · Password · Phone    | الاسم · البريد الإلكتروني · كلمة المرور · الهاتف |
| Notifications · Messages · Account | الإشعارات · الرسائل · الحساب                     |
| Submit · Continue · Back · Done    | إرسال · متابعة · رجوع · تم                       |
| Yes · No · OK                      | نعم · لا · حسنًا                                 |
| Today · Yesterday · Tomorrow       | اليوم · أمس · غدًا                               |
| A sentence                         | يمكنك تغيير هذه الإعدادات في أي وقت.             |
| A description                      | سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني.     |
