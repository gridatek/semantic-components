import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfAttachment } from './pdf-viewer-next-types';

/**
 * Downloads a file attached to the document (`viewer.attachments()`). Write its
 * file name.
 */
@Directive({
  selector: 'button[scPdfViewerNextAttachment]',
  host: {
    type: 'button',
    'data-slot': 'pdf-viewer-attachment',
    '[class]': 'class()',
    '(click)': 'pdfViewer.downloadAttachment(attachment())',
  },
})
export class ScPdfViewerNextAttachment {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);

  readonly attachment = input.required<ScPdfAttachment>({
    alias: 'scPdfViewerNextAttachment',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
