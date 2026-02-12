import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-command-empty]',
  host: {
    'data-slot': 'command-empty',
    '[class]': 'class()',
  },
})
export class ScCommandEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('py-6 text-center text-sm', this.classInput()),
  );
}
