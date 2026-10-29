import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/**
 * What a step did, as a sentence — its status too ("Failed to run the
 * build"): the color and the shimmer aren't read out. Shimmers while running,
 * unless motion is reduced.
 */
@Directive({
  selector: 'span[scTraceTitle]',
  host: {
    'data-slot': 'trace-title',
    '[class]': 'class()',
  },
})
export class ScTraceTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('motion-reduce:shimmer-none min-w-0 truncate', this.classInput()),
  );
}
