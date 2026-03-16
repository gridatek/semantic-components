import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerToggle]',
  host: {
    'data-slot': 'diff-viewer-toggle',
    '[class]': 'class()',
  },
})
export class ScDiffViewerToggle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center overflow-hidden rounded-md border',
      this.classInput(),
    ),
  );
}
