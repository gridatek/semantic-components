import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[scPdfViewerContent]',
  template: `
    <ng-content />

    @if (pdfViewer.showContent()) {
      <div
        class="h-full w-full overflow-auto"
        [style.transform]="'rotate(' + pdfViewer.rotation() + 'deg)'"
        [style.transform-origin]="'center center'"
      >
        <object
          [data]="pdfViewer.safePdfUrl()"
          type="application/pdf"
          class="h-full w-full"
          [style.min-height]="'100%'"
          (load)="pdfViewer.onLoad()"
          (error)="onError()"
        >
          <iframe
            [src]="pdfViewer.safePdfUrl()"
            class="h-full w-full border-0"
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
