import { _IdGenerator } from '@angular/cdk/a11y';
import {
  computed,
  contentChildren,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';
import { ScOptFieldSlot } from './opt-field-slot';

@Directive({
  selector: 'div[sc-opt-field], label[sc-opt-field]',
  providers: [{ provide: SC_FIELD, useExisting: ScOptField }],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'opt-field',
    '[class]': 'class()',
    '(paste)': 'onPaste($event)',
  },
})
export class ScOptField {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-opt-field-'));

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<string>('');
  readonly disabled = input<boolean>(false);

  private readonly slots = contentChildren(ScOptFieldSlot, {
    descendants: true,
  });

  readonly maxLength = computed(() => this.slots().length);

  protected readonly class = computed(() =>
    cn('flex items-center gap-2 has-[:disabled]:opacity-50', this.classInput()),
  );

  readonly chars = computed(() => {
    const val = this.value();
    const max = this.maxLength();
    const result: string[] = [];
    for (let i = 0; i < max; i++) {
      result.push(val[i] || '');
    }
    return result;
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
    const chars = current.split('');

    // Pad with empty strings if needed
    while (chars.length < index) {
      chars.push('');
    }

    chars[index] = char;

    // Join and trim trailing empty chars
    let newValue = chars.join('');
    // Keep only up to maxLength
    newValue = newValue.slice(0, this.maxLength());

    this.value.set(newValue);
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
    const cleanData = pastedData.replace(/\s/g, '').slice(0, this.maxLength());

    if (cleanData) {
      this.value.set(cleanData);
      // Focus the slot after the last pasted character or the last slot
      const focusIndex = Math.min(cleanData.length, this.maxLength() - 1);
      this.focusSlot(focusIndex);
    }
  }
}
