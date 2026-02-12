import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[sc-pdf-viewer-fullscreen]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-fullscreen',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]':
      'pdfViewer.isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"',
    '[attr.aria-pressed]': 'pdfViewer.isFullscreen()',
    '(click)': 'pdfViewer.toggleFullscreen()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerFullscreen {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-2 rounded-lg hover:bg-muted transition-colors', this.classInput()),
  );
}
