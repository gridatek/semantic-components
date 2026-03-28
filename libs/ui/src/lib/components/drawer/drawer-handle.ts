import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scDrawerHandle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDrawerHandle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted mt-4 h-1 w-[100px] rounded-full mx-auto hidden shrink-0 group-data-[direction=bottom]/drawer:block',
      this.classInput(),
    ),
  );
}
