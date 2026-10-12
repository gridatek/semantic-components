import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Groups the page navigation controls (`role="group"`); give it an `aria-label`. */
@Directive({
  selector: '[scPdfViewerNav]',
  host: {
    'data-slot': 'pdf-viewer-nav',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNav {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
