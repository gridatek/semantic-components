import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfAttachment } from './pdf-viewer-types';

/**
 * Downloads a file attached to the document (`viewer.attachments()`). Write its
 * file name.
 */
@Directive({
  selector: 'button[scPdfViewerAttachment]',
  host: {
    type: 'button',
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
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
