import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'span[scDiffViewerLineNumber]',
  host: {
    'data-slot': 'diff-viewer-line-number',
    '[class]': 'class()',
  },
})
export class ScDiffViewerLineNumber {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground inline-block w-12 border-r px-2 text-right select-none',
      this.classInput(),
    ),
  );
}
