import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Groups the zoom controls (`role="group"`); give it an `aria-label`. */
@Directive({
  selector: '[scPdfViewerZoom]',
  host: {
    'data-slot': 'pdf-viewer-zoom',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScPdfViewerZoom {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
