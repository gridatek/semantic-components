import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerEmpty]',
  host: {
    'data-slot': 'diff-viewer-empty',
    '[class]': 'class()',
  },
})
export class ScDiffViewerEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground flex items-center justify-center py-12',
      this.classInput(),
    ),
  );
}
