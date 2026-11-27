# Numbering system

How digits are written — `'latn'` 0123, `'arab'` ٠١٢٣, `'arabext'` ۰۱۲۳ (`ScNumberingSystem`, Unicode's names: `Intl`'s `numberingSystem`, the locale tag's `nu` key). The library's values, and what it reads (typed, pasted), are always Latin; what it shows follows the numbering system.

## The order

1. **The user's choice** — `injectNumberingSystem().set('arab')`, kept as the cookie `sc-numbering-system` (the server reads it, so a page rendered per request is drawn with it), followed at once by the user's other tabs.
2. **The app's** — `numberingSystem` on an i18n locale (`{ id: 'ar', …, numberingSystem: 'latn' }`), carried in the locale tag (`ar-u-nu-latn`).
3. **The locale's own** digits (`Intl`).
4. **`latn`.**

## For your settings

```typescript
import { SC_NUMBERING_SYSTEMS, injectNumberingSystem } from '@semantic-components/ui';

readonly numberingSystem = injectNumberingSystem();
// numberingSystem.value(): always one — the user's, else the locale's.
// numberingSystem.set('arab'): kept; the parts follow.
```

Show each choice by its own digits (`new Intl.NumberFormat('en-u-nu-arab').format(123)` → `١٢٣`): no words to translate.

## Your own numbers and dates, as the parts write theirs

```typescript
import { injectDisplayLocale, injectFormatDate, injectFormatNumber } from '@semantic-components/ui';

readonly formatNumber = injectFormatNumber();
readonly formatDate = injectFormatDate();
readonly locale = injectDisplayLocale();
```

```html
<span>{{ formatNumber(total) }}</span>
<span>{{ formatNumber(year, { useGrouping: false }) }}</span>
<span>{{ formatDate(date()) || 'Pick a date' }}</span>
<time>{{ due().toLocaleString(locale(), { dateStyle: 'long' }) }}</time>
```

- `injectFormatNumber()` — `formatNumber(value, options?)`: `Intl.NumberFormat`'s options; one formatter per locale and options, cached.
- `injectFormatDate()` — `formatDate(value, options?)`: a calendar's value (a picker's) as written — a day (`dateStyle: 'medium'` unless the options say), days as a list in order, a range as one span (`formatRange`); `''` for none.
- `injectDisplayLocale()` — the locale to show with: `LOCALE_ID`, in the user's numbering system once they chose one (`en-u-nu-arab`). Give it to `Intl` or `toLocaleString` for anything else.

All three follow a change of the user's choice at once, in a template. Angular's pipes (`DecimalPipe`, `DatePipe`) read `LOCALE_ID` once, at start: an app that keeps them reloads the page when the user changes it (the cookie is read again).

## In the parts

Every part formats what it shows with `injectDisplayLocale()` or `injectFormatNumber()`, never with `LOCALE_ID` directly — Calendar, Scheduler, the date, time and number fields, the pickers, Time Clock, Meter, Rating, Range Slider, Number Ticker, Timeline, Waterfall, Color Picker, File Input's size, Compare, Image Cropper, Media Player, the charts. `LOCALE_ID` stays for what isn't shown digits: the week's first day, the hour cycle, a direction, reading a typed AM/PM. A number field shows the user's digits and reads both those and Latin ones.

## Arabic-Indic digits in left-to-right text

To the bidi algorithm, Arabic-Indic digits (`٠`–`٩`) are "Arabic numbers": in left-to-right text, what stands between two runs of them (`, `, `–`, `/`) is laid out right to left, so `Nov ٢٧, ٢٠٢٦` is drawn `Nov ٢٠٢٦ ,٢٧`. Unicode's own Arabic patterns carry marks that keep their order (`٢٧‏/١١‏/٢٠٢٦`); an English pattern has none. So `injectFormatDate()`, `injectFormatNumber()` and the parts that write two runs in one text (the Scheduler's heading, spans and day names, its event times, the Timeline's time) put a left-to-right mark (U+200E) after each run, in a left-to-right locale only. Right to left, Persian digits (`۰`–`۹`, European numbers to the algorithm) and Latin ones are left as they are. Copied, the text carries the invisible marks.
