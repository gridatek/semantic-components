import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerLinePlaceholder]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDiffViewerLinePlaceholder {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-muted/30 h-6', this.classInput()),
  );
}
