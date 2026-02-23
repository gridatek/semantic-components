import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scRangeSliderTrack]',
  host: {
    '[class]': 'class()',
  },
})
export class ScRangeSliderTrack {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute h-1 w-full rounded-full bg-muted', this.classInput()),
  );
}
