import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiCircleXIcon } from '@semantic-icons/lucide-icons';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[scPdfViewerError]',
  imports: [SiCircleXIcon],
  template: `
    @if (pdfViewer.error()) {
      <div [class]="overlayClass()">
        <ng-content>
          <div class="flex flex-col items-center gap-3 px-4 text-center">
            <div
              class="bg-destructive/10 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <svg siCircleXIcon class="text-destructive size-8"></svg>
            </div>
            <p class="text-foreground text-sm font-medium">
              Failed to load PDF
            </p>
            <p class="text-muted-foreground max-w-xs text-sm">
              {{ pdfViewer.error() }}
            </p>
            <button
              type="button"
              class="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              (click)="pdfViewer.retry()"
            >
              Retry
            </button>
          </div>
        </ng-content>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-error',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerError {
  readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly overlayClass = computed(() =>
    cn(
      'absolute inset-0 flex items-center justify-center bg-background z-10',
      this.classInput(),
    ),
  );
}
