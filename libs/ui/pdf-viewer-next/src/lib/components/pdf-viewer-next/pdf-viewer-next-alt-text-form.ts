import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Edits the alternative text of an image on the page in the `altText`
 * dialog (`#form="scPdfViewerNextAltTextForm"`), which pdf.js's alt-text
 * button on the image opens: a description, or marked as decorative.
 * Starts from its current alt text; submitting saves it and closes the
 * dialog. Put a
 * `scPdfViewerNextAltTextInput` and two `scPdfViewerNextAltTextKind` radios in it.
 */
@Directive({
  selector: 'form[scPdfViewerNextAltTextForm]',
  exportAs: 'scPdfViewerNextAltTextForm',
  host: {
    'data-slot': 'pdf-viewer-alt-text-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerNextAltTextForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('grid gap-4', this.classInput()));

  private readonly initial = this.pdfViewer.altText();

  /** The description. */
  readonly text = signal(this.initial?.text ?? '');
  /** Marked as decorative (no description). */
  readonly decorative = signal(this.initial?.decorative ?? false);

  private submit(event: Event): void {
    event.preventDefault();
    this.pdfViewer.saveAltText(this.text(), this.decorative());
  }
}
