import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Places a chosen image on the current page as an image annotation (a
 * stamp), about 15% of the page wide. Use on an `input type="file"` — hide
 * it and open it from your own button (`#image`, `image.click()`).
 */
@Directive({
  selector: 'input[type="file"][scPdfViewerAddImage]',
  host: {
    'data-slot': 'pdf-viewer-add-image',
    accept: 'image/*',
    '[class]': 'class()',
    '(change)': 'add($event)',
  },
})
export class ScPdfViewerAddImage {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected add(event: Event): void {
    const field = event.target as HTMLInputElement;
    const file = field.files?.[0];
    field.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const image = new Image();
      image.onload = () => {
        const width = 0.15;
        this.pdfViewer.addEditorAnnotation({
          type: 'stamp',
          pageNumber: this.pdfViewer.currentPage(),
          imageDataUrl: dataUrl,
          width,
          height: width * (image.height / image.width),
          x: 0.4,
          y: 0.4,
        });
      };
      image.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }
}
