import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Directive({
  selector: '[scSpotlightDescription]',
  host: {
    '[class]': 'class()',
    '[id]': 'state.descriptionId',
  },
})
export class ScSpotlightDescription {
  protected readonly state = inject(ScSpotlightState);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm text-muted-foreground', this.classInput()),
  );
}
