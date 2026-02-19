import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scSelectItemIndicator]',
  host: {
    'data-slot': 'select-item-indicator',
    '[class]': 'class()',
  },
})
export class ScSelectItemIndicator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute right-2 flex size-4 items-center justify-center opacity-0 [[aria-selected=true]>&]:opacity-100',
      this.classInput(),
    ),
  );
}
