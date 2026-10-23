import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The toolbar row (`role="toolbar"`); give it an `aria-label`. */
@Directive({
  selector: '[scPdfViewerToolbar]',
  host: {
    'data-slot': 'pdf-viewer-toolbar',
    role: 'toolbar',
    '[class]': 'class()',
  },
})
export class ScPdfViewerToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-2 px-3 py-2 bg-background border-b',
      // Vertical separators (scSeparator): short and centered on the row.
      '*:data-[orientation=vertical]:mx-1 *:data-[orientation=vertical]:h-5 *:data-[orientation=vertical]:self-center',
      this.classInput(),
    ),
  );
}
