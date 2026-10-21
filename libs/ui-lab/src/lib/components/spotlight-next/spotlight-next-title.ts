import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightNext } from './spotlight-next';

/** Its title — your heading: the spotlight names its dialog with it. */
@Directive({
  selector: '[scSpotlightNextTitle]',
  host: {
    'data-slot': 'spotlight-title',
    '[id]': 'id',
    '[class]': 'class()',
  },
})
export class ScSpotlightNextTitle {
  protected readonly id = inject(_IdGenerator).getId('sc-spotlight-title-');

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('pe-6 leading-tight font-semibold', this.classInput()),
  );

  constructor() {
    const spotlight = inject(ScSpotlightNext);
    spotlight.ɵtitleId.set(this.id);
    inject(DestroyRef).onDestroy(() => {
      if (spotlight.ɵtitleId() === this.id) spotlight.ɵtitleId.set(null);
    });
  }
}
