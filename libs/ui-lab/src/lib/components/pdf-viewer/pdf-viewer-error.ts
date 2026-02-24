import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiCircleXIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

@Component({
  selector: '[scPdfViewerError]',
  imports: [SiCircleXIcon],
  template: `
    @if (pdfViewer.error()) {
      <div [class]="overlayClass()">
        <ng-content>
          <div class="flex flex-col items-center gap-3 text-center px-4">
            <div
              class="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"
            >
              <svg siCircleXIcon class="size-8 text-destructive"></svg>
            </div>
            <p class="text-sm font-medium text-foreground">
              Failed to load PDF
            </p>
            <p class="text-sm text-muted-foreground max-w-xs">
              {{ pdfViewer.error() }}
            </p>
            <button
              type="button"
              class="mt-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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
