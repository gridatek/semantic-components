import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerHeader]',
  host: {
    'data-slot': 'diff-viewer-header',
    '[class]': 'class()',
  },
})
export class ScDiffViewerHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted/30 flex items-center justify-between border-b px-4 py-2',
      this.classInput(),
    ),
  );
}
