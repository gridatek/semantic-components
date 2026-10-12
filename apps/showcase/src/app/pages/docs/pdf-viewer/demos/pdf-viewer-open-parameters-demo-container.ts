import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerOpenParametersDemo } from './pdf-viewer-open-parameters-demo';

@Component({
  selector: 'app-pdf-viewer-open-parameters-demo-container',
  imports: [DemoContainer, PdfViewerOpenParametersDemo],
  template: `
    <app-demo-container
      title="Open parameters and page labels"
      demoUrl="/demos/pdf-viewer/pdf-viewer-open-parameters-demo"
      [code]="code"
    >
      <app-pdf-viewer-open-parameters-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerOpenParametersDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerLoading,
  ScPdfViewerPageInfo,
  ScPdfViewerRoot,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/pdf-viewer';
import { ScButton, ScSpinner, cn } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/**
 * pdf.js's open parameters: in the fragment of \`src\` (applied on load), or
 * later with \`applyHash\`. The page field shows the document's page labels.
 */
@Component({
  selector: 'app-pdf-viewer-open-parameters-demo',
  imports: [
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerPageInfo,
    ScPdfViewerSpacer,
    ScPdfViewerFindResultsInfo,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScButton,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf#nameddest=chapter-2"
      [title]="'handbook'"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar class="flex-wrap py-1.5">
          <div scPdfViewerPageInfo></div>
          <div scPdfViewerSpacer></div>
          <button
            scButton
            variant="outline"
            size="sm"
            (click)="viewer.applyHash('page=3&zoom=auto,0,420')"
          >
            #page=3&amp;zoom=auto,0,420
          </button>
          <button
            scButton
            variant="outline"
            size="sm"
            (click)="viewer.applyHash('chapter-2')"
          >
            #chapter-2
          </button>
          <button
            scButton
            variant="outline"
            size="sm"
            (click)="viewer.applyHash('search=Configuration')"
          >
            #search=Configuration
          </button>
          <span scPdfViewerFindResultsInfo class="text-sm"></span>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon class="size-6"></svg>
          </div>
          <sc-pdf-viewer-canvas />
        </div>
      </div>
    </div>
  \`,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerOpenParametersDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}`;
}
