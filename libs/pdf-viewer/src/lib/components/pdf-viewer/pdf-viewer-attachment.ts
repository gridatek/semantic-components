import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfAttachment } from './pdf-viewer-types';

/**
 * Downloads a file attached to the document (`viewer.attachments()`). Use on
 * a `scButton`; write its file name.
 */
@Directive({
  selector: 'button[scPdfViewerAttachment]',
  host: {
    'data-slot': 'pdf-viewer-attachment',
    '[class]': 'class()',
    '(click)': 'pdfViewer.downloadAttachment(attachment())',
  },
})
export class ScPdfViewerAttachment {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly attachment = input.required<ScPdfAttachment>({
    alias: 'scPdfViewerAttachment',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
