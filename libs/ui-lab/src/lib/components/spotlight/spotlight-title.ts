import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Directive({
  selector: '[scSpotlightTitle]',
  host: {
    '[class]': 'class()',
    '[id]': 'state.titleId',
  },
})
export class ScSpotlightTitle {
  protected readonly state = inject(ScSpotlightState);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-semibold text-lg mb-2', this.classInput()),
  );
}
