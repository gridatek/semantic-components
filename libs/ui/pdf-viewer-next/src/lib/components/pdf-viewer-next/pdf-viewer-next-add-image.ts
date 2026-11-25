import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Places a chosen image on the current page — pdf.js's image editor, in
 * its image mode. Use on an `input type="file"` — hide it and open it from
 * your own button (`#image`, `image.click()`).
 */
@Directive({
  selector: 'input[type="file"][scPdfViewerNextAddImage]',
  host: {
    'data-slot': 'pdf-viewer-add-image',
    accept: 'image/*',
    '[class]': 'class()',
    '(change)': 'add($event)',
  },
})
export class ScPdfViewerNextAddImage {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  private add(event: Event): void {
    const field = event.target as HTMLInputElement;
    const file = field.files?.[0];
    field.value = '';
    if (!file) return;
    this.pdfViewer.addImage(file);
  }
}
