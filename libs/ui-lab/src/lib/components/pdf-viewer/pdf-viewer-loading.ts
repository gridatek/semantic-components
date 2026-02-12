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
  selector: '[sc-pdf-viewer-loading]',
  template: `
    @if (pdfViewer.isLoading()) {
      <div [class]="overlayClass()">
        <ng-content>
          <div class="flex flex-col items-center gap-3">
            <div
              class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
            ></div>
            <p class="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        </ng-content>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-loading',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerLoading {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly overlayClass = computed(() =>
    cn(
      'absolute inset-0 flex items-center justify-center bg-background/80 z-10',
      this.classInput(),
    ),
  );
}
