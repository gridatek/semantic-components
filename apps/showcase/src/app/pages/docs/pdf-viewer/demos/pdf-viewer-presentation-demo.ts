import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScPdfViewer,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerLoading,
  ScPdfViewerPageInput,
  ScPdfViewerSetting,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/pdf-viewer';
import {
  ScButton,
  ScInput,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
  ScToggleGroup,
  ScToggleGroupItem,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
import {
  SiBookOpenIcon,
  SiLoaderCircleIcon,
  SiPresentationIcon,
} from '@semantic-icons/lucide-icons';

/**
 * Presentation mode, and the view options it overrides while it's on
 * (scroll mode, spreads, cursor).
 */
@Component({
  selector: 'app-pdf-viewer-presentation-demo',
  imports: [
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerPageInput,
    ScPdfViewerSpacer,
    ScPdfViewerSetting,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScButton,
    ScInput,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScToggleGroup,
    ScToggleGroupItem,
    ScTooltipTrigger,
    ScSpinner,
    SiBookOpenIcon,
    SiLoaderCircleIcon,
    SiPresentationIcon,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar aria-label="Handbook" class="py-1.5">
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            @if (viewer.pageLabels()) {
              ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
            } @else {
              / {{ viewer.totalPages() }}
            }
          </span>
          <div scPopoverProvider side="bottom" align="start">
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              [scTooltipTrigger]="'View options'"
            >
              <svg siBookOpenIcon></svg>
              <span class="sr-only">View options</span>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto gap-4">
                <div class="grid gap-2">
                  <p
                    id="presentation-demo-scrolling"
                    class="text-muted-foreground text-xs font-medium"
                  >
                    Scrolling
                  </p>
                  <div
                    scToggleGroup
                    scPdfViewerSetting="scrollMode"
                    type="single"
                    variant="outline"
                    size="sm"
                    aria-labelledby="presentation-demo-scrolling"
                  >
                    <button scToggleGroupItem value="page">Page</button>
                    <button scToggleGroupItem value="vertical">Vertical</button>
                    <button scToggleGroupItem value="horizontal">
                      Horizontal
                    </button>
                    <button scToggleGroupItem value="wrapped">Wrapped</button>
                  </div>
                </div>
                <div class="grid gap-2">
                  <p
                    id="presentation-demo-spreads"
                    class="text-muted-foreground text-xs font-medium"
                  >
                    Spreads
                  </p>
                  <div
                    scToggleGroup
                    scPdfViewerSetting="spreadMode"
                    type="single"
                    variant="outline"
                    size="sm"
                    aria-labelledby="presentation-demo-spreads"
                  >
                    <button scToggleGroupItem value="none">None</button>
                    <button scToggleGroupItem value="odd">Odd</button>
                    <button scToggleGroupItem value="even">Even</button>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
          <div scPdfViewerSpacer></div>
          <button
            scButton
            size="sm"
            [disabled]="!viewer.pdfDocument()"
            (click)="viewer.togglePresentation()"
          >
            <svg siPresentationIcon></svg>
            Present
          </button>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon class="size-6"></svg>
            Loading the handbook…
          </div>
          <sc-pdf-viewer-canvas />
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerPresentationDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
