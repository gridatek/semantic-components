import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
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
  private readonly buttonStyles = injectPreset().button;

  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly attachment = input.required<ScPdfAttachment>({
    alias: 'scPdfViewerAttachment',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
