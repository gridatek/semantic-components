import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[sc-pdf-viewer-content]',
  template: `
    <ng-content />

    @if (pdfViewer.showContent()) {
      <div
        class="w-full h-full overflow-auto"
        [style.transform]="'rotate(' + pdfViewer.rotation() + 'deg)'"
        [style.transform-origin]="'center center'"
      >
        <object
          [data]="pdfViewer.safePdfUrl()"
          type="application/pdf"
          class="w-full h-full"
          [style.min-height]="'100%'"
          (load)="pdfViewer.onLoad()"
          (error)="onError()"
        >
          <iframe
            [src]="pdfViewer.safePdfUrl()"
            class="w-full h-full border-0"
            [title]="pdfViewer.title() || 'PDF Document'"
            (load)="pdfViewer.onLoad()"
            (error)="onError()"
          ></iframe>
        </object>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-content',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerContent {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex-1 relative overflow-hidden bg-muted/30', this.classInput()),
  );

  protected onError(): void {
    this.pdfViewer.onError();
  }
}
