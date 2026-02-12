import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-field-title]',
  host: {
    'data-slot': 'field-title',
    '[class]': 'class()',
  },
})
export class ScFieldTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug',
      this.classInput(),
    ),
  );
}
