import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scDiffViewerPane]',
  host: {
    'data-slot': 'diff-viewer-pane',
    '[class]': 'class()',
  },
})
export class ScDiffViewerPane {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input.required<'old' | 'new'>();

  protected readonly class = computed(() =>
    cn(
      'min-w-0 flex-1',
      this.side() === 'old' && 'border-r',
      this.classInput(),
    ),
  );
}
