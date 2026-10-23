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
import { ScButton, ScInput, ScSpinner, cn } from '@semantic-components/ui';
import {
  ScPdfViewer,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerLoading,
  ScPdfViewerPageInput,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/ui/pdf-viewer';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/**
 * pdf.js's open parameters: in the fragment of \`src\` (applied on load), or
 * later with \`applyHash\`. The page field shows the document's page labels.
 */
@Component({
  selector: 'app-pdf-viewer-open-parameters-demo',
  imports: [
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerPageInput,
    ScPdfViewerSpacer,
    ScPdfViewerFindResultsInfo,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScButton,
    ScInput,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf#nameddest=chapter-2"
      fileName="handbook"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar aria-label="Handbook" class="flex-wrap py-1.5">
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm" data-testid="page-count">
            @if (viewer.pageLabels()) {
              ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
            } @else {
              / {{ viewer.totalPages() }}
            }
          </span>
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
          <span scPdfViewerFindResultsInfo>
            @switch (viewer.findState()) {
              @case ('not-found') {
                Phrase not found
              }
              @case ('pending') {
                Searching…
              }
              @default {
                @if (viewer.findTotalMatches()) {
                  {{ viewer.findCurrentMatchIndex() + 1 }} of
                  {{ viewer.findTotalMatches() }}
                }
              }
            }
          </span>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon></svg>
            Loading the handbook…
          </div>
          <div scPdfViewerCanvas></div>
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
