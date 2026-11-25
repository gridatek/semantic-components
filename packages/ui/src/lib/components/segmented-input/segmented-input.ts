import {
  Directive,
  ElementRef,
  HostAttributeToken,
  InjectionToken,
  LOCALE_ID,
  type Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';

/** A part of a date and time: what a segment edits. */
export type ScDateTimePart =
  'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'dayPeriod';

type ScNumericPart = Exclude<ScDateTimePart, 'dayPeriod'>;

/** A piece of the value as the locale writes it: a part to edit, or the text between. */
export interface ScDateTimeSegmentData {
  readonly type: ScDateTimePart | 'literal';
  /** A literal's text (`:`, `/`, `, `, ` h `…). */
  readonly text: string;
}

/** The parts typed so far: numbers as shown (the hour on its clock), AM / PM. */
export type ScDateTimeParts = Partial<Record<ScNumericPart, number>> & {
  dayPeriod?: 'am' | 'pm';
};

/** A value of a part: a number, or AM / PM. */
export type ScDateTimePartValue = number | 'am' | 'pm';

/** The fields of a value, on a 24-hour clock. */
export interface ScDateTimeFields {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

/** Page Up / Page Down: a bigger step. */
const BIG_STEP: Record<ScNumericPart, number> = {
  year: 5,
  month: 3,
  day: 7,
  hour: 2,
  minute: 15,
  second: 15,
};
const TIME_PARTS: readonly ScDateTimePart[] = ['hour', 'minute', 'second'];
const NONE = Symbol('none');
/** Languages written right to left. */
const RTL = /^(ar|fa|he|iw|ur|ps|yi|dv|ckb|sd|ug)(-|$)/i;

/** A digit, typed on any keyboard: `7`, or the Arabic `٧`, the Persian `۷`. */
export function scDigitOf(char: string): number | undefined {
  if (/^[0-9]$/.test(char)) return Number(char);
  const code = char.charCodeAt(0);
  if (code >= 0x660 && code <= 0x669) return code - 0x660;
  if (code >= 0x6f0 && code <= 0x6f9) return code - 0x6f0;
  return undefined;
}

/** The segmented input a segment belongs to (each one provides itself). */
export const SC_SEGMENTED_INPUT = new InjectionToken<ScSegmentedInput<unknown>>(
  'SC_SEGMENTED_INPUT',
);

/** What the template lays out: the clock's digits as one left-to-right run, the rest around it. */
type ScSegmentedInputItem =
  | { readonly kind: 'clock'; readonly segments: ScDateTimeSegmentData[] }
  | { readonly kind: 'segment'; readonly segment: ScDateTimeSegmentData };

/**
 * The template of a segmented input: a segment per part, as wide as what it
 * shows; the clock's digits left to right in any direction.
 */
export const SC_SEGMENTED_INPUT_TEMPLATE = `
  <ng-template #part let-segment>
    @let type = partOf(segment);
    <span class="inline-grid">
      <input #partInput="scDateTimeSegment" [scDateTimeSegment]="type" />
      <!-- Its width: what it shows (or the empty mark), as text would be —
           after the input, whose part it reads. -->
      <span
        aria-hidden="true"
        class="invisible col-start-1 row-start-1 px-0.5 whitespace-pre tabular-nums"
        >{{ partInput.text() || partInput.placeholder() }}</span
      >
    </span>
  </ng-template>

  @for (item of layout(); track $index) {
    @if (item.kind === 'clock') {
      <span dir="ltr" class="inline-flex items-center">
        @for (segment of item.segments; track $index) {
          @if (segment.type === 'literal') {
            <span aria-hidden="true" class="whitespace-pre">{{ segment.text }}</span>
          } @else {
            <ng-container
              [ngTemplateOutlet]="part"
              [ngTemplateOutletContext]="{ $implicit: segment }"
            />
          }
        }
      </span>
    } @else if (item.segment.type === 'literal') {
      <span aria-hidden="true" class="whitespace-pre">{{ item.segment.text }}</span>
    } @else {
      <ng-container
        [ngTemplateOutlet]="part"
        [ngTemplateOutletContext]="{ $implicit: item.segment }"
      />
    }
  }
`;

/**
 * What the Date Input, the Time Input and the Date Time Input share: their
 * parts written from the locale (`Intl.DateTimeFormat#formatToParts`), each an
 * input (`scDateTimeSegment`); what is typed read from the input events — a
 * phone's keyboard too — digits moving on, separators moving on, Backspace a
 * digit back, the arrows stepping, a whole value pasted. Each one says which
 * parts it shows and how they make its value.
 */
@Directive({
  host: {
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.dir]': 'direction()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[attr.data-readonly]': 'isReadonly() || null',
    '[attr.data-invalid]': 'showInvalid() || null',
    '[attr.data-empty]': 'current() === null || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export abstract class ScSegmentedInput<V> {
  protected readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().segmentedInput;
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  protected readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** Its value now: its own — or, in a picker, the picker's. */
  abstract readonly current: Signal<V | null>;
  /** The fields it shows: what `Intl.DateTimeFormat` writes (the hour's cycle resolved). */
  protected abstract readonly formatOptions: Signal<Intl.DateTimeFormatOptions>;
  /** The hour always in two digits (`09`). */
  readonly leadingZeros: Signal<boolean> = signal(false);
  /** Not a value that can be picked. */
  abstract readonly outOfRange: Signal<boolean>;

  /** Its value written: its own — or a picker's. */
  protected abstract write(value: V | null): void;
  /** A value from its fields (24-hour); null when they make none. */
  protected abstract fromFields(fields: ScDateTimeFields): V | null;
  /** A value's fields. */
  protected abstract fieldsOf(value: V): ScDateTimeFields;
  /** A value from ISO text (`2026-11-02`, `14:30`…), or null. */
  protected abstract fromIso(text: string): V | null;
  protected abstract same(a: V, b: V): boolean;

  /** Read-only — or what it belongs to is. */
  readonly isReadonly: Signal<boolean> = computed(() => this.readonly());
  /** Required — or what it belongs to is. */
  readonly isRequired: Signal<boolean> = computed(() => this.required());
  /** Disabled — or what it belongs to is. */
  readonly isDisabled: Signal<boolean> = computed(() => this.disabled());
  /** Invalid, shown: out of range, or invalid once touched. */
  readonly showInvalid: Signal<boolean> = computed(
    () => this.outOfRange() || (this.invalid() && this.touched()),
  );

  readonly id = computed(() => this.idInput() || this.field?.id() || null);
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

  /** 12 hours (with AM/PM), or 24. */
  readonly twelveHours = computed(() => {
    const cycle = this.formatOptions().hourCycle;
    return cycle === 'h11' || cycle === 'h12';
  });

  private readonly formatter = computed(
    () => new Intl.DateTimeFormat(this.locale, this.formatOptions()),
  );

  /** The parts in the locale's order, with the text between them. */
  readonly segments = computed<ScDateTimeSegmentData[]>(() =>
    this.formatter()
      .formatToParts(Temporal.PlainDateTime.from('2026-10-14T11:22:33'))
      .filter((part) =>
        [
          'literal',
          'year',
          'month',
          'day',
          'hour',
          'minute',
          'second',
          'dayPeriod',
        ].includes(part.type),
      )
      .map((part) => ({
        type: part.type as ScDateTimeSegmentData['type'],
        text: part.type === 'literal' ? part.value : '',
      })),
  );

  /** The parts it shows. */
  private readonly shown = computed(
    () =>
      new Set(
        this.segments()
          .filter((segment) => segment.type !== 'literal')
          .map((segment) => segment.type as ScDateTimePart),
      ),
  );

  /** The segments, the clock's run (hour to its last part) kept together. */
  private readonly layout = computed<ScSegmentedInputItem[]>(() => {
    const segments = this.segments();
    const clock = (type: ScDateTimeSegmentData['type']) =>
      TIME_PARTS.includes(type as ScDateTimePart);
    const first = segments.findIndex((s) => clock(s.type));
    if (first < 0)
      return segments.map((segment) => ({ kind: 'segment' as const, segment }));
    let last = first;
    segments.forEach((s, i) => clock(s.type) && (last = i));
    return [
      ...segments
        .slice(0, first)
        .map((segment) => ({ kind: 'segment' as const, segment })),
      { kind: 'clock' as const, segments: segments.slice(first, last + 1) },
      ...segments
        .slice(last + 1)
        .map((segment) => ({ kind: 'segment' as const, segment })),
    ];
  });

  /** Each part's name, in the locale's words. */
  private readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.locale, {
      type: 'dateTimeField',
    });
    return Object.fromEntries(
      (
        [
          'year',
          'month',
          'day',
          'hour',
          'minute',
          'second',
          'dayPeriod',
        ] as const
      ).map((type) => [type, names.of(type) ?? type]),
    ) as Record<ScDateTimePart, string>;
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

  /** The parts typed so far: the value's — kept while one is still empty. */
  private written: V | null | typeof NONE = NONE;
  readonly parts = linkedSignal({
    source: () => ({ value: this.current(), twelve: this.twelveHours() }),
    computation: (source, previous): ScDateTimeParts => {
      const own =
        !!previous &&
        source.value === this.written &&
        previous.source.twelve === source.twelve;
      this.written = NONE;
      return own ? previous.value : this.split(source.value);
    },
  });

  /** Digits typed into the focused part. */
  private typed = '';
  /** The year as typed so far (shown until it is whole, at four digits or when left). */
  private readonly yearDraft = signal('');

  private readonly class = computed(() =>
    cn(
      this.styles.root,
      // In an input group: the group draws the box.
      // In a date range input: the range draws the box round both ends.
      'in-data-[slot=date-range-input]:h-auto in-data-[slot=date-range-input]:w-auto in-data-[slot=date-range-input]:flex-none in-data-[slot=date-range-input]:rounded-none in-data-[slot=date-range-input]:border-0 in-data-[slot=date-range-input]:bg-transparent in-data-[slot=date-range-input]:p-0 in-data-[slot=date-range-input]:shadow-none in-data-[slot=date-range-input]:ring-0 in-data-[slot=date-range-input]:has-[:focus-visible]:ring-0 in-data-[slot=date-range-input]:data-invalid:ring-0 dark:in-data-[slot=date-range-input]:bg-transparent',
      '[[data-slot=input-group]>&]:h-full [[data-slot=input-group]>&]:w-auto [[data-slot=input-group]>&]:flex-1 [[data-slot=input-group]>&]:rounded-none [[data-slot=input-group]>&]:border-0 [[data-slot=input-group]>&]:bg-transparent [[data-slot=input-group]>&]:shadow-none [[data-slot=input-group]>&]:ring-0 [[data-slot=input-group]>&]:has-[:focus-visible]:ring-0 [[data-slot=input-group]>&]:data-invalid:ring-0 dark:[[data-slot=input-group]>&]:bg-transparent',
      this.classInput(),
    ),
  );

  /** Empties every part. */
  clear(): void {
    this.typed = '';
    this.yearDraft.set('');
    this.parts.set({});
    if (this.current() !== null) {
      this.written = null;
      this.write(null);
    }
  }

  /** Focus on a part — the first one by default (Signal Forms calls it, for an error). */
  focus(options?: FocusOptions, part?: ScDateTimePart): void {
    this.inputs()
      .find((input) => !part || input.dataset['type'] === part)
      ?.focus(options);
  }

  /** The part a segment edits (the template's context types it loosely). */
  private partOf(segment: ScDateTimeSegmentData): ScDateTimePart {
    return segment.type as ScDateTimePart;
  }

  /** A part not typed yet. */
  ɵempty(type: ScDateTimePart): boolean {
    return (
      this.parts()[type] === undefined && !(type === 'year' && this.yearDraft())
    );
  }

  /** A part's name, in the locale's words. */
  ɵname(type: ScDateTimePart): string {
    return this.names()[type];
  }

  /** A part focused: what was typed in another one is forgotten. */
  ɵfocus(): void {
    this.typed = '';
  }

  /** A part left: a year of one or two digits is this century's (`27` → 2027). */
  ɵblur(type: ScDateTimePart): void {
    if (type === 'year') this.settleYear();
    this.typed = '';
  }

  /** A part's lowest and highest value (AM/PM: 0 and 1); the day's follows the month and year. */
  ɵrange(type: ScDateTimePart): [number, number] {
    switch (type) {
      case 'year':
        return [1, 9999];
      case 'month':
        return [1, 12];
      case 'day': {
        const { month, year } = this.parts();
        if (!month) return [1, 31];
        return [1, this.daysIn(year, month)];
      }
      case 'hour':
        return this.twelveHours() ? [1, 12] : [0, 23];
      case 'dayPeriod':
        return [0, 1];
      default:
        return [0, 59];
    }
  }

  ɵvalueNow(type: ScDateTimePart): number | null {
    const part = this.parts()[type];
    if (part === undefined) return null;
    if (type === 'dayPeriod') return part === 'am' ? 0 : 1;
    return part as number;
  }

  /** A part's text for a screen reader: the month by its name. */
  ɵvalueText(type: ScDateTimePart): string | null {
    const value = this.parts()[type];
    if (value === undefined) return null;
    if (type === 'month')
      return this.monthName().format(
        Temporal.PlainDate.from({ year: 2000, month: value as number, day: 1 }),
      );
    return this.ɵtext(type) || null;
  }

  /** A part as the locale writes it — empty when it is. */
  ɵtext(type: ScDateTimePart): string {
    if (type === 'year' && this.yearDraft())
      return this.digits().plain.format(Number(this.yearDraft()));
    const part = this.parts()[type];
    return part === undefined ? '' : this.ɵpartText(type, part);
  }

  /** A value of a part as the locale writes it: `04`, `2026`, `9`, `PM` — a time picker's columns too. */
  ɵpartText(type: ScDateTimePart, value: ScDateTimePartValue): string {
    const digits = this.digits();
    if (type === 'year') return digits.four.format(value as number);
    if (type === 'month' || type === 'day')
      return digits.two.format(value as number);
    const parts = { ...this.parts(), [type]: value };
    const twelve = this.twelveHours();
    const hour = parts.hour ?? (twelve ? 12 : 0);
    const time = Temporal.PlainTime.from({
      hour: twelve ? (hour % 12) + (parts.dayPeriod === 'pm' ? 12 : 0) : hour,
      minute: parts.minute ?? 0,
      second: parts.second ?? 0,
    });
    const text =
      new Intl.DateTimeFormat(this.locale, {
        hour: this.leadingZeros() ? '2-digit' : 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: twelve ? 'h12' : 'h23',
      })
        .formatToParts(time)
        .find((part) => part.type === type)?.value ?? '';
    // A 12-hour clock ignores 2-digit for the hour (ICU): padded here.
    return type === 'hour' && this.leadingZeros() && [...text].length === 1
      ? digits.two.format(0).slice(-1) + text
      : text;
  }

  /**
   * A part set — as typed, or picked in a picker: the value once every part
   * it shows is there (the day kept within its month), else none.
   */
  ɵset(type: ScDateTimePart, part: ScDateTimePartValue | undefined): void {
    this.ɵsetParts({ [type]: part } as ScDateTimeParts);
  }

  /** Several parts set at once — a day picked in a calendar. */
  ɵsetParts(changes: ScDateTimeParts): void {
    const parts: ScDateTimeParts = { ...this.parts(), ...changes };
    if (parts.year && parts.month && parts.day)
      parts.day = Math.min(parts.day, this.daysIn(parts.year, parts.month));
    this.parts.set(parts);
    const whole = [...this.shown()].every((type) => parts[type] !== undefined);
    const value = whole ? this.fromFields(this.fieldsFrom(parts)) : null;
    const current = this.current();
    if (value === current || (value && current && this.same(value, current)))
      return;
    this.written = value;
    this.write(value);
  }

  ɵkeydown(event: KeyboardEvent, type: ScDateTimePart): void {
    const input = event.target as HTMLInputElement;
    const editable = !this.isReadonly() && !this.isDisabled();
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
          const home = event.key === 'Home';
          this.ɵset(
            type,
            type === 'dayPeriod' ? (home ? 'am' : 'pm') : home ? min : max,
          );
        }
        break;
      case 'Backspace':
        if (editable) this.backspace(type, input);
        break;
      case 'Delete':
        if (editable) this.empty(type);
        break;
      default:
        // Digits, letters and separators come as input (any keyboard, a
        // phone's too): ɵbeforeInput.
        return;
    }
    event.preventDefault();
  }

  /** What is typed, on any keyboard: the part takes it, the input's own text stays the part's. */
  ɵbeforeInput(event: InputEvent, type: ScDateTimePart): void {
    if (!event.cancelable) return;
    event.preventDefault();
    if (this.isReadonly() || this.isDisabled()) return;
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
      this.empty(type);
    }
  }

  /** Input that couldn't be stopped (a phone's composition): taken, then the part's text back. */
  ɵinput(event: Event, type: ScDateTimePart): void {
    const input = event.target as HTMLInputElement;
    const data = (event as InputEvent).data;
    if (data && !this.isReadonly() && !this.isDisabled()) {
      const char = [...data].pop() ?? '';
      if (char) this.type(char, type, input);
    }
    input.value = this.ɵtext(type);
  }

  /** A whole value pasted — ISO, or its numbers in the locale's order — fills every part. */
  ɵpaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.isReadonly() || this.isDisabled()) return;
    this.paste(event.clipboardData?.getData('text') ?? '');
  }

  /** Focus left it: touched. */
  onTouched(): void {
    this.touch.emit();
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    this.onTouched();
  }

  /** A key typed into a part: a digit, AM/PM's letter, or a separator. */
  private type(char: string, type: ScDateTimePart, input: HTMLElement): void {
    if (type === 'dayPeriod') {
      const period = this.periodOf(char);
      if (period) {
        this.ɵset(type, period);
        this.move(input, 1);
      }
      return;
    }
    const digit = scDigitOf(char);
    if (digit === undefined) {
      // A separator (`:`, `/`, `.`, a space): on to the next part.
      if (!/[\p{L}\p{N}]/u.test(char) && !this.ɵempty(type)) {
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
        this.ɵset('year', Number(draft));
        this.move(input, 1);
      }
      return;
    }
    const [min, max] = this.ɵrange(type);
    let typed = this.typed + digit;
    if (Number(typed) > max) typed = String(digit);
    this.typed = typed;
    const number = Number(typed);
    if (number >= min) this.ɵset(type, number);
    // Whole once no digit can follow (`4` in the month, `9` in the hour, `30`).
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
    this.ɵset('year', draft.length <= 2 ? 2000 + year : year || undefined);
  }

  private empty(type: ScDateTimePart): void {
    this.typed = '';
    if (type === 'year') this.yearDraft.set('');
    this.ɵset(type, undefined);
  }

  /** Backspace: a digit back, then the part emptied, then the part before. */
  private backspace(type: ScDateTimePart, input: HTMLElement): void {
    if (type === 'year' && this.yearDraft()) {
      this.yearDraft.update((draft) => draft.slice(0, -1));
      return;
    }
    const part = this.parts()[type];
    if (part === undefined) {
      this.typed = '';
      this.move(input, -1);
    } else if (typeof part === 'number' && part >= 10) {
      const kept = String(part).slice(0, -1);
      if (type === 'year') {
        this.ɵset('year', undefined);
        this.yearDraft.set(kept);
      } else {
        this.typed = kept;
        this.ɵset(
          type,
          Number(kept) >= this.ɵrange(type)[0] ? Number(kept) : undefined,
        );
      }
    } else {
      this.typed = '';
      this.ɵset(type, undefined);
    }
  }

  /**
   * The arrows: one up or down — Page Up / Down a bigger step (a time's on
   * its multiples); all but the year wrap. An empty part starts at now.
   */
  private step(type: ScDateTimePart, by: 1 | -1, big: boolean): void {
    this.settleYear();
    const part = this.parts()[type];
    if (part === undefined) {
      this.ɵset(type, this.split(this.now(), true)[type]);
      return;
    }
    if (type === 'dayPeriod') {
      this.ɵset(type, part === 'am' ? 'pm' : 'am');
      return;
    }
    const current = part as number;
    const [min, max] = this.ɵrange(type);
    const size = big ? BIG_STEP[type] : 1;
    let next = current + by * size;
    if (big && TIME_PARTS.includes(type))
      next =
        by > 0
          ? Math.floor(current / size) * size + size
          : Math.ceil(current / size) * size - size;
    if (type === 'year') {
      this.ɵset(type, Math.min(max, Math.max(min, next)));
      return;
    }
    const span = max - min + 1;
    this.ɵset(type, ((((next - min) % span) + span) % span) + min);
  }

  /** A whole value, from text: ISO, or its numbers in the locale's order (with a/p on a 12-hour clock). */
  private paste(text: string): void {
    const normal = [...text]
      .map((char) => scDigitOf(char) ?? char)
      .join('')
      .trim();
    let value: V | null = null;
    try {
      value = this.fromIso(normal);
    } catch {
      // Not ISO: read as numbers below.
    }
    if (!value) {
      const numbers = normal.match(/\d+/g) ?? [];
      const order = this.segments()
        .filter(
          (segment) =>
            segment.type !== 'literal' && segment.type !== 'dayPeriod',
        )
        .map((segment) => segment.type as ScNumericPart);
      const hasDate = order.some((type) => !TIME_PARTS.includes(type));
      const dateCount = order.filter((t) => !TIME_PARTS.includes(t)).length;
      if (numbers.length > order.length) return;
      if (hasDate && numbers.length < dateCount) return;
      if (!hasDate && numbers.length < 1) return;
      const fields: ScDateTimeFields = {};
      order.forEach((type, i) => {
        if (numbers[i] !== undefined) fields[type] = Number(numbers[i]);
      });
      if (
        fields.year !== undefined &&
        String(numbers[order.indexOf('year')]).length <= 2
      )
        fields.year += 2000;
      const period = /([ap])\.?\s*m?\.?\s*$/i.exec(normal)?.[1]?.toLowerCase();
      if (period && fields.hour !== undefined) {
        if (fields.hour < 1 || fields.hour > 12) return;
        fields.hour = (fields.hour % 12) + (period === 'p' ? 12 : 0);
      }
      try {
        value = this.fromFields(fields);
      } catch {
        return;
      }
    }
    if (!value) return;
    this.typed = '';
    this.yearDraft.set('');
    this.write(value);
  }

  /** `a` / `p` — or the first letter of the locale's AM / PM. */
  private periodOf(char: string): 'am' | 'pm' | undefined {
    const letter = char.toLowerCase();
    const first = (hour: number) =>
      new Intl.DateTimeFormat(this.locale, {
        hour: 'numeric',
        hourCycle: 'h12',
      })
        .formatToParts(Temporal.PlainTime.from({ hour }))
        .find((part) => part.type === 'dayPeriod')
        ?.value[0]?.toLowerCase();
    if (letter === 'a' || letter === first(9)) return 'am';
    if (letter === 'p' || letter === first(21)) return 'pm';
    return undefined;
  }

  /** Now, as a value — where the arrows start an empty part. */
  private now(): V {
    const now = Temporal.Now.plainDateTimeISO();
    return this.fromFields({
      year: now.year,
      month: now.month,
      day: now.day,
      hour: now.hour,
      minute: now.minute,
      second: now.second,
    }) as V;
  }

  private daysIn(year: number | undefined, month: number): number {
    return Temporal.PlainYearMonth.from({ year: year ?? 2000, month })
      .daysInMonth;
  }

  /** The parts' fields, on a 24-hour clock; the parts not shown at their lowest. */
  private fieldsFrom(parts: ScDateTimeParts): ScDateTimeFields {
    const hour = parts.hour ?? 0;
    return {
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: this.twelveHours()
        ? (hour % 12) + (parts.dayPeriod === 'pm' ? 12 : 0)
        : hour,
      minute: parts.minute ?? 0,
      second: parts.second ?? 0,
    };
  }

  /** A value in parts, as shown; `all` keeps the parts not shown too. */
  private split(value: V | null, all = false): ScDateTimeParts {
    if (!value) return {};
    const fields = this.fieldsOf(value);
    const shown = this.shown();
    const twelve = this.twelveHours();
    const parts: ScDateTimeParts = {};
    for (const type of ['year', 'month', 'day', 'minute', 'second'] as const)
      if (fields[type] !== undefined && (all || shown.has(type)))
        parts[type] = fields[type];
    if (fields.hour !== undefined && (all || shown.has('hour'))) {
      parts.hour = twelve ? fields.hour % 12 || 12 : fields.hour;
      if (twelve) parts.dayPeriod = fields.hour < 12 ? 'am' : 'pm';
    }
    return parts;
  }

  private inputs(): HTMLInputElement[] {
    return [
      ...this.host.querySelectorAll<HTMLInputElement>(
        '[data-slot="date-time-segment"]',
      ),
    ];
  }

  /** The parts focus moves through: its own — or, an end of a date range input, both ends'. */
  private reachable(): HTMLInputElement[] {
    const range = this.host.closest('[data-slot="date-range-input"]');
    return range
      ? [
          ...range.querySelectorAll<HTMLInputElement>(
            '[data-slot="date-time-segment"]',
          ),
        ]
      : this.inputs();
  }

  /** Focus on the part before or after, in the locale's order (on into a range's other end). */
  private move(from: HTMLElement, by: 1 | -1): void {
    const all = this.reachable();
    all[all.indexOf(from as HTMLInputElement) + by]?.focus();
  }

  /** Focus on the part to the left or right, as they show (right to left too). */
  private moveOnScreen(from: HTMLElement, by: 1 | -1): void {
    const all = this.reachable().sort(
      (a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left,
    );
    all[all.indexOf(from as HTMLInputElement) + by]?.focus();
  }
}

/** The hour's cycle: the one asked, or the locale's. */
export function scHourCycle(
  locale: string,
  cycle: 12 | 24 | undefined,
): 'h12' | 'h23' {
  if (cycle) return cycle === 12 ? 'h12' : 'h23';
  const resolved = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
  }).resolvedOptions().hourCycle;
  return resolved === 'h11' || resolved === 'h12' ? 'h12' : 'h23';
}
