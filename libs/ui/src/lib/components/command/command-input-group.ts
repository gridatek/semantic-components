import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCommandInputGroup]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCommandInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-2 h-8 rounded-lg border border-input/30 bg-input/30 px-2',
      "[&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:opacity-50 [&>svg:not([class*='size-'])]:size-4",
      this.classInput(),
    ),
  );
}
