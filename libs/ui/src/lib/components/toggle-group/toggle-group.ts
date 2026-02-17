import { computed, Directive, input, model } from '@angular/core';
import { cn } from '../../utils';
import { type ScToggleVariants } from '../toggle/toggle';

@Directive({
  selector: 'div[scToggleGroup]',
  host: {
    'data-slot': 'toggle-group',
    role: 'group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-horizontal]': 'orientation() === "horizontal" ? "" : null',
    '[attr.data-vertical]': 'orientation() === "vertical" ? "" : null',
    '[style.--gap]': 'spacing()',
    '[class]': 'class()',
  },
})
export class ScToggleGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'single' | 'multiple'>('single');
  readonly value = model<string | string[] | null>(null);
  readonly disabled = input<boolean>(false);
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');
  readonly spacing = input<number>(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly class = computed(() =>
    cn(
      'rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch',
      this.classInput(),
    ),
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
