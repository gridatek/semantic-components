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

/** A part of the date: its day, month or year. */
export type ScDateInputPart = 'day' | 'month' | 'year';

/** What a segment reads from its date input, and hands its events to. */
export interface ScDateInputHost {
  readonly isDisabled: Signal<boolean>;
  readonly readonly: Signal<boolean>;
  readonly required: Signal<boolean>;
  /** Not a day that can be picked, or invalid once left. */
  readonly showInvalid: Signal<boolean>;
  readonly ɵdescribedBy: Signal<string | null>;
  ɵempty(type: ScDateInputPart): boolean;
  /** The part as the locale writes it — empty when it is. */
  ɵtext(type: ScDateInputPart): string;
  /** Its text for a screen reader: the month by its name. */
  ɵvalueText(type: ScDateInputPart): string | null;
  /** Its name, in the locale's words. */
  ɵname(type: ScDateInputPart): string;
  ɵrange(type: ScDateInputPart): [number, number];
  ɵvalueNow(type: ScDateInputPart): number | null;
  ɵfocus(): void;
  ɵblur(type: ScDateInputPart): void;
  ɵkeydown(event: KeyboardEvent, type: ScDateInputPart): void;
  ɵbeforeInput(event: InputEvent, type: ScDateInputPart): void;
  ɵinput(event: Event, type: ScDateInputPart): void;
  ɵpaste(event: ClipboardEvent): void;
}

/** The date input a segment belongs to (`ScDateInput` provides itself). */
export const SC_DATE_INPUT = new InjectionToken<ScDateInputHost>(
  'SC_DATE_INPUT',
);

/**
 * One part of a date input — its day, month or year: an input (a spin
 * button; the number pad on a phone), named, ranged and described from its
 * date input, which keeps the state and reads what is typed.
 *
 * The date input's own part, not one to place: `div[scDateInput]` writes
 * one per part in its template, because the parts — their order and the text
 * between them — come from the locale, which the consumer can't know ahead.
 * So it can't be styled from the consumer's markup either: the look of a part
 * is the style's (`segmentedInput.segment`).
 */
@Directive({
  selector: 'input[scDateInputSegment]',
  exportAs: 'scDateInputSegment',
  host: {
    type: 'text',
    role: 'spinbutton',
    size: '1',
    inputmode: 'numeric',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    'data-slot': 'date-input-segment',
    '[attr.data-type]': 'type()',
    '[attr.data-empty]': 'empty() || null',
    '[attr.placeholder]': 'placeholder()',
    '[value]': 'text()',
    '[disabled]': 'dateInput.isDisabled()',
    '[readOnly]': 'dateInput.readonly()',
    '[attr.aria-label]': 'name()',
    '[attr.aria-valuemin]': 'range()[0]',
    '[attr.aria-valuemax]': 'range()[1]',
    '[attr.aria-valuenow]': 'valueNow()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-invalid]': 'dateInput.showInvalid() || null',
    '[attr.aria-required]': 'dateInput.required() || null',
    '[attr.aria-describedby]': 'describedBy()',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeydown($event)',
    '(beforeinput)': 'onBeforeInput($event)',
    '(input)': 'onInput($event)',
    '(paste)': 'onPaste($event)',
  },
})
export class ScDateInputSegment {
  private readonly dateInput = inject(SC_DATE_INPUT);
  private readonly styles = injectStyle().segmentedInput;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The part it edits. */
  readonly type = input.required<ScDateInputPart>({
    alias: 'scDateInputSegment',
  });

  /** What it shows: the part as the locale writes it, or nothing (its placeholder shows). */
  readonly text = computed(() => this.dateInput.ɵtext(this.type()));
  /** The empty mark: as wide as the part (a year has four). */
  readonly placeholder = computed(() =>
    this.type() === 'year' ? '––––' : '––',
  );
  private readonly empty = computed(() => this.dateInput.ɵempty(this.type()));
  private readonly name = computed(() => this.dateInput.ɵname(this.type()));
  private readonly range = computed(() => this.dateInput.ɵrange(this.type()));
  private readonly valueNow = computed(() =>
    this.dateInput.ɵvalueNow(this.type()),
  );
  private readonly valueText = computed(() =>
    this.dateInput.ɵvalueText(this.type()),
  );
  private readonly describedBy = computed(() => this.dateInput.ɵdescribedBy());

  private readonly class = computed(() =>
    cn(
      // As wide as its text beside it (the date input's sizer): no width of its own.
      'col-start-1 row-start-1 w-0 min-w-full border-0 bg-transparent px-0.5 py-0 text-center tabular-nums caret-transparent outline-none selection:bg-transparent',
      'placeholder:text-muted-foreground focus:bg-accent focus:text-accent-foreground focus:placeholder:text-accent-foreground',
      'aria-invalid:text-destructive disabled:cursor-not-allowed',
      this.styles.segment,
      this.classInput(),
    ),
  );

  private onFocus(): void {
    this.dateInput.ɵfocus();
  }

  private onBlur(): void {
    this.dateInput.ɵblur(this.type());
  }

  private onKeydown(event: KeyboardEvent): void {
    this.dateInput.ɵkeydown(event, this.type());
  }

  private onBeforeInput(event: InputEvent): void {
    this.dateInput.ɵbeforeInput(event, this.type());
  }

  private onInput(event: Event): void {
    this.dateInput.ɵinput(event, this.type());
  }

  private onPaste(event: ClipboardEvent): void {
    this.dateInput.ɵpaste(event);
  }
}
