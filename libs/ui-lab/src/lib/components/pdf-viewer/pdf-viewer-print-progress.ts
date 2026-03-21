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
  selector: 'sc-pdf-viewer-print-progress',
  template: `
    @if (pdfViewer.printDialogOpen()) {
      <div
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <dialog
          open
          class="relative w-80 rounded border border-[#333] bg-[#474747] p-5 text-[#d1d5db] shadow-lg"
          (click)="$event.stopPropagation()"
        >
          <h2 class="mb-3 text-sm font-semibold text-white">
            Preparing to Print...
          </h2>

          <!-- Progress bar -->
          <div class="mb-3 h-2 w-full overflow-hidden rounded bg-[#3d3d3d]">
            <div
              class="h-full bg-[#6b9edd] transition-[width] duration-200"
              [style.width.%]="pdfViewer.printProgress()"
            ></div>
          </div>

          <p class="mb-4 text-center text-xs text-[#bbb]">
            {{ pdfViewer.printProgress() }}% complete
          </p>

          <div class="flex justify-end">
            <button
              type="button"
              class="rounded border border-[#666] bg-[#5a5a5a] px-4 py-1.5 text-sm text-[#d1d5db] hover:bg-[#666] hover:text-white"
              (click)="pdfViewer.cancelPrint()"
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-print-progress',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerPrintProgress {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
