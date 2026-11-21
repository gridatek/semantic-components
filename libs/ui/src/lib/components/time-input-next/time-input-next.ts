import { NgTemplateOutlet } from '@angular/common';
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
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_FIELD } from '../field';

/** A part of the time: its hour, minute, second, or AM/PM. */
export type ScTimeInputNextPart = 'hour' | 'minute' | 'second' | 'dayPeriod';

/** A piece of the time as the locale writes it: a part to edit, or the text between. */
export interface ScTimeInputNextSegment {
  readonly type: ScTimeInputNextPart | 'literal';
  /** A literal's text (`:`, ` h `…). */
  readonly text: string;
}

/** What the template lays out: the clock's digits as one left-to-right run, AM/PM and text around it. */
type ScTimeInputNextItem =
  | { readonly kind: 'clock'; readonly segments: ScTimeInputNextSegment[] }
  | { readonly kind: 'segment'; readonly segment: ScTimeInputNextSegment };

type ScTimeInputNextParts = Partial<
  Record<'hour' | 'minute' | 'second', number>
> & { dayPeriod?: 'am' | 'pm' };

/** An empty part. */
const EMPTY = '––';
/** Page Up / Page Down: a bigger step. */
const BIG_STEP = { hour: 2, minute: 15, second: 15 } as const;
const NONE = Symbol('none');

/** A digit, typed on any keyboard: `7`, or the Arabic `٧`, the Persian `۷`. */
function digitOf(char: string): number | undefined {
  if (/^[0-9]$/.test(char)) return Number(char);
  const code = char.charCodeAt(0);
  if (code >= 0x660 && code <= 0x669) return code - 0x660;
  if (code >= 0x6f0 && code <= 0x6f9) return code - 0x6f0;
  return undefined;
}

/**
 * A time, typed part by part — hour, minute (second), AM/PM — in the order,
 * the separators and the clock of its locale. Each part is an input (a
 * spin button, the number pad on a phone): digits fill it and move on,
 * the arrows step it, Backspace takes a digit back. A `[formField]`:
 * `Temporal.PlainTime`, or `null` until every part is filled. Named by its
 * `scField`'s label.
 */
