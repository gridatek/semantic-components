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
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import type { ScCalendarRange } from '../calendar';
import { ScDatePicker } from '../date-picker/date-picker';
import { SC_FIELD } from '../field';

export type ScDateSegmentType = 'day' | 'month' | 'year';

/** A piece of the date as the locale writes it: a part to edit, or the text between. */
export interface ScDateSegment {
  readonly type: ScDateSegmentType | 'literal';
  /** A literal's text (`/`, `.`, `-`…). */
  readonly text: string;
}

type Parts = Partial<Record<ScDateSegmentType, number>>;

const NONE = Symbol('none');
const PLACEHOLDER: Record<ScDateSegmentType, string> = {
  day: '––',
  month: '––',
  year: '––––',
};

/**
 * A date, typed part by part — day, month, year — in the order and with the
 * separators of its locale. Each part is a spin button: arrows step it,
 * digits fill it (moving on when it is whole), Backspace clears it. A
 * `[formField]`: `Temporal.PlainDate`, or `null` until every part is filled.
 * Named by its `scField`'s label. In a date picker, it is the picker's value
 * — a range's end with `part="start"` / `"end"` — and its locale and limits.
 */
@Component({
  selector: 'div[scSegmentedDateInput]',
  exportAs: 'scSegmentedDateInput',
  template: `
    @for (segment of segments(); track $index) {
      @if (segment.type === 'literal') {
        <span aria-hidden="true" class="whitespace-pre">{{
          segment.text
        }}</span>
      } @else {
        <span
          role="spinbutton"
          data-slot="segmented-date-input-segment"
          [attr.data-type]="segment.type"
          [attr.data-placeholder]="parts()[segment.type] === undefined || null"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          [attr.aria-label]="names()[segment.type]"
          [attr.aria-valuemin]="range(segment.type)[0]"
          [attr.aria-valuemax]="range(segment.type)[1]"
          [attr.aria-valuenow]="parts()[segment.type] ?? null"
          [attr.aria-valuetext]="valueText(segment.type)"
          [attr.aria-invalid]="showInvalid() || null"
          [attr.aria-disabled]="isDisabled() || null"
          [attr.aria-describedby]="describedBy()"
          [class]="segmentClass"
          (focus)="typed = ''"
          (blur)="onBlur(segment.type)"
          (keydown)="onKeydown($event, segment.type)"
        >
          {{ text(segment.type) }}
        </span>
      }
    }
  `,
  host: {
    'data-slot': 'segmented-date-input',
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-part]': 'part()',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSegmentedDateInput implements FormValueControl<Temporal.PlainDate | null> {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly picker = inject(ScDatePicker, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });

  readonly value = model<Temporal.PlainDate | null>(null);
  /** In a date picker's range: the end it is. */
  readonly part = input<'start' | 'end' | undefined>(undefined);
  /** The language: the order and the separators; the app's (or the picker's) by default. */
  readonly locale = input<string | undefined>(undefined);
  /** The first day; an earlier one is marked invalid. */
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  /** The last day; a later one is marked invalid. */
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that cannot be picked: marked invalid. */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  readonly disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly appLocale = inject(LOCALE_ID);
  protected readonly language = computed(
    () => this.locale() ?? this.picker?.locale() ?? this.appLocale,
  );
  /** Disabled — or its date picker is. */
  readonly isDisabled = computed(
    () => this.disabled() || !!this.picker?.disabled(),
  );

  protected readonly id = computed(
    () =>
      this.idInput() ||
      (this.part() === 'end' ? null : this.field?.id()) ||
      null,
  );
  protected readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
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
      new Intl.DateTimeFormat(this.language(), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  );

  /** The parts in the locale's order, with the text between them. */
  readonly segments = computed<ScDateSegment[]>(() =>
    this.formatter()
      .formatToParts(Temporal.PlainDate.from('2026-10-14'))
      .filter((part) => ['literal', 'day', 'month', 'year'].includes(part.type))
      .map((part) => ({
        type: part.type as ScDateSegment['type'],
        text: part.type === 'literal' ? part.value : '',
      })),
  );

  /** Each part's name, in the locale's words. */
  protected readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.language(), {
      type: 'dateTimeField',
    });
    return {
      day: names.of('day'),
      month: names.of('month'),
      year: names.of('year'),
    } as Record<ScDateSegmentType, string>;
  });

  private readonly twoDigits = computed(
    () =>
      new Intl.NumberFormat(this.language(), {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
  );
  private readonly fourDigits = computed(
    () =>
      new Intl.NumberFormat(this.language(), {
        minimumIntegerDigits: 4,
        useGrouping: false,
      }),
  );
  private readonly monthName = computed(
    () => new Intl.DateTimeFormat(this.language(), { month: 'long' }),
  );

  /** The parts typed so far: the day's — kept while one is still empty. */
  private written: Temporal.PlainDate | null | typeof NONE = NONE;
  readonly parts = linkedSignal<Temporal.PlainDate | null, Parts>({
    source: this.date,
    computation: (date, previous) => {
      const own = previous && date === this.written;
      this.written = NONE;
      if (own) return previous.value;
      return date ? { day: date.day, month: date.month, year: date.year } : {};
    },
  });

  /** Not a day that can be picked: outside the limits, unavailable — or a range's end before its start. */
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
  protected typed = '';

  protected readonly segmentClass = cn(
    'rounded-sm px-0.5 tabular-nums caret-transparent outline-none select-none',
    'focus:bg-accent focus:text-accent-foreground data-placeholder:text-muted-foreground',
    'aria-invalid:text-destructive',
  );

  protected readonly class = computed(() =>
    cn(
      'dark:bg-input/30 border-input flex h-8 w-full min-w-0 items-center rounded-lg border bg-transparent px-2 py-1 text-base transition-colors md:text-sm',
      'has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
      'has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 dark:has-[[aria-invalid=true]]:ring-destructive/40',
      'data-disabled:bg-input/50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
      'in-data-[slot=input-group]:h-full in-data-[slot=input-group]:w-auto in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:has-[:focus-visible]:ring-0 in-data-[slot=input-group]:has-[[aria-invalid=true]]:ring-0 dark:in-data-[slot=input-group]:bg-transparent',
      this.classInput(),
    ),
  );

  /** A part's lowest and highest value; the day's follows the month and year. */
  protected range(type: ScDateSegmentType): [number, number] {
    if (type === 'month') return [1, 12];
    if (type === 'year') return [1, 9999];
    const { month, year } = this.parts();
    if (!month) return [1, 31];
    return [
      1,
      Temporal.PlainYearMonth.from({ year: year ?? 2000, month }).daysInMonth,
    ];
  }

  protected valueText(type: ScDateSegmentType): string | null {
    const value = this.parts()[type];
    if (value === undefined) return null;
    if (type === 'month')
      return this.monthName().format(
        Temporal.PlainDate.from({ year: 2000, month: value, day: 1 }),
      );
    return this.text(type);
  }

  /** A part as the locale writes it — or the placeholder. */
  protected text(type: ScDateSegmentType): string {
    const value = this.parts()[type];
    if (value === undefined) return PLACEHOLDER[type];
    return (type === 'year' ? this.fourDigits() : this.twoDigits()).format(
      value,
    );
  }

  protected onKeydown(event: KeyboardEvent, type: ScDateSegmentType): void {
    if (this.isDisabled()) return;
    const [min, max] = this.range(type);
    const current = this.parts()[type];
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        this.typed = '';
        const up = event.key === 'ArrowUp';
        if (current === undefined) {
          this.set(type, Temporal.Now.plainDateISO()[type]);
        } else {
          let next = current + (up ? 1 : -1);
          if (next > max) next = min;
          if (next < min) next = max;
          this.set(type, next);
        }
        break;
      }
      case 'Home':
      case 'End':
        this.typed = '';
        this.set(type, event.key === 'Home' ? min : max);
        break;
      case 'Backspace':
      case 'Delete':
        this.typed = '';
        if (current === undefined) this.move(event.target, -1);
        else this.set(type, undefined);
        break;
      case 'ArrowLeft':
      case 'ArrowRight': {
        const rtl = getComputedStyle(this.host).direction === 'rtl';
        this.move(event.target, (event.key === 'ArrowRight') !== rtl ? 1 : -1);
        break;
      }
      default:
        if (!/^\d$/.test(event.key)) return;
        if (type === 'year') this.typeYear(event);
        else this.type(event, type, min, max);
    }
    event.preventDefault();
  }

  /** Leaving the year with two digits typed: this century's. */
  protected onBlur(type: ScDateSegmentType): void {
    if (type === 'year' && this.typed && this.typed.length <= 2)
      this.set('year', 2000 + Number(this.typed));
    this.typed = '';
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.host.contains(next)) return;
    if (this.picker) this.picker.touch.emit();
    else this.touch.emit();
  }

  /** A digit typed into the day or month: moving on once no digit can follow. */
  private type(
    event: KeyboardEvent,
    type: 'day' | 'month',
    min: number,
    max: number,
  ): void {
    let typed = this.typed + event.key;
    if (Number(typed) > max) typed = event.key;
    this.typed = typed;
    const number = Number(typed);
    if (number >= min) this.set(type, number);
    if (typed.length >= 2 || number * 10 > max) {
      this.typed = '';
      this.move(event.target, 1);
    }
  }

  /** A digit typed into the year: whole at four digits. */
  private typeYear(event: KeyboardEvent): void {
    const typed = (this.typed + event.key).slice(-4);
    this.typed = typed;
    if (typed.length < 4) return;
    this.set('year', Number(typed));
    this.typed = '';
    this.move(event.target, 1);
  }

  /** Focus on the part before or after. */
  private move(from: EventTarget | null, by: 1 | -1): void {
    const all = [
      ...this.host.querySelectorAll<HTMLElement>(
        '[data-slot="segmented-date-input-segment"]',
      ),
    ];
    all[all.indexOf(from as HTMLElement) + by]?.focus();
  }

  /** A part set — the date once every part is there (the day kept within its month), else none. */
  private set(type: ScDateSegmentType, part: number | undefined): void {
    const parts: Parts = { ...this.parts(), [type]: part };
    let date: Temporal.PlainDate | null = null;
    if (parts.day && parts.month && parts.year) {
      date = Temporal.PlainDate.from(
        { year: parts.year, month: parts.month, day: parts.day },
        { overflow: 'constrain' },
      );
      parts.day = date.day;
    }
    this.parts.set(parts);
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
