import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  isDevMode,
  model,
  output,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { bindInput } from '../../utils';
import { ScField } from '../field';
import { ScOtpFieldInput } from './otp-field-input';

/** Which characters the code accepts. */
export type ScOtpFieldValidationType =
  'numeric' | 'alpha' | 'alphanumeric' | 'none';

const digit = /\p{Nd}/u;

/**
 * A digit of any script as its ASCII digit ('٣', '३', '３' → '3'): its place
 * in its run of ten. '' for anything else.
 */
function asciiDigit(char: string): string {
  if (!digit.test(char)) return '';
  const code = char.codePointAt(0) ?? 0;
  let zero = code;
  while (digit.test(String.fromCodePoint(zero - 1))) zero--;
  return String((code - zero) % 10);
}

/** A character as the code keeps it: '' when not accepted. */
const accepted: Record<ScOtpFieldValidationType, (char: string) => string> = {
  numeric: asciiDigit,
  alpha: (char) => (/\p{L}/u.test(char) ? char : ''),
  alphanumeric: (char) => (/\p{L}/u.test(char) ? char : asciiDigit(char)),
  none: (char) => (/\S/u.test(char) ? char : ''),
};

/**
 * A one-time password field, as Base UI's OTP Field: one character per
 * `scOtpFieldInput` (the code is as long as there are inputs), entered left
 * to right; a pasted or autofilled code is spread over them. A Signal Forms
 * control: bind `[formField]` here — the value, its length (`minLength` in
 * the schema), its state and its errors are the form's. It is a `scField`
 * too (a label, description and errors go inside it), whose `id`,
 * `orientation` and `class` it takes; the inputs sit in a `scOtpFieldGroup`.
 */
@Directive({
  selector: 'div[scOtpField]',
  hostDirectives: [
    { directive: ScField, inputs: ['id', 'orientation', 'class'] },
  ],
  host: {
    'data-slot': 'otp-field',
    '(paste)': 'onPaste($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScOtpField implements FormValueControl<string> {
  private readonly field = inject(ScField);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** Which characters are accepted (anything else is dropped); `numeric` brings up a numeric keypad. */
  readonly validationType = input<ScOtpFieldValidationType>('numeric');

  // Set by [formField] — the field's value, state and length come from the form.
  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** The schema's `minLength` / `maxLength`: checked against the number of inputs. */
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  /** Focus left the field — not just one input for the next (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly inputs = contentChildren(ScOtpFieldInput, {
    descendants: true,
  });

  /** The code's length: the number of inputs. */
  readonly length = computed(() => this.inputs().length);
  /** The first input with no character (-1 when every input has one). */
  readonly firstEmptyIndex = computed(() =>
    this.value().length >= this.length() ? -1 : this.value().length,
  );
  /** Invalid once touched: the inputs' `aria-invalid`, the field's `data-invalid`. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  readonly inputMode = computed(() =>
    this.validationType() === 'numeric' ? 'numeric' : 'text',
  );

  constructor() {
    // The field's state follows the code's (`data-disabled`, `data-invalid`).
    bindInput(this.field.disabledInput, this.disabled);
    bindInput(this.field.invalidInput, this.showInvalid);

    // The schema's length and the inputs must agree: one says what's valid,
    // the other what can be entered.
    if (isDevMode()) {
      effect(() => {
        const inputs = this.length();
        const lengths = [this.minLength(), this.maxLength()].filter(
          (length) => length !== undefined,
        );
        if (inputs && lengths.some((length) => length !== inputs)) {
          console.warn(
            `scOtpField: ${inputs} inputs, but the schema's length is ${lengths.join(' to ')}. Make them agree: the code can only be as long as there are inputs.`,
          );
        }
      });
    }
  }

  /** An input's position in the code. */
  indexOf(input: ScOtpFieldInput): number {
    return this.inputs().indexOf(input);
  }

  charAt(index: number): string {
    return this.value()[index] ?? '';
  }

  /**
   * The accepted characters of a text, digits as ASCII digits (whitespace and
   * anything else dropped).
   */
  accept(text: string): string {
    const keep = accepted[this.validationType()];
    return [...text].map(keep).join('');
  }

  /**
   * Writes text from an input on — one character overwrites it, several
   * (pasted, autofilled) fill the next ones too — then focuses the input
   * after the last one written.
   */
  write(index: number, text: string): void {
    const chars = this.accept(text);
    if (!chars || this.disabled()) return;
    const value = this.value();
    const next = (
      value.slice(0, index) +
      chars +
      value.slice(index + chars.length)
    ).slice(0, this.length());
    this.value.set(next);
    this.focusInput(Math.min(index + chars.length, this.length() - 1));
  }

  /** Clears an input's character (the ones after it move back one). */
  clear(index: number): void {
    if (this.disabled()) return;
    const value = this.value();
    this.value.set(value.slice(0, index) + value.slice(index + 1));
  }

  focusInput(index: number): void {
    this.inputs()[index]?.focus();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.element.contains(next)) this.touch.emit();
  }

  /** A pasted code replaces the whole value. */
  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.disabled()) return;
    const chars = this.accept(event.clipboardData?.getData('text') ?? '');
    if (!chars) return;
    this.value.set(chars.slice(0, this.length()));
    this.focusInput(Math.min(chars.length, this.length() - 1));
  }
}
