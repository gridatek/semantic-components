import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scSpotlightActions]',
  host: {
    '[class]': 'class()',
  },
})
export class ScSpotlightActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex gap-2 mt-4 justify-end', this.classInput()),
  );
}
