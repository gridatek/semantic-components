import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scLightboxZoomControls]',
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxZoomControls {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('ml-4 flex items-center gap-1', this.classInput()),
  );
}
