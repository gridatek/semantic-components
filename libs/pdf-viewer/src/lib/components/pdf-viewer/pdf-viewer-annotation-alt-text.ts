import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * Opens the `altText` dialog for an image annotation (a stamp or a
 * signature). Use on a `scButton`; its `altText` / `isDecorative` tell what
 * it has.
 */
@Directive({
  selector: 'button[scPdfViewerAnnotationAltText]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.openAltText(annotation().id)',
  },
})
export class ScPdfViewerAnnotationAltText {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly annotation = input.required<ScPdfEditorAnnotation>({
    alias: 'scPdfViewerAnnotationAltText',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
