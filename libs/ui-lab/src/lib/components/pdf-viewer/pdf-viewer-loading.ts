import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

/**
 * Covers the content while the document loads, announced as a status.
 * Project a spinner (`<svg scSpinner siLoaderCircleIcon></svg>`) to show one.
 */
@Component({
  selector: '[scPdfViewerLoading]',
  template: `
    @if (pdfViewer.isLoading()) {
      <div
        role="status"
        class="bg-background text-muted-foreground absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-sm"
      >
        <ng-content />
        <span>{{ label() }}</span>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-loading',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerLoading {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly label = input('Loading document…');

  protected readonly class = computed(() => cn('contents', this.classInput()));
}
