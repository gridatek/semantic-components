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
import { SC_FIELD } from '../field';

export type ScTimeSegmentType = 'hour' | 'minute' | 'second' | 'dayPeriod';

/** A piece of the time as the locale writes it: a part to edit, or the text between. */
export interface ScTimeSegment {
  readonly type: ScTimeSegmentType | 'literal';
  /** A literal's text (`:`, ` h `…). */
  readonly text: string;
}

/** How far the arrows move each part. */
export interface ScTimeStep {
  readonly hours?: number;
  readonly minutes?: number;
  readonly seconds?: number;
}

type ScTimeInputParts = Partial<
  Record<'hour' | 'minute' | 'second', number>
> & {
  dayPeriod?: 'am' | 'pm';
};

const NONE = Symbol('none');
const PLACEHOLDER = '––';

/**
 * A time, typed part by part — hour, minute (second), AM/PM — in the order,
 * the separators and the hour cycle of its locale. Each part is a spin
 * button: arrows step it, digits fill it (moving on when it is whole),
 * Backspace clears it. A `[formField]`: `Temporal.PlainTime`, or `null` until
 * every part is filled. Named by its `scField`'s label.
 */
@Component({
  selector: 'div[scTimeInput]',
  exportAs: 'scTimeInput',
  template: `
    @for (segment of segments(); track $index) {
      @if (segment.type === 'literal') {
        <span aria-hidden="true" class="whitespace-pre">{{
          segment.text
        }}</span>
      } @else {
        <span
          role="spinbutton"
          data-slot="time-input-segment"
          [attr.data-type]="segment.type"
          [attr.data-placeholder]="parts()[segment.type] === undefined || null"
          [attr.tabindex]="disabled() ? -1 : 0"
          [attr.aria-label]="names()[segment.type]"
          [attr.aria-valuemin]="range(segment.type)[0]"
          [attr.aria-valuemax]="range(segment.type)[1]"
          [attr.aria-valuenow]="valueNow(segment.type)"
          [attr.aria-valuetext]="valueText(segment.type)"
          [attr.aria-invalid]="showInvalid() || null"
          [attr.aria-disabled]="disabled() || null"
          [attr.aria-describedby]="describedBy()"
          [class]="segmentClass"
          (focus)="typed = ''"
          (keydown)="onKeydown($event, segment.type)"
        >
          {{ text(segment.type) }}
        </span>
      }
    }
  `,
  host: {
    'data-slot': 'time-input',
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimeInput implements FormValueControl<Temporal.PlainTime | null> {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });

  readonly value = model<Temporal.PlainTime | null>(null);
  /** The language: the order, the separators, the hour cycle; the app's by default. */
  readonly locale = input(inject(LOCALE_ID));
  /** 12 or 24 hours; the locale's by default. */
  readonly hourCycle = input<'h12' | 'h23' | undefined>(undefined);
  /** The smallest part: `'hour'`, `'minute'` or `'second'`. */
  readonly granularity = input<'hour' | 'minute' | 'second'>('minute');
  /** How far the arrows move each part (1 by default). */
  readonly step = input<ScTimeStep>({});
  /** The earliest time; an earlier one is marked invalid. */
  readonly minTime = input<Temporal.PlainTime | undefined>(undefined);
  /** The latest time; a later one is marked invalid. */
  readonly maxTime = input<Temporal.PlainTime | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  protected readonly id = computed(
    () => this.idInput() || this.field?.id() || null,
  );
  protected readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  /** 12 hours (with AM/PM), or 24. */
  readonly twelveHours = computed(() => {
    const cycle =
      this.hourCycle() ??
      new Intl.DateTimeFormat(this.locale(), {
        hour: 'numeric',
      }).resolvedOptions().hourCycle;
    return cycle === 'h11' || cycle === 'h12';
  });

  private readonly formatter = computed(() => {
    const granularity = this.granularity();
    return new Intl.DateTimeFormat(this.locale(), {
      hour: 'numeric',
      minute: granularity === 'hour' ? undefined : '2-digit',
      second: granularity === 'second' ? '2-digit' : undefined,
      hourCycle: this.twelveHours() ? 'h12' : 'h23',
    });
  });

  /** The parts in the locale's order, with the text between them. */
  readonly segments = computed<ScTimeSegment[]>(() =>
    this.formatter()
      .formatToParts(Temporal.PlainTime.from('11:22:33'))
      .filter(
        (part) =>
          part.type === 'literal' ||
          part.type === 'hour' ||
          part.type === 'minute' ||
          part.type === 'second' ||
          part.type === 'dayPeriod',
      )
      .map((part) => ({
        type: part.type as ScTimeSegment['type'],
        text: part.type === 'literal' ? part.value : '',
      })),
  );

  /** Each part's name, in the locale's words. */
  protected readonly names = computed(() => {
    const names = new Intl.DisplayNames(this.locale(), {
      type: 'dateTimeField',
    });
    return {
      hour: names.of('hour'),
      minute: names.of('minute'),
      second: names.of('second'),
      dayPeriod: names.of('dayPeriod'),
    } as Record<ScTimeSegmentType, string>;
  });

  /** The parts typed so far: the value's — kept while one is still empty. */
  private written: Temporal.PlainTime | null | typeof NONE = NONE;
  readonly parts = linkedSignal<Temporal.PlainTime | null, ScTimeInputParts>({
    source: this.value,
    computation: (value, previous) => {
      const own = previous && value === this.written;
      this.written = NONE;
      return own ? previous.value : this.split(value);
    },
  });

  /** Outside `minTime` / `maxTime`. */
  readonly outOfRange = computed(() => {
    const value = this.value();
    const min = this.minTime();
    const max = this.maxTime();
    return (
      !!value &&
      ((!!min && Temporal.PlainTime.compare(value, min) < 0) ||
        (!!max && Temporal.PlainTime.compare(value, max) > 0))
    );
  });
  readonly showInvalid = computed(
    () => this.outOfRange() || (this.invalid() && this.touched()),
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
      'in-data-[slot=input-group]:h-full in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:has-[:focus-visible]:ring-0 in-data-[slot=input-group]:has-[[aria-invalid=true]]:ring-0 dark:in-data-[slot=input-group]:bg-transparent',
      this.classInput(),
    ),
  );

  /** A part's lowest and highest value. */
  protected range(type: ScTimeSegmentType): [number, number] {
    if (type === 'hour') return this.twelveHours() ? [1, 12] : [0, 23];
    if (type === 'dayPeriod') return [0, 12];
    return [0, 59];
  }

  protected valueNow(type: ScTimeSegmentType): number | null {
    const parts = this.parts();
    if (type === 'dayPeriod')
      return parts.dayPeriod ? (parts.dayPeriod === 'am' ? 0 : 12) : null;
    return parts[type] ?? null;
  }

  protected valueText(type: ScTimeSegmentType): string | null {
    return this.parts()[type] === undefined ? null : this.text(type);
  }

  /** A part as the locale writes it — or the placeholder. */
  protected text(type: ScTimeSegmentType): string {
    const parts = this.parts();
    if (parts[type] === undefined) return PLACEHOLDER;
    const time = this.join({
      hour: parts.hour ?? (this.twelveHours() ? 12 : 0),
      minute: parts.minute ?? 0,
      second: parts.second ?? 0,
      dayPeriod: parts.dayPeriod ?? 'am',
    });
    return (
      this.formatter()
        .formatToParts(time)
        .find((part) => part.type === type)?.value ?? ''
    );
  }

  protected onKeydown(event: KeyboardEvent, type: ScTimeSegmentType): void {
    if (this.disabled()) return;
    const [min, max] = this.range(type);
    const current = this.parts()[type];
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown': {
        const up = event.key === 'ArrowUp';
        if (current === undefined) {
          this.set(type, this.nowParts()[type]);
        } else if (type === 'dayPeriod') {
          this.set(type, current === 'am' ? 'pm' : 'am');
        } else {
          const by = this.stepOf(type);
          let next = (current as number) + (up ? by : -by);
          if (next > max) next = min;
          if (next < min) next = max - ((max - min) % by);
          this.set(type, next);
        }
        break;
      }
      case 'Home':
      case 'End':
        if (type === 'dayPeriod')
          this.set(type, event.key === 'Home' ? 'am' : 'pm');
        else this.set(type, event.key === 'Home' ? min : max);
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
        if (type === 'dayPeriod') {
          const period = this.periodKey(event.key);
          if (!period) return;
          this.set(type, period);
          this.move(event.target, 1);
        } else if (/^\d$/.test(event.key)) {
          this.type(event, type, min, max);
        } else {
          return;
        }
    }
    event.preventDefault();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.touch.emit();
  }

  /** A digit typed: added to the part — moving on once no digit can follow. */
  private type(
    event: KeyboardEvent,
    type: Exclude<ScTimeSegmentType, 'dayPeriod'>,
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

  /** `a` / `p` — or the first letter of the locale's AM / PM. */
  private periodKey(key: string): 'am' | 'pm' | undefined {
    const letter = key.toLowerCase();
    const first = (hour: number) =>
      this.formatter()
        .formatToParts(Temporal.PlainTime.from({ hour }))
        .find((part) => part.type === 'dayPeriod')
        ?.value[0]?.toLowerCase();
    if (letter === 'a' || letter === first(9)) return 'am';
    if (letter === 'p' || letter === first(21)) return 'pm';
    return undefined;
  }

  private stepOf(type: Exclude<ScTimeSegmentType, 'dayPeriod'>): number {
    const step = this.step();
    const by =
      type === 'hour'
        ? step.hours
        : type === 'minute'
          ? step.minutes
          : step.seconds;
    return by && by > 0 ? by : 1;
  }

  /** Now, in parts — where the arrows start an empty part (on the step). */
  private nowParts(): Required<ScTimeInputParts> {
    const now = Temporal.Now.plainTimeISO();
    const parts = this.split(now) as Required<ScTimeInputParts>;
    const minutes = this.stepOf('minute');
    const seconds = this.stepOf('second');
    return {
      ...parts,
      minute: parts.minute - (parts.minute % minutes),
      second: parts.second - (parts.second % seconds),
    };
  }

  /** Focus on the part before or after. */
  private move(from: EventTarget | null, by: 1 | -1): void {
    const all = [
      ...this.host.querySelectorAll<HTMLElement>(
        '[data-slot="time-input-segment"]',
      ),
    ];
    all[all.indexOf(from as HTMLElement) + by]?.focus();
  }

  /** A part set — the value once every part is there, else none. */
  private set(type: ScTimeSegmentType, part: number | 'am' | 'pm' | undefined) {
    const parts = { ...this.parts(), [type]: part };
    this.parts.set(parts);
    const granularity = this.granularity();
    const whole =
      parts.hour !== undefined &&
      (granularity === 'hour' || parts.minute !== undefined) &&
      (granularity !== 'second' || parts.second !== undefined) &&
      (!this.twelveHours() || parts.dayPeriod !== undefined);
    const value = whole ? this.join(parts) : null;
    this.written = value;
    this.value.set(value);
  }

  private split(value: Temporal.PlainTime | null): ScTimeInputParts {
    if (!value) return {};
    const granularity = this.granularity();
    const parts: ScTimeInputParts = {
      hour: this.twelveHours() ? value.hour % 12 || 12 : value.hour,
      minute: granularity === 'hour' ? undefined : value.minute,
      second: granularity === 'second' ? value.second : undefined,
    };
    if (this.twelveHours()) parts.dayPeriod = value.hour < 12 ? 'am' : 'pm';
    return parts;
  }

  private join(parts: ScTimeInputParts): Temporal.PlainTime {
    const hour = parts.hour ?? 0;
    return Temporal.PlainTime.from({
      hour: this.twelveHours()
        ? (hour % 12) + (parts.dayPeriod === 'pm' ? 12 : 0)
        : hour,
      minute: parts.minute ?? 0,
      second: parts.second ?? 0,
    });
  }
}
