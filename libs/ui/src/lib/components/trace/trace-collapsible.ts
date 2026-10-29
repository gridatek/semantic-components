import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * A step that opens on its details — on a `scCollapsible`, which does the
 * opening; this lays it out.
 */
@Directive({
  selector: 'div[scTraceCollapsible]',
  host: {
    'data-slot': 'trace-collapsible',
    '[class]': 'class()',
  },
})
export class ScTraceCollapsible {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex w-full min-w-0 flex-col', this.classInput()),
  );
}
