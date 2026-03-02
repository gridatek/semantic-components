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
  selector: '[scPdfViewerLoading]',
  template: `
    @if (pdfViewer.isLoading()) {
      <div [class]="overlayClass()">
        <ng-content>
          <div class="flex flex-col items-center gap-3">
            <div
              class="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
            ></div>
            <p class="text-muted-foreground text-sm">Loading PDF...</p>
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
