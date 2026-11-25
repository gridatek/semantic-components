import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * The find bar's row, under the toolbar — the toolbar's look: put the find
 * field, its buttons, options and results in it.
 */
@Directive({
  selector: '[scPdfViewerFindbar]',
  host: {
    'data-slot': 'pdf-viewer-findbar',
    '[class]': 'class()',
  },
})
export class ScPdfViewerFindbar {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-2 px-3 py-2 bg-background border-b',
      this.classInput(),
    ),
  );
}
