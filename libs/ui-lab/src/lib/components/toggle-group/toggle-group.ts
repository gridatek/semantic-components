import { computed, Directive, input, model } from '@angular/core';
import { cn } from '../../utils';

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupVariant = 'default' | 'outline';
export type ToggleGroupSize = 'default' | 'sm' | 'lg';

@Directive({
  selector: 'div[sc-toggle-group]',
  host: {
    'data-slot': 'toggle-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScToggleGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<ToggleGroupType>('single');
  readonly value = model<string | string[] | null>(null);
  readonly disabled = input<boolean>(false);
  readonly variant = input<ToggleGroupVariant>('default');
  readonly size = input<ToggleGroupSize>('default');

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-1', this.classInput()),
  );

  isSelected(itemValue: string): boolean {
    const currentValue = this.value();
    if (this.type() === 'single') {
      return currentValue === itemValue;
    }
    return Array.isArray(currentValue) && currentValue.includes(itemValue);
  }

  toggle(itemValue: string): void {
    if (this.disabled()) return;

    if (this.type() === 'single') {
      this.value.set(this.value() === itemValue ? null : itemValue);
    } else {
      const currentValue = this.value();
      const arr = Array.isArray(currentValue) ? [...currentValue] : [];
      const index = arr.indexOf(itemValue);
      if (index === -1) {
        arr.push(itemValue);
      } else {
        arr.splice(index, 1);
      }
      this.value.set(arr);
    }
  }
}