@Component({
  selector: 'div[scTimeInputNext]',
  exportAs: 'scTimeInputNext',
  template: `
    <ng-template #part let-segment>
      @let type = partOf(segment);
      <span class="inline-grid">
        <!-- Its width: what it shows (or the empty mark), as text would be. -->
        <span
          aria-hidden="true"
          class="invisible col-start-1 row-start-1 px-0.5 whitespace-pre tabular-nums"
          >{{ text(type) || '––' }}</span
        >
        <input
          type="text"
          role="spinbutton"
          size="1"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          placeholder="––"
          data-slot="time-input-next-segment"
          [attr.data-type]="type"
          [attr.data-empty]="parts()[type] === undefined || null"
          [attr.inputmode]="type === 'dayPeriod' ? 'text' : 'numeric'"
          [value]="text(type)"
          [disabled]="disabled()"
          [readOnly]="readonly()"
          [attr.aria-label]="names()[type]"
          [attr.aria-valuemin]="range(type)[0]"
          [attr.aria-valuemax]="range(type)[1]"
          [attr.aria-valuenow]="valueNow(type)"
          [attr.aria-valuetext]="text(type) || null"
          [attr.aria-invalid]="showInvalid() || null"
          [attr.aria-required]="required() || null"
          [attr.aria-describedby]="describedBy()"
          [class]="segmentClass()"
          (focus)="typed = ''"
          (keydown)="onKeydown($event, type)"
          (beforeinput)="onBeforeInput($event, type)"
          (input)="onInput($event, type)"
          (paste)="onPaste($event)"
        />
      </span>
    </ng-template>

    @for (item of layout(); track $index) {
      @if (item.kind === 'clock') {
        <!-- Hours, minutes, seconds: left to right in any page. -->
        <span dir="ltr" class="inline-flex items-center">
          @for (segment of item.segments; track $index) {
            @if (segment.type === 'literal') {
              <span aria-hidden="true" class="whitespace-pre">{{
                segment.text
              }}</span>
            } @else {
              <ng-container
                [ngTemplateOutlet]="part"
                [ngTemplateOutletContext]="{ $implicit: segment }"
              />
            }
          }
        </span>
      } @else if (item.segment.type === 'literal') {
        <span aria-hidden="true" class="whitespace-pre">{{
          item.segment.text
        }}</span>
      } @else {
        <ng-container
          [ngTemplateOutlet]="part"
          [ngTemplateOutletContext]="{ $implicit: item.segment }"
        />
      }
    }
  `,
  imports: [NgTemplateOutlet],
  host: {
    'data-slot': 'time-input-next',
    role: 'group',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-readonly]': 'readonly() || null',
    '[attr.data-invalid]': 'showInvalid() || null',
    '[attr.data-empty]': 'value() === null || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimeInputNext implements FormValueControl<Temporal.PlainTime | null> {
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().timeInput;
  /** The locale: `LOCALE_ID` — the app's, or one provided for this section. */
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });
  readonly labelledByInput = input('', { alias: 'aria-labelledby' });

  /** The time: `[formField]` or `[(value)]`; `null` until every part is filled. */
  readonly value = model<Temporal.PlainTime | null>(null);
  /** A 12- or 24-hour clock; the locale's by default. */
  readonly hourCycle = input<12 | 24 | undefined>(undefined);
  /** The smallest part it shows. */
  readonly granularity = input<'hour' | 'minute' | 'second'>('minute');
  /** The hour always in two digits (`09`); the locale's way by default. */
  readonly leadingZeros = input(false, { transform: booleanAttribute });
  /** The earliest time; an earlier one is marked invalid. */
  readonly minTime = input<Temporal.PlainTime | undefined>(undefined);
  /** The latest time; a later one is marked invalid. */
  readonly maxTime = input<Temporal.PlainTime | undefined>(undefined);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly id = computed(
    () => this.idInput() || this.field?.id() || null,
  );
  private readonly labelledBy = computed(
    () =>
      this.labelledByInput() ||
      (this.field && !this.ariaLabel ? `${this.field.id()}-label` : null),
  );
  private readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  /** 12 hours (with AM/PM), or 24. */
  readonly twelveHours = computed(() => {
    const cycle = this.hourCycle();
    if (cycle) return cycle === 12;
    const locale = new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
    }).resolvedOptions().hourCycle;
    return locale === 'h11' || locale === 'h12';
  });

  private readonly formatter = computed(() => {
    const granularity = this.granularity();
    return new Intl.DateTimeFormat(this.locale, {
      hour: this.leadingZeros() ? '2-digit' : 'numeric',
      minute: granularity === 'hour' ? undefined : '2-digit',
      second: granularity === 'second' ? '2-digit' : undefined,
      hourCycle: this.twelveHours() ? 'h12' : 'h23',
    });
  });

  /** The parts in the locale's order, with the text between them. */
  readonly segments = computed<ScTimeInputNextSegment[]>(() =>
    this.formatter()
      .formatToParts(Temporal.PlainTime.from('11:22:33'))
      .filter((part) =>
        ['literal', 'hour', 'minute', 'second', 'dayPeriod'].includes(
          part.type,
        ),
      )
      .map((part) => ({
        type: part.type as ScTimeInputNextSegment['type'],
        text: part.type === 'literal' ? part.value : '',
      })),
  );

  /** The segments, the clock's run (hour to its last part) kept together. */
  private readonly layout = computed<ScTimeInputNextItem[]>(() => {
    const segments = this.segments();
    const clock = (type: ScTimeInputNextSegment['type']) =>
      type === 'hour' || type === 'minute' || type === 'second';
    const first = segments.findIndex((s) => clock(s.type));
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
    return {
      hour: names.of('hour'),
      minute: names.of('minute'),
      second: names.of('second'),
      dayPeriod: names.of('dayPeriod'),
    } as Record<ScTimeInputNextPart, string>;
  });

  /** The parts typed so far: the value's — kept while one is still empty. */
  private written: Temporal.PlainTime | null | typeof NONE = NONE;
  readonly parts = linkedSignal({
    source: () => ({
      value: this.value(),
      twelve: this.twelveHours(),
      granularity: this.granularity(),
    }),
    computation: (source, previous): ScTimeInputNextParts => {
      const own =
        !!previous &&
        source.value === this.written &&
        previous.source.twelve === source.twelve &&
        previous.source.granularity === source.granularity;
      this.written = NONE;
      return own ? previous.value : this.split(source.value);
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

  private readonly showInvalid = computed(
    () => this.outOfRange() || (this.invalid() && this.touched()),
  );

  /** Digits typed into the focused part. */
  private typed = '';

  private readonly segmentClass = computed(() =>
    cn(
      'col-start-1 row-start-1 w-0 min-w-full border-0 bg-transparent px-0.5 py-0 text-center tabular-nums caret-transparent outline-none selection:bg-transparent',
      'placeholder:text-muted-foreground focus:bg-accent focus:text-accent-foreground focus:placeholder:text-accent-foreground',
      'aria-invalid:text-destructive disabled:cursor-not-allowed',
      this.styles.segment,
    ),
  );

  private readonly class = computed(() =>
    cn(
      this.styles.root,
      // In an input group: the group draws the box.
      'in-data-[slot=input-group]:h-full in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:has-[:focus-visible]:ring-0 in-data-[slot=input-group]:data-invalid:ring-0 dark:in-data-[slot=input-group]:bg-transparent',
      this.classInput(),
    ),
  );

  /** Empties every part. */
  clear(): void {
    this.typed = '';
    this.parts.set({});
    if (this.value() !== null) {
      this.written = null;
      this.value.set(null);
    }
  }

  /** Focus on a part — the first one by default (Signal Forms calls it, for an error). */
  focus(options?: FocusOptions, part?: ScTimeInputNextPart): void {
    this.inputs()
      .find((input) => !part || input.dataset['type'] === part)
      ?.focus(options);
  }

  /** The part a segment edits (the template's context is untyped). */
  private partOf(segment: ScTimeInputNextSegment): ScTimeInputNextPart {
    return segment.type as ScTimeInputNextPart;
  }

  /** A part's lowest and highest value (AM/PM: 0 and 1). */
  private range(type: ScTimeInputNextPart): [number, number] {
    if (type === 'hour') return this.twelveHours() ? [1, 12] : [0, 23];
    if (type === 'dayPeriod') return [0, 1];
    return [0, 59];
  }

  private valueNow(type: ScTimeInputNextPart): number | null {
    const part = this.parts()[type];
    if (part === undefined) return null;
    if (type === 'dayPeriod') return part === 'am' ? 0 : 1;
    return part as number;
  }

  /** The locale's zero digit (`0`, `٠`…): a two-digit hour's padding. */
  private readonly zero = computed(
    () =>
      this.formatter()
        .formatToParts(Temporal.PlainTime.from('10:00'))
        .find((part) => part.type === 'minute' || part.type === 'hour')
        ?.value.slice(-1) ?? '0',
  );

  /** A part as the locale writes it — empty when it is. */
  private text(type: ScTimeInputNextPart): string {
    const text = this.localeText(type);
    // A 12-hour clock ignores 2-digit for the hour (ICU): padded here.
    return type === 'hour' && this.leadingZeros() && [...text].length === 1
      ? this.zero() + text
      : text;
  }

  private localeText(type: ScTimeInputNextPart): string {
    const parts = this.parts();
    if (parts[type] === undefined) return '';
    return (
      this.formatter()
        .formatToParts(
          this.join({
            hour: parts.hour ?? (this.twelveHours() ? 12 : 0),
            minute: parts.minute ?? 0,
            second: parts.second ?? 0,
            dayPeriod: parts.dayPeriod ?? 'am',
          }),
        )
        .find((part) => part.type === type)?.value ?? ''
    );
  }

  private onKeydown(event: KeyboardEvent, type: ScTimeInputNextPart): void {
    const input = event.target as HTMLInputElement;
    const editable = !this.readonly() && !this.disabled();
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
          const [min, max] = this.range(type);
          const home = event.key === 'Home';
          this.set(
            type,
            type === 'dayPeriod' ? (home ? 'am' : 'pm') : home ? min : max,
          );
        }
        break;
      case 'Backspace':
        if (editable) this.backspace(type, input);
        break;
      case 'Delete':
        if (editable) {
          this.typed = '';
          this.set(type, undefined);
        }
        break;
      default:
        // Digits, letters and separators come as input (any keyboard, a
        // phone's too): onBeforeInput.
        return;
    }
    event.preventDefault();
  }

  /** What is typed, on any keyboard: the part takes it, the input's own text stays the part's. */
  private onBeforeInput(event: InputEvent, type: ScTimeInputNextPart): void {
    if (!event.cancelable) return;
    event.preventDefault();
    if (this.readonly() || this.disabled()) return;
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
      this.set(type, undefined);
    }
  }

  /** Input that couldn't be stopped (a phone's composition): taken, then the part's text back. */
  private onInput(event: Event, type: ScTimeInputNextPart): void {
    const input = event.target as HTMLInputElement;
    const data = (event as InputEvent).data;
    if (data && !this.readonly() && !this.disabled()) {
      const char = [...data].pop() ?? '';
      if (char) this.type(char, type, input);
    }
    input.value = this.text(type);
  }

  /** A whole time pasted — `14:30`, `2:30 PM` — fills every part. */
  private onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.readonly() || this.disabled()) return;
    this.paste(event.clipboardData?.getData('text') ?? '');
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.touch.emit();
  }

  /** A key typed into a part: a digit, AM/PM's letter, or a separator. */
  private type(char: string, type: ScTimeInputNextPart, input: HTMLElement) {
    if (type === 'dayPeriod') {
      const period = this.periodOf(char);
      if (period) {
        this.set(type, period);
        this.move(input, 1);
      }
      return;
    }
    const digit = digitOf(char);
    if (digit === undefined) {
      // A separator (`:`, `.`, a space): on to the next part.
      if (!/[\p{L}\p{N}]/u.test(char) && this.parts()[type] !== undefined) {
        this.typed = '';
        this.move(input, 1);
      }
      return;
    }
    const [min, max] = this.range(type);
    let typed = this.typed + digit;
    if (Number(typed) > max) typed = String(digit);
    this.typed = typed;
    const number = Number(typed);
    if (number >= min) this.set(type, number);
    // Whole once no digit can follow (`9`, `30`).
    if (typed.length >= 2 || number * 10 > max) {
      this.typed = '';
      this.move(input, 1);
    }
  }

  /** Backspace: a digit back, then the part emptied, then the part before. */
  private backspace(type: ScTimeInputNextPart, input: HTMLElement): void {
    const part = this.parts()[type];
    if (part === undefined) {
      this.typed = '';
      this.move(input, -1);
    } else if (typeof part === 'number' && part >= 10) {
      const kept = Math.floor(part / 10);
      this.typed = String(kept);
      this.set(type, kept >= this.range(type)[0] ? kept : undefined);
    } else {
      this.typed = '';
      this.set(type, undefined);
    }
  }

  /** The arrows: one up or down, wrapping — Page Up / Down a bigger step, on its multiples. An empty part starts at now. */
  private step(type: ScTimeInputNextPart, by: 1 | -1, big: boolean): void {
    const part = this.parts()[type];
    if (part === undefined) {
      this.set(type, this.split(Temporal.Now.plainTimeISO(), true)[type]);
      return;
    }
    if (type === 'dayPeriod') {
      this.set(type, part === 'am' ? 'pm' : 'am');
      return;
    }
    const current = part as number;
    const [min, max] = this.range(type);
    const size = big ? BIG_STEP[type] : 1;
    const next =
      by > 0
        ? Math.floor(current / size) * size + size
        : Math.ceil(current / size) * size - size;
    const span = max - min + 1;
    this.set(type, ((((next - min) % span) + span) % span) + min);
  }

  /** A whole time, from text: ISO (`14:30`), or the clock's (`2:30 PM`). */
  private paste(text: string): void {
    const normal = [...text]
      .map((char) => digitOf(char) ?? char)
      .join('')
      .trim();
    const match =
      /^(\d{1,2})(?:\s*[:.h]\s*(\d{1,2}))?(?:\s*[:.]\s*(\d{1,2}))?\s*(?:([ap])\.?\s*m?\.?)?$/i.exec(
        normal,
      );
    if (!match) return;
    let hour = Number(match[1]);
    const period = match[4]?.toLowerCase();
    if (period) {
      if (hour < 1 || hour > 12) return;
      hour = (hour % 12) + (period === 'p' ? 12 : 0);
    }
    const granularity = this.granularity();
    try {
      const time = Temporal.PlainTime.from(
        {
          hour,
          minute: granularity === 'hour' ? 0 : Number(match[2] ?? 0),
          second: granularity === 'second' ? Number(match[3] ?? 0) : 0,
        },
        { overflow: 'reject' },
      );
      this.typed = '';
      this.value.set(time);
    } catch {
      // Not a time: nothing changes.
    }
  }

  /** `a` / `p` — or the first letter of the locale's AM / PM. */
  private periodOf(char: string): 'am' | 'pm' | undefined {
    const letter = char.toLowerCase();
    const first = (hour: number) =>
      this.formatter()
        .formatToParts(Temporal.PlainTime.from({ hour }))
        .find((part) => part.type === 'dayPeriod')
        ?.value[0]?.toLowerCase();
    if (letter === 'a' || letter === first(9)) return 'am';
    if (letter === 'p' || letter === first(21)) return 'pm';
    return undefined;
  }

  private inputs(): HTMLInputElement[] {
    return [
      ...this.host.querySelectorAll<HTMLInputElement>(
        '[data-slot="time-input-next-segment"]',
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

  /** A part set — the value once every part is there, else none. */
  private set(
    type: ScTimeInputNextPart,
    part: number | 'am' | 'pm' | undefined,
  ): void {
    const parts = { ...this.parts(), [type]: part };
    this.parts.set(parts);
    const granularity = this.granularity();
    const whole =
      parts.hour !== undefined &&
      (granularity === 'hour' || parts.minute !== undefined) &&
      (granularity !== 'second' || parts.second !== undefined) &&
      (!this.twelveHours() || parts.dayPeriod !== undefined);
    const value = whole ? this.join(parts) : null;
    const current = this.value();
    if (value === current || (value && current && value.equals(current)))
      return;
    this.written = value;
    this.value.set(value);
  }

  /** A time in parts, as the clock shows them; `all` keeps the parts not shown too. */
  private split(
    value: Temporal.PlainTime | null,
    all = false,
  ): ScTimeInputNextParts {
    if (!value) return {};
    const granularity = this.granularity();
    const twelve = this.twelveHours();
    return {
      hour: twelve ? value.hour % 12 || 12 : value.hour,
      minute: all || granularity !== 'hour' ? value.minute : undefined,
      second: all || granularity === 'second' ? value.second : undefined,
      dayPeriod: twelve ? (value.hour < 12 ? 'am' : 'pm') : undefined,
    };
  }

  private join(parts: ScTimeInputNextParts): Temporal.PlainTime {
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
