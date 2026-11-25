import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { SC_SEGMENTED_INPUT, type ScDateTimePart } from './segmented-input';

/**
 * One part of a date, time or date-time input — its year, month, day, hour,
 * minute, second or AM/PM: an input (a spin button; the number pad on a
 * phone), named, ranged and described from its input, which keeps the state
 * and reads what is typed.
 *
 * The input's own part, not one to place: `scDateInput`, `scTimeInput` and
 * `scDateTimeInput` write one per part in their template, because the parts —
 * their order, the text between them, AM/PM or not — come from the locale,
 * which the consumer can't know ahead. So it can't be styled from the
 * consumer's markup either: the look of a part is the style's
 * (`segmentedInput.segment`).
 */
@Directive({
  selector: 'input[scDateTimeSegment]',
  exportAs: 'scDateTimeSegment',
  host: {
    type: 'text',
    role: 'spinbutton',
    size: '1',
    autocomplete: 'off',
    autocorrect: 'off',
    spellcheck: 'false',
    'data-slot': 'date-time-segment',
    '[attr.data-type]': 'type()',
    '[attr.data-empty]': 'empty() || null',
    '[attr.inputmode]': 'inputMode()',
    '[attr.placeholder]': 'placeholder()',
    '[value]': 'text()',
    '[disabled]': 'owner.isDisabled()',
    '[readOnly]': 'owner.isReadonly()',
    '[attr.aria-label]': 'name()',
    '[attr.aria-valuemin]': 'range()[0]',
    '[attr.aria-valuemax]': 'range()[1]',
    '[attr.aria-valuenow]': 'valueNow()',
    '[attr.aria-valuetext]': 'valueText()',
    '[attr.aria-invalid]': 'owner.showInvalid() || null',
    '[attr.aria-required]': 'owner.isRequired() || null',
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
export class ScDateTimeSegment {
  private readonly owner = inject(SC_SEGMENTED_INPUT);
  private readonly styles = injectStyle().segmentedInput;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The part it edits. */
  readonly type = input.required<ScDateTimePart>({
    alias: 'scDateTimeSegment',
  });

  /** What it shows: the part as the locale writes it, or nothing (its placeholder shows). */
  readonly text = computed(() => this.owner.ɵtext(this.type()));
  /** The empty mark: as wide as the part (a year has four). */
  readonly placeholder = computed(() =>
    this.type() === 'year' ? '––––' : '––',
  );
  private readonly inputMode = computed(() =>
    this.type() === 'dayPeriod' ? 'text' : 'numeric',
  );
  private readonly empty = computed(() => this.owner.ɵempty(this.type()));
  private readonly name = computed(() => this.owner.ɵname(this.type()));
  private readonly range = computed(() => this.owner.ɵrange(this.type()));
  private readonly valueNow = computed(() => this.owner.ɵvalueNow(this.type()));
  private readonly valueText = computed(() =>
    this.owner.ɵvalueText(this.type()),
  );
  private readonly describedBy = computed(() => this.owner.ɵdescribedBy());

  private readonly class = computed(() =>
    cn(
      // As wide as its text beside it (the input's sizer): no width of its own.
      'col-start-1 row-start-1 w-0 min-w-full border-0 bg-transparent px-0.5 py-0 text-center tabular-nums caret-transparent outline-none selection:bg-transparent',
      'placeholder:text-muted-foreground focus:bg-accent focus:text-accent-foreground focus:placeholder:text-accent-foreground',
      'aria-invalid:text-destructive disabled:cursor-not-allowed',
      this.styles.segment,
      this.classInput(),
    ),
  );

  private onFocus(): void {
    this.owner.ɵfocus();
  }

  private onBlur(): void {
    this.owner.ɵblur(this.type());
  }

  private onKeydown(event: KeyboardEvent): void {
    this.owner.ɵkeydown(event, this.type());
  }

  private onBeforeInput(event: InputEvent): void {
    this.owner.ɵbeforeInput(event, this.type());
  }

  private onInput(event: Event): void {
    this.owner.ɵinput(event, this.type());
  }

  private onPaste(event: ClipboardEvent): void {
    this.owner.ɵpaste(event);
  }
}
