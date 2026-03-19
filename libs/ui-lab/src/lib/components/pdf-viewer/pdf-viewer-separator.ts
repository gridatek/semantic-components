import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scPdfViewerSeparator]',
  host: {
    'data-slot': 'pdf-viewer-separator',
    role: 'separator',
    '[attr.aria-orientation]': '"vertical"',
    '[class]': 'class()',
  },
})
export class ScPdfViewerSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-px h-6 bg-border', this.classInput()),
  );
}
