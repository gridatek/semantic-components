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
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from 'cn';
import { SC_FIELD } from '../field';
import { ScOtpInputSlot } from './otp-input-slot';

/** Which characters the code accepts. */
export type ScOtpInputValidationType =
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
const accepted: Record<ScOtpInputValidationType, (char: string) => string> = {
  numeric: asciiDigit,
  alpha: (char) => (/\p{L}/u.test(char) ? char : ''),
  alphanumeric: (char) => (/\p{L}/u.test(char) ? char : asciiDigit(char)),
  none: (char) => (/\S/u.test(char) ? char : ''),
};

/**
 * A one-time password input, as Base UI's OTP Field: one character per
 * `scOtpInputSlot` (the code is as long as there are inputs), entered left
 * to right; a pasted or autofilled code is spread over them. A Signal Forms
 * control: bind `[formField]` here — the value, its length (`minLength` in
 * the schema), its state and its errors are the form's. It is the row of
 * chunks (`scOtpInputGroup`) and separators, as shadcn's InputOTP; its
 * label, description and errors go round it, in a `scField` (whose id the
 * first input takes).
 */
@Directive({
  selector: 'div[scOtpInput]',
  exportAs: 'scOtpInput',
  host: {
    '[class]': 'class()',
    'data-slot': 'otp-input',
    role: 'group',
    // Named by the label of the field it is in (`<field id>-label`).
    '[attr.aria-labelledby]': 'field ? field.id() + "-label" : null',
    '[attr.data-complete]': 'complete() ? "" : null',
    '[attr.data-filled]': 'value() ? "" : null',
    '[attr.data-focused]': 'focused() ? "" : null',
    '[attr.data-readonly]': 'readOnly() ? "" : null',
    '(paste)': 'onPaste($event)',
    '(focusin)': 'focused.set(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScOtpInput implements FormValueControl<string> {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The field it is in: its label names the group. */
  private readonly field = inject(SC_FIELD, { optional: true });

  /** Which characters are accepted (anything else is dropped); `numeric` brings up a numeric keypad. */
  readonly validationType = input<ScOtpInputValidationType>('numeric');
  /**
   * Runs on accepted text, before it is kept (uppercase, say); its result is
   * filtered by `validationType` again. Base UI's `normalizeValue`.
   */
  readonly normalizeValue = input<((value: string) => string) | undefined>(
    undefined,
  );
  /** The characters hidden as they are typed: the inputs become password inputs. */
  readonly mask = input(false, { transform: booleanAttribute });
  /** Shown, not changed. */
  readonly readOnly = input(false, { transform: booleanAttribute });

  // Set by [formField] — the field's value, state and length come from the form.
  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /**
   * Each input's name, in your words, written once: `{index}` its place
   * (from 1), `{length}` how many — "Character {index} of {length}". An
   * input's own `aria-label` wins (an exception). No default: you write it.
   */
  readonly slotLabel = input('');
  /** The schema's `minLength` / `maxLength`: checked against the number of inputs. */
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);

  /** Focus left the field — not just one input for the next (Signal Forms marks it touched). */
  readonly touch = output<void>();

  private readonly inputs = contentChildren(ScOtpInputSlot, {
    descendants: true,
  });

  /** The code's length: the number of inputs. */
  readonly length = computed(() => this.inputs().length);
  /** The first input with no character (-1 when every input has one). */
  readonly firstEmptyIndex = computed(() =>
    this.value().length >= this.length() ? -1 : this.value().length,
  );
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn(
      'flex w-fit items-center has-disabled:opacity-50',
      // A separator between the chunks (your scSeparator): its content (your
      // icon), or — empty — a short dash.
      '*:data-[slot=separator]:mx-[3px] *:data-[slot=separator]:empty:w-2.5 *:data-[slot=separator]:empty:bg-foreground',
      this.classInput(),
    ),
  );

  /** Every input has its character. */
  readonly complete = computed(
    () => this.length() > 0 && this.value().length === this.length(),
  );
  /** Focus is in one of the inputs. */
  private readonly focused = signal(false);
  /** Can't be changed: disabled, or read-only. */
  private readonly locked = computed(() => this.disabled() || this.readOnly());

  /** Invalid once touched: the inputs' `aria-invalid`, the field's `data-invalid`. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  readonly inputMode = computed(() =>
    this.validationType() === 'numeric' ? 'numeric' : 'text',
  );

  constructor() {
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
            `scOtpInput: ${inputs} inputs, but the schema's length is ${lengths.join(' to ')}. Make them agree: the code can only be as long as there are inputs.`,
          );
        }
      });
    }
  }

  /** An input's position in the code. */
  indexOf(input: ScOtpInputSlot): number {
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
    const kept = [...text].map(keep).join('');
    const normalize = this.normalizeValue();
    return normalize ? [...normalize(kept)].map(keep).join('') : kept;
  }

  /**
   * Writes text from an input on — one character overwrites it, several
   * (pasted, autofilled) fill the next ones too — then focuses the input
   * after the last one written.
   */
  write(index: number, text: string): void {
    const chars = this.accept(text);
    if (!chars || this.locked()) return;
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
    if (this.locked()) return;
    const value = this.value();
    this.value.set(value.slice(0, index) + value.slice(index + 1));
  }

  focusInput(index: number): void {
    this.inputs()[index]?.focus();
  }

  private onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.element.contains(next)) {
      this.focused.set(false);
      this.touch.emit();
    }
  }

  /** A pasted code replaces the whole value. */
  private onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    if (this.locked()) return;
    const chars = this.accept(event.clipboardData?.getData('text') ?? '');
    if (!chars) return;
    this.value.set(chars.slice(0, this.length()));
    this.focusInput(Math.min(chars.length, this.length() - 1));
  }
}
