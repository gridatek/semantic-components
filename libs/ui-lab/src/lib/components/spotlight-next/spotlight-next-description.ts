import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightNext } from './spotlight-next';

/** Its text: the spotlight describes its dialog with it. */
@Directive({
  selector: '[scSpotlightNextDescription]',
  host: {
    'data-slot': 'spotlight-description',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScSpotlightNextDescription {
  protected readonly id = inject(_IdGenerator).getId(
    'sc-spotlight-description-',
  );

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );

  constructor() {
    const spotlight = inject(ScSpotlightNext);
    spotlight.ɵdescriptionId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (spotlight.ɵdescriptionId() === this.id)
        spotlight.ɵdescriptionId.set(null);
    });
  }
}
