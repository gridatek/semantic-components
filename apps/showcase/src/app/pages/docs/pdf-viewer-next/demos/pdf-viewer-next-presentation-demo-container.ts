import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerNextPresentationDemo } from './pdf-viewer-next-presentation-demo';

@Component({
  selector: 'app-pdf-viewer-next-presentation-demo-container',
  imports: [DemoContainer, PdfViewerNextPresentationDemo],
  template: `
    <app-demo-container
      title="Present the handbook"
      demoUrl="/demos/pdf-viewer-next/pdf-viewer-next-presentation-demo"
      [code]="code"
    >
      <app-pdf-viewer-next-presentation-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextPresentationDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, input } from '@angular/core';
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
  ScPdfViewerNextLoading,
  ScPdfViewerNextPageInput,
  ScPdfViewerNextSetting,
  ScPdfViewerNextSpacer,
  ScPdfViewerNextToolbar,
} from '@semantic-components/ui/pdf-viewer-next';
import {
  SiBookOpenIcon,
  SiLoaderCircleIcon,
  SiPresentationIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/**
 * Presentation mode, and the view options it overrides while it's on
 * (scroll mode, spreads, cursor).
 */
@Component({
  selector: 'app-pdf-viewer-next-presentation-demo',
  imports: [
    ScPdfViewerNext,
    ScPdfViewerNextContainer,
    ScPdfViewerNextToolbar,
    ScPdfViewerNextPageInput,
    ScPdfViewerNextSpacer,
    ScPdfViewerNextSetting,
    ScPdfViewerNextContent,
    ScPdfViewerNextLoading,
    ScPdfViewerNextCanvas,
    ScButton,
    ScInput,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
    ScToggleGroup,
    ScToggleGroupItem,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    ScSpinner,
    SiBookOpenIcon,
    SiLoaderCircleIcon,
    SiPresentationIcon,
  ],
  template: \`
    <div
      scPdfViewerNext
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      #viewer="scPdfViewerNext"
    >
      <div scPdfViewerNextContainer class="flex size-full flex-col">
        <div scPdfViewerNextToolbar aria-label="Handbook" class="py-1.5">
          <input scInput scPdfViewerNextPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            @if (viewer.pageLabels()) {
              ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
            } @else {
              / {{ viewer.totalPages() }}
            }
          </span>
          <div scPopoverProvider side="bottom" alignment="start">
            <div scTooltipProvider>
              <button
                scButton
                scPopoverTrigger
                variant="ghost"
                size="icon"
                scTooltipTrigger
              >
                <svg siBookOpenIcon></svg>
                <span class="sr-only">View options</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>View options<span scTooltipArrow></span></div>
              </ng-template>
            </div>
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
                    scPdfViewerNextSetting="scrollMode"
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
                    scPdfViewerNextSetting="spreadMode"
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
          <div scPdfViewerNextSpacer></div>
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
export class PdfViewerNextPresentationDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}`;
}
