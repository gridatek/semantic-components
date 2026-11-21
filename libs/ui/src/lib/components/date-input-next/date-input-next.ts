import {
  Component,
  ElementRef,
  HostAttributeToken,
  LOCALE_ID,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import type { ScCalendarRange } from '../calendar';
import { ScDatePicker } from '../date-picker/date-picker';
import { SC_FIELD } from '../field';
import {
  SC_DATE_INPUT_NEXT,
  type ScDateInputNextHost,
  type ScDateInputNextPart,
  ScDateInputNextSegment,
} from './date-input-next-segment';

/** A piece of the date as the locale writes it: a part to edit, or the text between. */
export interface ScDateInputNextSegmentData {
  readonly type: ScDateInputNextPart | 'literal';
  /** A literal's text (`/`, `.`, `年`…). */
  readonly text: string;
}

type ScDateInputNextParts = Partial<Record<ScDateInputNextPart, number>>;

/** Page Up / Page Down: a bigger step. */
const BIG_STEP = { day: 7, month: 3, year: 5 } as const;
const NONE = Symbol('none');
/** Languages written right to left: their dates read so (day at the right in Arabic). */
const RTL = /^(ar|fa|he|iw|ur|ps|yi|dv|ckb|sd|ug)(-|$)/i;

/** A digit, typed on any keyboard: `7`, or the Arabic `٧`, the Persian `۷`. */
function digitOf(char: string): number | undefined {
  if (/^[0-9]$/.test(char)) return Number(char);
  const code = char.charCodeAt(0);
  if (code >= 0x660 && code <= 0x669) return code - 0x660;
  if (code >= 0x6f0 && code <= 0x6f9) return code - 0x6f0;
  return undefined;
}

/**
 * A date, typed part by part — day, month, year — in the order and with the
 * separators of its locale. Each part is an input (a spin button, the number
 * pad on a phone): digits fill it and move on, the arrows step it, Backspace
 * takes a digit back. A `[formField]`: `Temporal.PlainDate`, or `null` until
 * every part is filled. Named by its `scField`'s label. In a date picker it
 * is the picker's value — a range's end with `part`.
 */
@Component({
  selector: 'div[scDateInputNext]',
  exportAs: 'scDateInputNext',
  imports: [ScDateInputNextSegment],
  // Its parts (scDateInputNextSegment) read it, and hand it what is typed.
  providers: [{ provide: SC_DATE_INPUT_NEXT, useExisting: ScDateInputNext }],
  template: `
    @for (segment of segments(); track $index) {
      @if (segment.type === 'literal') {
        <span aria-hidden="true" class="whitespace-pre">{{
          segment.text
        }}</span>
      } @else {
        @let type = partOf(segment);
        <span class="inline-grid">
          <input
            #partInput="scDateInputNextSegment"
            [scDateInputNextSegment]="type"
          />
          <!-- Its width: what it shows (or the empty mark), as text would be —
               after the input, whose part it reads. -->
          <span
            aria-hidden="true"
            class="invisible col-start-1 row-start-1 px-0.5 whitespace-pre tabular-nums"
            >{{ partInput.text() || partInput.placeholder() }}</span
          >
        </span>
      }
    }
  `,
  host: {
    'data-slot': 'date-input-next',
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.dir]': 'direction()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-invalid]': 'showInvalid() || null',
    '[attr.data-empty]': 'date() === null || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDateInputNext
  implements FormValueControl<Temporal.PlainDate | null>, ScDateInputNextHost
{
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly picker = inject(ScDatePicker, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().segmentedInput;
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });

  /** The date: `[formField]` or `[(value)]`; `null` until every part is filled. In a date picker, the picker's. */
  readonly value = model<Temporal.PlainDate | null>(null);
  /** In a date picker's range: the end it is. */
  readonly part = input<'start' | 'end' | undefined>(undefined);
  // TODO(angular): minDate / maxDate go once Signal Forms' min() / max()
  // take Temporal dates (docs/todo.md, "Date bounds from the form").
  // Angular: https://github.com/angular/angular/issues/67643
  /** The first day; an earlier one is marked invalid (in a picker: the picker's). */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day; a later one is marked invalid (in a picker: the picker's). */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that can't be picked — weekends, holidays: marked invalid. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched; in a picker, the picker). */
  readonly touch = output<void>();

  /** Disabled — or its date picker is. */
  readonly isDisabled = computed(
    () => this.disabled() || !!this.picker?.disabled(),
  );

  private readonly id = computed(
    () =>
      this.idInput() ||
      (this.part() === 'end' ? null : this.field?.id()) ||
      null,
  );
  private readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  readonly ɵdescribedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  /** The locale's way: right to left in Arabic — whatever the page's. */
  private readonly direction = computed(() =>
    RTL.test(this.locale) ? 'rtl' : 'ltr',
  );

  /** Its day: its value — or, in a date picker, the picker's (a range's end). */
  readonly date = computed<Temporal.PlainDate | null>(() => {
    if (!this.picker) return this.value();
    const value = this.picker.value();
    const part = this.part();
    if (!part) return value instanceof Temporal.PlainDate ? value : null;
    const range = value as ScCalendarRange | null;
    return (part === 'start' ? range?.from : range?.to) ?? null;
  });

  private readonly formatter = computed(
    () =>
      new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  );

  /** The parts in the locale's order, with the text between them. */
  readonly segments = computed<ScDateInputNextSegmentData[]>(() =>
    this.formatter()
      .formatToParts(Temporal.PlainDate.from('2026-10-14'))
      .filter((part) => ['literal', 'day', 'month', 'year'].includes(part.type))
      .map((part) => ({
        type: part.type as ScDateInputNextSegmentData['type'],
        text: part.type === 'literal' ? part.value : '',
      })),
  );

  /** Each part's name, in the locale's words. */
  private readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.locale, {
      type: 'dateTimeField',
    });
    return {
      day: names.of('day'),
      month: names.of('month'),
      year: names.of('year'),
    } as Record<ScDateInputNextPart, string>;
  });

  private readonly digits = computed(() => ({
    two: new Intl.NumberFormat(this.locale, {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    four: new Intl.NumberFormat(this.locale, {
      minimumIntegerDigits: 4,
      useGrouping: false,
    }),
    plain: new Intl.NumberFormat(this.locale, { useGrouping: false }),
  }));

  private readonly monthName = computed(
    () => new Intl.DateTimeFormat(this.locale, { month: 'long' }),
  );

  /** The parts typed so far: the day's — kept while one is still empty. */
  private written: Temporal.PlainDate | null | typeof NONE = NONE;
  readonly parts = linkedSignal<
    Temporal.PlainDate | null,
    ScDateInputNextParts
  >({
    source: this.date,
    computation: (date, previous) => {
      const own = previous && date === this.written;
      this.written = NONE;
      if (own) return previous.value;
      return date ? { day: date.day, month: date.month, year: date.year } : {};
    },
  });

  /** Not a day that can be picked: outside the limits, unavailable — or a range's end on the wrong side. */
  readonly outOfRange = computed(() => {
    const date = this.date();
    if (!date) return false;
    if (this.picker) {
      if (!this.picker.canPick(date)) return true;
      const range = this.picker.value() as ScCalendarRange | null;
      if (this.part() === 'end' && range?.from)
        return Temporal.PlainDate.compare(date, range.from) < 0;
      if (this.part() === 'start' && range?.to)
        return Temporal.PlainDate.compare(date, range.to) > 0;
      return false;
    }
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!!min && Temporal.PlainDate.compare(date, min) < 0) ||
      (!!max && Temporal.PlainDate.compare(date, max) > 0) ||
      this.unavailable()(date)
    );
  });

  readonly showInvalid = computed(
    () =>
      this.outOfRange() ||
      (this.picker
        ? this.picker.showInvalid()
        : this.invalid() && this.touched()),
  );

  /** Digits typed into the focused part. */
  private typed = '';
  /** The year as typed so far (shown until it is whole, at four digits or when left). */
  private readonly yearDraft = signal('');

  private readonly class = computed(() =>
    cn(
      this.styles.root,
      // In an input group: the group draws the box.
      'in-data-[slot=input-group]:h-full in-data-[slot=input-group]:w-auto in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:has-[:focus-visible]:ring-0 in-data-[slot=input-group]:data-invalid:ring-0 dark:in-data-[slot=input-group]:bg-transparent',
      this.classInput(),
    ),
  );

  /** Empties every part. */
  clear(): void {
    this.typed = '';
    this.yearDraft.set('');
    this.parts.set({});
    if (this.date() !== null) {
      this.written = null;
      this.write(null);
    }
  }

  /** Focus on a part — the first one by default (Signal Forms calls it, for an error). */
  focus(options?: FocusOptions, part?: ScDateInputNextPart): void {
    this.inputs()
      .find((input) => !part || input.dataset['type'] === part)
      ?.focus(options);
  }

  /** The part a segment edits (the template's context types it loosely). */
  private partOf(segment: ScDateInputNextSegmentData): ScDateInputNextPart {
    return segment.type as ScDateInputNextPart;
  }

  /** A part not typed yet. */
  ɵempty(type: ScDateInputNextPart): boolean {
    return this.parts()[type] === undefined;
  }

  /** A part's name, in the locale's words. */
  ɵname(type: ScDateInputNextPart): string {
    return this.names()[type];
  }

  /** A part focused: what was typed in another one is forgotten. */
  ɵfocus(): void {
    this.typed = '';
  }

  /** A part left: a year of one or two digits is this century's (`27` → 2027). */
  ɵblur(type: ScDateInputNextPart): void {
    if (type === 'year') this.settleYear();
    this.typed = '';
  }

  /** A part's lowest and highest value; the day's follows the month and year. */
  ɵrange(type: ScDateInputNextPart): [number, number] {
    if (type === 'month') return [1, 12];
    if (type === 'year') return [1, 9999];
    const { month, year } = this.parts();
    if (!month) return [1, 31];
    return [
      1,
      Temporal.PlainYearMonth.from({ year: year ?? 2000, month }).daysInMonth,
    ];
  }

  ɵvalueNow(type: ScDateInputNextPart): number | null {
    return this.parts()[type] ?? null;
  }

  /** A part's text for a screen reader: the month by its name. */
  ɵvalueText(type: ScDateInputNextPart): string | null {
    const value = this.parts()[type];
    if (value === undefined) return null;
    if (type === 'month')
      return this.monthName().format(
        Temporal.PlainDate.from({ year: 2000, month: value, day: 1 }),
      );
    return this.ɵtext(type);
  }

  /** A part as the locale writes it — empty when it is. */
  ɵtext(type: ScDateInputNextPart): string {
    const digits = this.digits();
    if (type === 'year' && this.yearDraft())
      return digits.plain.format(Number(this.yearDraft()));
    const value = this.parts()[type];
    if (value === undefined) return '';
    return (type === 'year' ? digits.four : digits.two).format(value);
  }

  ɵkeydown(event: KeyboardEvent, type: ScDateInputNextPart): void {
    const input = event.target as HTMLInputElement;
    const editable = !this.readonly() && !this.isDisabled();
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        this.moveOnScreen(input, event.key === 'ArrowRight' ? 1 : -1);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'PageUp':
      case 'PageDown':
        if (editable)
          this.step(
            type,
            event.key === 'ArrowUp' || event.key === 'PageUp' ? 1 : -1,
            event.key.startsWith('Page'),
          );
        break;
      case 'Home':
      case 'End':
        if (editable) {
          this.settleYear();
          const [min, max] = this.ɵrange(type);
          this.set(type, event.key === 'Home' ? min : max);
        }
        break;
      case 'Backspace':
        if (editable) this.backspace(type, input);
        break;
      case 'Delete':
        if (editable) {
          this.typed = '';
          if (type === 'year') this.yearDraft.set('');
          this.set(type, undefined);
        }
        break;
      default:
        // Digits and separators come as input (any keyboard, a phone's
        // too): ɵbeforeInput.
        return;
    }
    event.preventDefault();
  }

  /** What is typed, on any keyboard: the part takes it, the input's own text stays the part's. */
  ɵbeforeInput(event: InputEvent, type: ScDateInputNextPart): void {
    if (!event.cancelable) return;
    event.preventDefault();
    if (this.readonly() || this.isDisabled()) return;
    const input = event.target as HTMLInputElement;
    if (
      event.inputType === 'insertText' ||
      event.inputType === 'insertReplacementText'
    ) {
      const text = event.data ?? '';
      if ([...text].length > 1) this.paste(text);
      else if (text) this.type(text, type, input);
    } else if (event.inputType === 'deleteContentBackward') {
      this.backspace(type, input);
    } else if (event.inputType === 'deleteContentForward') {
      this.typed = '';
      if (type === 'year') this.yearDraft.set('');
      this.set(type, undefined);
    }
  }

  /** Input that couldn't be stopped (a phone's composition): taken, then the part's text back. */
  ɵinput(event: Event, type: ScDateInputNextPart): void {
    const input = event.target as HTMLInputElement;
    const data = (event as InputEvent).data;
    if (data && !this.readonly() && !this.isDisabled()) {
      const char = [...data].pop() ?? '';
      if (char) this.type(char, type, input);
    }
    input.value = this.ɵtext(type);
  }

  /** A whole date pasted — `2026-11-02`, or in the locale's order — fills every part. */
  ɵpaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.readonly() || this.isDisabled()) return;
    this.paste(event.clipboardData?.getData('text') ?? '');
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    if (this.picker) this.picker.touch.emit();
    else this.touch.emit();
  }

  /** A key typed into a part: a digit, or a separator. */
  private type(char: string, type: ScDateInputNextPart, input: HTMLElement) {
    const digit = digitOf(char);
    if (digit === undefined) {
      // A separator (`/`, `.`, `-`, a space): on to the next part.
      if (
        !/[\p{L}\p{N}]/u.test(char) &&
        (this.parts()[type] !== undefined || this.yearDraft())
      ) {
        if (type === 'year') this.settleYear();
        this.typed = '';
        this.move(input, 1);
      }
      return;
    }
    if (type === 'year') {
      const draft = (this.yearDraft() + digit).slice(-4);
      this.yearDraft.set(draft);
      if (draft.length === 4) {
        this.yearDraft.set('');
        this.set('year', Number(draft));
        this.move(input, 1);
      }
      return;
    }
    const [min, max] = this.ɵrange(type);
    let typed = this.typed + digit;
    if (Number(typed) > max) typed = String(digit);
    this.typed = typed;
    const number = Number(typed);
    if (number >= min) this.set(type, number);
    // Whole once no digit can follow (`4` in the month, `12`, `31`).
    if (typed.length >= 2 || number * 10 > max) {
      this.typed = '';
      this.move(input, 1);
    }
  }

  /** The year typed so far, made whole: one or two digits this century's. */
  private settleYear(): void {
    const draft = this.yearDraft();
    if (!draft) return;
    this.yearDraft.set('');
    const year = Number(draft);
    this.set('year', draft.length <= 2 ? 2000 + year : year || undefined);
  }

  /** Backspace: a digit back, then the part emptied, then the part before. */
  private backspace(type: ScDateInputNextPart, input: HTMLElement): void {
    if (type === 'year' && this.yearDraft()) {
      this.yearDraft.update((draft) => draft.slice(0, -1));
      return;
    }
    const part = this.parts()[type];
    if (part === undefined) {
      this.typed = '';
      this.move(input, -1);
    } else if (part >= 10) {
      const kept = String(part).slice(0, -1);
      if (type === 'year') {
        this.set('year', undefined);
        this.yearDraft.set(kept);
      } else {
        this.typed = kept;
        this.set(type, Number(kept) >= 1 ? Number(kept) : undefined);
      }
    } else {
      this.typed = '';
      this.set(type, undefined);
    }
  }

  /** The arrows: one up or down — Page Up / Down a bigger step; the day and month wrap. An empty part starts at today. */
  private step(type: ScDateInputNextPart, by: 1 | -1, big: boolean): void {
    this.settleYear();
    const part = this.parts()[type];
    if (part === undefined) {
      this.set(type, Temporal.Now.plainDateISO()[type]);
      return;
    }
    const [min, max] = this.ɵrange(type);
    const next = part + by * (big ? BIG_STEP[type] : 1);
    if (type === 'year') {
      this.set(type, Math.min(max, Math.max(min, next)));
      return;
    }
    const span = max - min + 1;
    this.set(type, ((((next - min) % span) + span) % span) + min);
  }

  /** A whole date, from text: ISO (`2026-11-02`), or its numbers in the locale's order. */
  private paste(text: string): void {
    const normal = [...text]
      .map((char) => digitOf(char) ?? char)
      .join('')
      .trim();
    let date: Temporal.PlainDate | null = null;
    try {
      if (/^\d{4}-\d{2}-\d{2}$/.test(normal))
        date = Temporal.PlainDate.from(normal);
    } catch {
      // Not a day (2026-02-30): read as numbers below.
    }
    if (!date) {
      const numbers = normal.match(/\d+/g);
      const order = this.segments()
        .filter((segment) => segment.type !== 'literal')
        .map((segment) => segment.type as ScDateInputNextPart);
      if (!numbers || numbers.length !== 3) return;
      const parts = Object.fromEntries(
        order.map((type, i) => [type, numbers[i]]),
      ) as Record<ScDateInputNextPart, string>;
      const year = Number(parts.year);
      try {
        date = Temporal.PlainDate.from(
          {
            year: parts.year.length <= 2 ? 2000 + year : year,
            month: Number(parts.month),
            day: Number(parts.day),
          },
          { overflow: 'reject' },
        );
      } catch {
        return;
      }
    }
    this.typed = '';
    this.yearDraft.set('');
    this.write(date);
  }

  private inputs(): HTMLInputElement[] {
    return [
      ...this.host.querySelectorAll<HTMLInputElement>(
        '[data-slot="date-input-next-segment"]',
      ),
    ];
  }

  /** Focus on the part before or after, in the locale's order. */
  private move(from: HTMLElement, by: 1 | -1): void {
    const all = this.inputs();
    all[all.indexOf(from as HTMLInputElement) + by]?.focus();
  }

  /** Focus on the part to the left or right, as they show (right to left too). */
  private moveOnScreen(from: HTMLElement, by: 1 | -1): void {
    const all = this.inputs().sort(
      (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
    );
    all[all.indexOf(from as HTMLInputElement) + by]?.focus();
  }

  /** A part set — the date once every part is there (the day kept within its month), else none. */
  private set(type: ScDateInputNextPart, part: number | undefined): void {
    const parts: ScDateInputNextParts = { ...this.parts(), [type]: part };
    let date: Temporal.PlainDate | null = null;
    if (parts.day && parts.month && parts.year) {
      date = Temporal.PlainDate.from(
        { year: parts.year, month: parts.month, day: parts.day },
        { overflow: 'constrain' },
      );
      parts.day = date.day;
    }
    this.parts.set(parts);
    const current = this.date();
    if (date === current || (date && current && date.equals(current))) return;
    this.written = date;
    this.write(date);
  }

  /** The day, written: its value — or the picker's (a range's end). */
  private write(date: Temporal.PlainDate | null): void {
    if (!this.picker) {
      this.value.set(date);
      return;
    }
    const part = this.part();
    if (!part) {
      this.picker.value.set(date);
      return;
    }
    const range = this.picker.value() as ScCalendarRange | null;
    const next =
      part === 'start'
        ? { from: date ?? undefined, to: range?.to }
        : { from: range?.from, to: date ?? undefined };
    this.picker.value.set(next.from || next.to ? next : null);
  }
}
