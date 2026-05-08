import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'span[scDiffViewerLineSign]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerLineSign {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('inline-block w-6 text-center select-none', this.classInput()),
  );
}
