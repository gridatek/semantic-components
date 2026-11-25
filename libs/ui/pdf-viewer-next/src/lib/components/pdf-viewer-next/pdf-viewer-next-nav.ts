import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** Groups the page navigation controls (`role="group"`); give it an `aria-label`. */
@Directive({
  selector: '[scPdfViewerNextNav]',
  host: {
    'data-slot': 'pdf-viewer-nav',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScPdfViewerNextNav {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
