import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scColorPickerSwatches]',
  exportAs: 'scColorPickerSwatches',
  host: {
    '[class]': 'class()',
  },
})
export class ScColorPickerSwatches {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly colors = input<string[]>([
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#000000',
    '#6b7280',
    '#ffffff',
  ]);

  protected readonly class = computed(() =>
    cn('flex flex-wrap gap-2', this.classInput()),
  );
}
