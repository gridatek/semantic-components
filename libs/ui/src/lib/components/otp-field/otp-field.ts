import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { bindInput } from '../../utils';
import { ScField } from '../field';
import { ScOtpFieldSlot } from './otp-field-slot';

/**
 * A one-time password field, as Base UI's OTP Field: holds the code, one
 * character per `scOtpFieldSlot`, and spreads a pasted code over them. A
 * Signal Forms control: bind `[formField]` here. It is a `scField` too (a
 * label, description and errors go inside it), whose `id`, `orientation`
 * and `class` it takes; the slots sit in a `scOtpFieldGroup`.
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

  readonly value = model<string>('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly inputMode = input<'numeric' | 'text'>('numeric');
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });

  /** Focus left the field — not just one slot for the next (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** Invalid once touched: the slots' `aria-invalid`, the field's `data-invalid`. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  private readonly slots = contentChildren(ScOtpFieldSlot, {
    descendants: true,
  });

  readonly slotCount = computed(() => this.slots().length);

  readonly chars = computed(() => {
    const val = this.value();
    const max = this.slotCount();
    const result: string[] = [];
    for (let i = 0; i < max; i++) {
      result.push(val[i] || '');
    }
    return result;
  });

  readonly firstEmptyIndex = computed(() => {
    const c = this.chars();
    const idx = c.indexOf('');
    return idx === -1 ? -1 : idx;
  });

  constructor() {
    // The field's state follows the code's (`data-disabled`, `data-invalid`).
    bindInput(this.field.disabledInput, this.disabled);
    bindInput(this.field.invalidInput, this.showInvalid);

    effect(() => {
      const allSlots = this.slots();
      allSlots.forEach((slot, index) => {
        slot.setIndex(index);
      });
    });
  }

  getChar(index: number): string {
    return this.chars()[index] || '';
  }

  setChar(index: number, char: string): void {
    const current = this.value();
    const before = current.slice(0, index);
    const after = current.slice(index + 1);

    if (char) {
      this.value.set((before + char + after).slice(0, this.slotCount()));
    } else {
      this.value.set(before + after);
    }
  }

  focusSlot(index: number): void {
    const allSlots = this.slots();
    if (index >= 0 && index < allSlots.length) {
      allSlots[index].focus();
    }
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.element.contains(next)) this.touch.emit();
  }

  protected onPaste(event: Event): void {
    if (this.disabled()) return;
    if (!(event instanceof ClipboardEvent)) return;

    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const cleanData = pastedData.replace(/\s/g, '').slice(0, this.slotCount());
    const filteredData =
      this.inputMode() === 'numeric' ? cleanData.replace(/\D/g, '') : cleanData;

    if (filteredData) {
      this.value.set(filteredData);
      // Focus the slot after the last pasted character or the last slot
      const focusIndex = Math.min(filteredData.length, this.slotCount() - 1);
      this.focusSlot(focusIndex);
    }
  }
}
