import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Edits the alternative text of an image on the page in the `altText`
 * dialog (`#form="scPdfViewerAltTextForm"`), which pdf.js's alt-text
 * button on the image opens: a description, or marked as decorative.
 * Starts from its current alt text; submitting saves it and closes the
 * dialog. Put a
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
