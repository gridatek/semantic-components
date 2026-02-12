import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-select-item-indicator]',
  host: {
    'data-slot': 'select-item-indicator',
    '[class]': 'class()',
  },
})
export class ScSelectItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute right-2 size-4 opacity-0 [[aria-selected=true]>&]:opacity-100',
      this.classInput(),
    ),
  );
}
