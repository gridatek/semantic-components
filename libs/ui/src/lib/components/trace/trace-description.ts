import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A step's detail after its title: a count, a duration, a file. */
@Directive({
  selector: 'span[scTraceDescription]',
  host: {
    'data-slot': 'trace-description',
    '[class]': 'class()',
  },
})
export class ScTraceDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  // Not shadcn's /70: muted-foreground itself, for 4.5:1.
  protected readonly class = computed(() =>
    cn('text-muted-foreground shrink-0 tabular-nums', this.classInput()),
  );
}
