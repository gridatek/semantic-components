import {
  Directive,
  InjectionToken,
  type Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A part of the time: its hour, minute, second, or AM/PM. */
export type ScTimeInputPart = 'hour' | 'minute' | 'second' | 'dayPeriod';

/** What a segment reads from its time input, and hands its events to. */
export interface ScTimeInputHost {
  readonly disabled: Signal<boolean>;
  readonly readonly: Signal<boolean>;
  readonly required: Signal<boolean>;
  /** Out of range, or invalid once left. */
  readonly showInvalid: Signal<boolean>;
  readonly ɵdescribedBy: Signal<string | null>;
  ɵempty(type: ScTimeInputPart): boolean;
  /** The part as the locale writes it — empty when it is. */
  ɵtext(type: ScTimeInputPart): string;
  /** Its name, in the locale's words. */
  ɵname(type: ScTimeInputPart): string;
  ɵrange(type: ScTimeInputPart): [number, number];
  ɵvalueNow(type: ScTimeInputPart): number | null;
  ɵfocus(): void;
  ɵkeydown(event: KeyboardEvent, type: ScTimeInputPart): void;
  ɵbeforeInput(event: InputEvent, type: ScTimeInputPart): void;
  ɵinput(event: Event, type: ScTimeInputPart): void;
  ɵpaste(event: ClipboardEvent): void;
}

/** The time input a segment belongs to (`ScTimeInput` provides itself). */
export const SC_TIME_INPUT = new InjectionToken<ScTimeInputHost>(
  'SC_TIME_INPUT',
);

/**
 * One part of a time input — its hour, minute, second or AM/PM: an input
 * (a spin button; the number pad on a phone), named, ranged and described
 * from its time input, which keeps the state and reads what is typed.
 *
 * The time input's own part, not one to place: `div[scTimeInput]` writes one
 * per part in its template, because the parts — their order, the text between
 * them, AM/PM or not — come from the locale, which the consumer can't know
 * ahead. So it can't be styled from the consumer's markup either: the
 * look of a part is the style's (`segmentedInput.segment`).
 */
@Directive({
  selector: 'input[scTimeInputSegment]',
  exportAs: 'scTimeInputSegment',
  host: {
    type: 'text',
    role: 'spinbutton',
    size: '1',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    placeholder: '––',
    'data-slot': 'time-input-segment',
    '[attr.data-type]': 'type()',
    '[attr.data-empty]': 'empty() || null',
    '[attr.inputmode]': 'inputMode()',
    '[value]': 'text()',
    '[disabled]': 'timeInput.disabled()',
    '[readOnly]': 'timeInput.readonly()',
    '[attr.aria-label]': 'name()',
    '[attr.aria-valuemin]': 'range()[0]',
    '[attr.aria-valuemax]': 'range()[1]',
    '[attr.aria-valuenow]': 'valueNow()',
    '[attr.aria-valuetext]': 'text() || null',
    '[attr.aria-invalid]': 'timeInput.showInvalid() || null',
    '[attr.aria-required]': 'timeInput.required() || null',
    '[attr.aria-describedby]': 'describedBy()',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(keydown)': 'onKeydown($event)',
    '(beforeinput)': 'onBeforeInput($event)',
    '(input)': 'onInput($event)',
    '(paste)': 'onPaste($event)',
  },
})
export class ScTimeInputSegment {
  private readonly timeInput = inject(SC_TIME_INPUT);
  private readonly styles = injectStyle().segmentedInput;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The part it edits. */
  readonly type = input.required<ScTimeInputPart>({
    alias: 'scTimeInputSegment',
  });

  /** What it shows: the part as the locale writes it, or nothing (its placeholder shows). */
  readonly text = computed(() => this.timeInput.ɵtext(this.type()));
  private readonly empty = computed(() => this.timeInput.ɵempty(this.type()));
  private readonly name = computed(() => this.timeInput.ɵname(this.type()));
  private readonly range = computed(() => this.timeInput.ɵrange(this.type()));
  private readonly valueNow = computed(() =>
    this.timeInput.ɵvalueNow(this.type()),
  );
  private readonly describedBy = computed(() => this.timeInput.ɵdescribedBy());
  private readonly inputMode = computed(() =>
    this.type() === 'dayPeriod' ? 'text' : 'numeric',
  );

  private readonly class = computed(() =>
    cn(
      // As wide as its text beside it (the time input's sizer): no width of its own.
      'col-start-1 row-start-1 w-0 min-w-full border-0 bg-transparent px-0.5 py-0 text-center tabular-nums caret-transparent outline-none selection:bg-transparent',
      'placeholder:text-muted-foreground focus:bg-accent focus:text-accent-foreground focus:placeholder:text-accent-foreground',
      'aria-invalid:text-destructive disabled:cursor-not-allowed',
      this.styles.segment,
      this.classInput(),
    ),
  );

  private onFocus(): void {
    this.timeInput.ɵfocus();
  }

  private onKeydown(event: KeyboardEvent): void {
    this.timeInput.ɵkeydown(event, this.type());
  }

  private onBeforeInput(event: InputEvent): void {
    this.timeInput.ɵbeforeInput(event, this.type());
  }

  private onInput(event: Event): void {
    this.timeInput.ɵinput(event, this.type());
  }

  private onPaste(event: ClipboardEvent): void {
    this.timeInput.ɵpaste(event);
  }
}
