import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScProgress,
  ScSpinner,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
import {
  ScPdfViewer,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDialog,
  ScPdfViewerDownload,
  ScPdfViewerLoading,
  ScPdfViewerPrint,
  ScPdfViewerPrintProgress,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/ui/pdf-viewer';
import {
  SiDownloadIcon,
  SiLoaderCircleIcon,
  SiPrinterIcon,
} from '@semantic-icons/lucide-icons';

/**
 * A fillable form: the total is computed by the document's own script, and
 * Download / Print include what was typed in.
 */
@Component({
  selector: 'app-pdf-viewer-form-demo',
  imports: [
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerSpacer,
    ScPdfViewerPrint,
    ScPdfViewerDownload,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScPdfViewerPrintProgress,
    ScPdfViewerDialog,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogClose,
    ScProgress,
    ScButton,
    ScTooltipTrigger,
    ScSpinner,
    SiDownloadIcon,
    SiLoaderCircleIcon,
    SiPrinterIcon,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/order-form.pdf"
      fileName="order-form"
      initialZoom="page-width"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar aria-label="Order form" class="py-1.5">
          <span class="text-sm font-medium">Order form</span>
          <div scPdfViewerSpacer></div>
          <button scPdfViewerPrint [scTooltipTrigger]="'Print'">
            <svg siPrinterIcon></svg>
            <span class="sr-only">Print</span>
          </button>
          <button
            scPdfViewerDownload
            [scTooltipTrigger]="'Download with your answers'"
          >
            <svg siDownloadIcon></svg>
            <span class="sr-only">Download with your answers</span>
          </button>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon></svg>
            Loading the form…
          </div>
          <div scPdfViewerCanvas></div>
        </div>
        <div scDialogProvider scPdfViewerDialog="print">
          <ng-template scDialogPortal>
            <div scDialog class="sm:w-sm">
              <div scDialogHeader>
                <h2 scDialogTitle>Preparing to print</h2>
                <p scDialogDescription>
                  {{ viewer.printProgress() }}% of the pages ready
                </p>
              </div>
              <div
                scProgress
                scPdfViewerPrintProgress
                aria-label="Print preparation"
              ></div>
              <div scDialogFooter>
                <button scButton scDialogClose variant="outline">Cancel</button>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerFormDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
