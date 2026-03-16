import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerSplit]',
  host: {
    'data-slot': 'diff-viewer-split',
    '[class]': 'class()',
  },
})
export class ScDiffViewerSplit {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('flex', this.classInput()));
}
