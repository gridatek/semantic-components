import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerNextFormDemo } from './pdf-viewer-next-form-demo';

@Component({
  selector: 'app-pdf-viewer-next-form-demo-container',
  imports: [DemoContainer, PdfViewerNextFormDemo],
  template: `
    <app-demo-container
      title="Order form with a script"
      demoUrl="/demos/pdf-viewer-next/pdf-viewer-next-form-demo"
      [code]="code"
    >
      <app-pdf-viewer-next-form-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextFormDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
  ScSpinner,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  ScPdfViewerNext,
  ScPdfViewerNextCanvas,
  ScPdfViewerNextContainer,
  ScPdfViewerNextContent,
  ScPdfViewerNextDialog,
  ScPdfViewerNextDownload,
  ScPdfViewerNextLoading,
  ScPdfViewerNextPrint,
  ScPdfViewerNextPrintProgress,
  ScPdfViewerNextSpacer,
  ScPdfViewerNextToolbar,
} from '@semantic-components/ui/pdf-viewer-next';
import {
  SiDownloadIcon,
  SiLoaderCircleIcon,
  SiPrinterIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/**
 * A fillable form: the total is computed by the document's own script, and
 * Download / Print include what was typed in.
 */
@Component({
  selector: 'app-pdf-viewer-next-form-demo',
  imports: [
    ScPdfViewerNext,
    ScPdfViewerNextContainer,
    ScPdfViewerNextToolbar,
    ScPdfViewerNextSpacer,
    ScPdfViewerNextPrint,
    ScPdfViewerNextDownload,
    ScPdfViewerNextContent,
    ScPdfViewerNextLoading,
    ScPdfViewerNextCanvas,
    ScPdfViewerNextPrintProgress,
    ScPdfViewerNextDialog,
    ScDialogProvider,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogClose,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    ScSpinner,
    SiDownloadIcon,
    SiLoaderCircleIcon,
    SiPrinterIcon,
  ],
  template: \`
    <div
      scPdfViewerNext
      class="size-full"
      src="/pdf/order-form.pdf"
      fileName="order-form"
      initialZoom="page-width"
      #viewer="scPdfViewerNext"
    >
      <div scPdfViewerNextContainer class="flex size-full flex-col">
        <div scPdfViewerNextToolbar aria-label="Order form" class="py-1.5">
          <span class="text-sm font-medium">Order form</span>
          <div scPdfViewerNextSpacer></div>
          <div scTooltipProvider>
            <button scPdfViewerNextPrint scTooltipTrigger>
              <svg siPrinterIcon></svg>
              <span class="sr-only">Print</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>Print<span scTooltipArrow></span></div>
            </ng-template>
          </div>
          <div scTooltipProvider>
            <button scPdfViewerNextDownload scTooltipTrigger>
              <svg siDownloadIcon></svg>
              <span class="sr-only">Download with your answers</span>
            </button>
            <ng-template scTooltipPortal>
              <div scTooltip>
                Download with your answers<span scTooltipArrow></span>
              </div>
            </ng-template>
          </div>
        </div>
        <div scPdfViewerNextContent>
          <div scPdfViewerNextLoading>
            <svg scSpinner siLoaderCircleIcon></svg>
            Loading the form…
          </div>
          <div scPdfViewerNextCanvas></div>
        </div>
        <div scDialogProvider scPdfViewerNextDialog="print">
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
                scPdfViewerNextPrintProgress
                aria-label="Print preparation"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
              <div scDialogFooter>
                <button scDialogClose variant="outline" size="default">
                  Cancel
                </button>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextFormDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}`;
}
