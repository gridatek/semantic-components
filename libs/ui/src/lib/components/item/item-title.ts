import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-item-title]',
  host: {
    'data-slot': 'item-title',
    '[class]': 'class()',
  },
})
export class ScItemTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-2 text-sm leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center',
      this.classInput(),
    ),
  );
}
