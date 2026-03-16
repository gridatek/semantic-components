import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scSignaturePadControls]',
  host: {
    'data-slot': 'signature-pad-controls',
    '[class]': 'class()',
  },
})
export class ScSignaturePadControls {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute top-2 right-2 flex gap-1', this.classInput()),
  );
}
