import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The bar's track: the whole line, the range inside it. */
@Directive({
  selector: 'div[scProgressTrack]',
  host: {
    'data-slot': 'progress-track',
    '[class]': 'class()',
  },
})
export class ScProgressTrack {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted relative flex h-1 w-full items-center overflow-hidden rounded-full',
      this.classInput(),
    ),
  );
}
