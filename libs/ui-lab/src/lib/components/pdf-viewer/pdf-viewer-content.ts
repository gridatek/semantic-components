import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scPdfViewerContent]',
  exportAs: 'scPdfViewerContent',
  host: {
    'data-slot': 'pdf-viewer-content',
    '[class]': 'class()',
  },
})
export class ScPdfViewerContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex-1 relative min-h-0 overflow-hidden bg-muted/30',
      this.classInput(),
    ),
  );
}
