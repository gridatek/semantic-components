import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerNextOpenParametersDemo } from './pdf-viewer-next-open-parameters-demo';

@Component({
  selector: 'app-pdf-viewer-next-open-parameters-demo-container',
  imports: [DemoContainer, PdfViewerNextOpenParametersDemo],
  template: `
    <app-demo-container
      title="Open parameters and page labels"
      demoUrl="/demos/pdf-viewer-next/pdf-viewer-next-open-parameters-demo"
      [code]="code"
    >
      <app-pdf-viewer-next-open-parameters-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextOpenParametersDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { ScButton, ScInput, ScSpinner } from '@semantic-components/ui';
import {
  ScPdfViewerNext,
  ScPdfViewerNextCanvas,
  ScPdfViewerNextContainer,
  ScPdfViewerNextContent,
  ScPdfViewerNextFindResultsInfo,
  ScPdfViewerNextLoading,
  ScPdfViewerNextPageInput,
  ScPdfViewerNextSpacer,
  ScPdfViewerNextToolbar,
} from '@semantic-components/ui/pdf-viewer-next';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/**
 * pdf.js's open parameters: in the fragment of \`src\` (applied on load), or
 * later with \`applyHash\`. The page field shows the document's page labels.
 */
@Component({
  selector: 'app-pdf-viewer-next-open-parameters-demo',
  imports: [
    ScPdfViewerNext,
    ScPdfViewerNextContainer,
    ScPdfViewerNextToolbar,
    ScPdfViewerNextPageInput,
    ScPdfViewerNextSpacer,
    ScPdfViewerNextFindResultsInfo,
    ScPdfViewerNextContent,
    ScPdfViewerNextLoading,
    ScPdfViewerNextCanvas,
    ScButton,
    ScInput,
    ScSpinner,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scPdfViewerNext
      class="size-full"
      src="/pdf/handbook.pdf#nameddest=chapter-2"
      fileName="handbook"
      #viewer="scPdfViewerNext"
    >
      <div scPdfViewerNextContainer class="flex size-full flex-col">
        <div
          scPdfViewerNextToolbar
          aria-label="Handbook"
          class="flex-wrap py-1.5"
        >
          <input scInput scPdfViewerNextPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm" data-testid="page-count">
            @if (viewer.pageLabels()) {
              ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
            } @else {
              / {{ viewer.totalPages() }}
            }
          </span>
          <div scPdfViewerNextSpacer></div>
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
          <span scPdfViewerNextFindResultsInfo>
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
        <div scPdfViewerNextContent>
          <div scPdfViewerNextLoading>
            <svg scSpinner siLoaderCircleIcon></svg>
            Loading the handbook…
          </div>
          <div scPdfViewerNextCanvas></div>
        </div>
      </div>
    </div>
  \`,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextOpenParametersDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}`;
}
