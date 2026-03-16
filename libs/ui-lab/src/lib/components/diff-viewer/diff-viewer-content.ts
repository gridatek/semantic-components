import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerContent]',
  host: {
    'data-slot': 'diff-viewer-content',
    '[class]': 'class()',
    '[style.max-height]': 'maxHeight()',
  },
})
export class ScDiffViewerContent {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly maxHeight = input<string>('600px');

  protected readonly class = computed(() =>
    cn('overflow-auto', this.classInput()),
  );
}
