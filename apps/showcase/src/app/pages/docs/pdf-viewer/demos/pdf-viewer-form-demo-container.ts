import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerFormDemo } from './pdf-viewer-form-demo';

@Component({
  selector: 'app-pdf-viewer-form-demo-container',
  imports: [DemoContainer, PdfViewerFormDemo],
  template: `
    <app-demo-container
      title="Forms"
      demoUrl="/demos/pdf-viewer/pdf-viewer-form-demo"
      [code]="code"
    >
      <app-pdf-viewer-form-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerFormDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerLoading,
  ScPdfViewerPrint,
  ScPdfViewerPrintProgress,
  ScPdfViewerRoot,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/pdf-viewer';
import {
  ScButton,
  ScSpinner,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
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
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerSpacer,
    ScPdfViewerPrint,
    ScPdfViewerDownload,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScPdfViewerPrintProgress,
    ScButton,
    ScTooltipTrigger,
    ScSpinner,
    SiDownloadIcon,
    SiLoaderCircleIcon,
    SiPrinterIcon,
  ],
  template: \`
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/order-form.pdf"
      [title]="'order-form'"
      initialZoom="page-width"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar class="py-1.5">
          <span class="text-sm font-medium">Order form</span>
          <div scPdfViewerSpacer></div>
          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerPrint
            [scTooltipTrigger]="'Print'"
          >
            <svg siPrinterIcon></svg>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon"
            scPdfViewerDownload
            [scTooltipTrigger]="'Download with your answers'"
          >
            <svg siDownloadIcon></svg>
          </button>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon class="size-6"></svg>
          </div>
          <sc-pdf-viewer-canvas />
        </div>
        <sc-pdf-viewer-print-progress />
      </div>
    </div>
  \`,
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
}`;
}
