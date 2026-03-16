import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scSpotlightTitle]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSpotlightTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-semibold text-lg mb-2', this.classInput()),
  );
}
