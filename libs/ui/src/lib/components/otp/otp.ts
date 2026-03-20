import {
  Directive,
  computed,
  contentChildren,
  effect,
  input,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScOtpSlot } from './otp-slot';

@Directive({
  selector: 'div[scOtp]',
  host: {
    'data-slot': 'otp',
    '[class]': 'class()',
    '(paste)': 'onPaste($event)',
  },
})
export class ScOtp implements FormValueControl<string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<string>('');
  readonly disabled = input<boolean>(false);
  readonly inputMode = input<'numeric' | 'text'>('numeric');

  private readonly slots = contentChildren(ScOtpSlot, {
    descendants: true,
  });

  readonly slotCount = computed(() => this.slots().length);

  protected readonly class = computed(() =>
    cn('flex items-center gap-2 has-disabled:opacity-50', this.classInput()),
  );

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
