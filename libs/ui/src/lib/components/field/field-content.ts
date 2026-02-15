import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-field-content]',
  host: {
    'data-slot': 'field-content',
    '[class]': 'class()',
  },
})
export class ScFieldContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-0.5 group/field-content flex flex-1 flex-col leading-snug',
      this.classInput(),
    ),
  );
}
