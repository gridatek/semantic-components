import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: 'button[scPdfViewerFindToggle]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-find-toggle',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'pdfViewer.findOpen()',
    'aria-label': 'Find in Document',
    '(click)': 'pdfViewer.toggleFind()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerFindToggle {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('', this.classInput()));
}
