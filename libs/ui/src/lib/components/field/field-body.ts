import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scFieldBody]',
  host: {
    'data-slot': 'field-body',
    '[class]': 'class()',
  },
})
export class ScFieldBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-0.5 group/field-body flex flex-1 flex-col leading-snug',
      this.classInput(),
    ),
  );
}
