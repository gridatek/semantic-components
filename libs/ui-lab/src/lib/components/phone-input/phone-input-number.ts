import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SC_FIELD, cn, inputStyles } from '@semantic-components/ui';
import { SC_PHONE_INPUT } from './phone-input-types';

/** A character that's part of the number (not formatting). */
const isSignificant = (char: string): boolean => /[\d+]/.test(char);

const countSignificant = (text: string): number =>
  [...text].filter(isSignificant).length;

/** The position just after the `count`-th significant character. */
function positionAfter(text: string, count: number): number {
  if (count === 0) return 0;
  let seen = 0;
  for (let i = 0; i < text.length; i++) {
    if (isSignificant(text[i]) && ++seen === count) return i + 1;
  }
  return text.length;
}

/**
 * The number field of a `scPhoneInput`: formats as you type (in the
 * country's national format, or international after a `+`) and keeps the
 * caret where it was. Labelled by the enclosing field's label.
 */
@Directive({
  selector: 'input[scPhoneInputNumber]',
  host: {
    type: 'tel',
    inputmode: 'tel',
    autocomplete: 'tel',
    'data-slot': 'control',
    '[id]': 'id()',
    '[attr.aria-invalid]': '(phone.touched() && phone.invalid()) || null',
    '[attr.aria-required]': 'phone.required() || null',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.disabled]': 'phone.disabled() || null',
    '[readOnly]': 'phone.readonly()',
    '[class]': 'class()',
    '(input)': 'onInput()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScPhoneInputNumber {
  protected readonly phone = inject(SC_PHONE_INPUT);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  private readonly fallbackId = inject(_IdGenerator).getId('sc-phone-input-');

  readonly idInput = input('', { alias: 'id' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );
  protected readonly describedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  protected readonly class = computed(() => cn(inputStyles, this.classInput()));

  constructor() {
    // Show the number when it's set from outside (initial value, reset).
    effect(() => {
      const text = this.phone.text();
      if (this.element.value !== text) this.element.value = text;
    });
  }

  focus(options?: FocusOptions): void {
    this.element.focus(options);
  }

  protected onInput(): void {
    const { value, selectionStart } = this.element;
    const caret = selectionStart ?? value.length;
    this.apply(value, countSignificant(value.slice(0, caret)));
  }

  /**
   * Backspace/Delete next to a formatting character (a space, a bracket)
   * removes the digit beyond it — otherwise reformatting would put the
   * character straight back.
   */
  protected onKeydown(event: KeyboardEvent): void {
    const forward = event.key === 'Delete';
    if ((event.key !== 'Backspace' && !forward) || event.ctrlKey) return;
    const { value, selectionStart, selectionEnd } = this.element;
    if (selectionStart === null || selectionStart !== selectionEnd) return;

    const caret = selectionStart;
    const next = forward ? value[caret] : value[caret - 1];
    if (next === undefined || isSignificant(next)) return;

    let index = forward ? caret : caret - 1;
    while (index >= 0 && index < value.length && !isSignificant(value[index])) {
      index += forward ? 1 : -1;
    }
    if (index < 0 || index >= value.length) return;

    event.preventDefault();
    const raw = value.slice(0, index) + value.slice(index + 1);
    const before = forward ? value.slice(0, caret) : value.slice(0, index);
    this.apply(raw, countSignificant(before));
  }

  private apply(raw: string, significantBeforeCaret: number): void {
    this.phone.type(raw);
    const text = this.phone.text();
    this.element.value = text;
    const caret = positionAfter(text, significantBeforeCaret);
    this.element.setSelectionRange(caret, caret);
  }
}
