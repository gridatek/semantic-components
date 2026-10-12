import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScProgress,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Shows the progress while pages are prepared for printing. Closing it
 * (Cancel, Escape, clicking outside) cancels the print.
 */
@Component({
  selector: 'sc-pdf-viewer-print-progress',
  imports: [
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScProgress,
    ScButton,
  ],
  template: `
    <div
      scDialogProvider
      [open]="pdfViewer.printDialogOpen()"
      (openChange)="onOpenChange($event)"
    >
      <ng-template scDialogPortal>
        <div scDialog class="sm:w-sm">
          <div scDialogHeader>
            <h2 scDialogTitle>Preparing to print</h2>
            <p scDialogDescription>
              {{ pdfViewer.printProgress() }}% of the pages ready
            </p>
          </div>
          <div
            scProgress
            [value]="pdfViewer.printProgress()"
            aria-label="Print preparation"
          ></div>
          <div scDialogFooter>
            <button
              scButton
              variant="outline"
              (click)="pdfViewer.cancelPrint()"
            >
              Cancel
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: {
    'data-slot': 'pdf-viewer-print-progress',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScPdfViewerPrintProgress {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('contents', this.classInput()));

  /** Dismissed with Escape or a click outside. */
  protected onOpenChange(open: boolean): void {
    if (!open && this.pdfViewer.printDialogOpen()) this.pdfViewer.cancelPrint();
  }
}
