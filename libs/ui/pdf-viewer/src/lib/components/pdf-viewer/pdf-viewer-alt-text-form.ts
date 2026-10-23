import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Edits the alternative text of an image annotation (a stamp or a
 * signature) in the `altText` dialog (`#form="scPdfViewerAltTextForm"`):
 * a description, or marked as decorative. Starts from the annotation's
 * current alt text; submitting saves it and closes the dialog. Put a
 * `scPdfViewerAltTextInput` and two `scPdfViewerAltTextKind` radios in it.
 */
@Directive({
  selector: 'form[scPdfViewerAltTextForm]',
  exportAs: 'scPdfViewerAltTextForm',
  host: {
    'data-slot': 'pdf-viewer-alt-text-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerAltTextForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-4', this.classInput()),
  );

  private readonly annotation = this.pdfViewer
    .editorAnnotations()
    .find((a) => a.id === this.pdfViewer.altTextAnnotationId());

  /** The description. */
  readonly text = signal(this.annotation?.altText ?? '');
  /** Marked as decorative (no description). */
  readonly decorative = signal(this.annotation?.isDecorative ?? false);

  protected submit(event: Event): void {
    event.preventDefault();
    if (this.annotation) {
      const isDecorative = this.decorative();
      this.pdfViewer.updateEditorAnnotation(this.annotation.id, {
        altText: isDecorative ? '' : this.text().trim(),
        isDecorative,
      });
    }
    this.pdfViewer.closeAltText();
  }
}
