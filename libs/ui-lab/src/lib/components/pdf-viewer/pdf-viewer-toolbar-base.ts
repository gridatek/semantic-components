import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

// Toolbar Container (Composable)
@Component({
  selector: '[scPdfViewerToolbar]',
  template: ` <ng-content /> `,
  host: {
    'data-slot': 'pdf-viewer-toolbar',
    role: 'toolbar',
    '[attr.aria-label]': '"PDF viewer toolbar"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
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
