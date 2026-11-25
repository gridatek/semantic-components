import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScField,
  ScInput,
  ScSpinner,
  ScSwitch,
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
  ScPdfViewerNextBack,
  ScPdfViewerNextCanvas,
  ScPdfViewerNextContainer,
  ScPdfViewerNextContent,
  ScPdfViewerNextForward,
  ScPdfViewerNextLoading,
  ScPdfViewerNextNav,
  ScPdfViewerNextPageInput,
  ScPdfViewerNextSetting,
  ScPdfViewerNextSpacer,
  ScPdfViewerNextToolbar,
} from '@semantic-components/ui/pdf-viewer-next';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/** Your reading modes: the pages' text and lines, on a background. */

/**
 * Reading: Back / Forward after jumping to a page, page colours (a reading
 * mode — high contrast mode applies its own), caret browsing.
 */
@Component({
  selector: 'app-pdf-viewer-next-reading-demo',
  imports: [
    ScPdfViewerNext,
    ScPdfViewerNextContainer,
    ScPdfViewerNextToolbar,
    ScPdfViewerNextNav,
    ScPdfViewerNextBack,
    ScPdfViewerNextForward,
    ScPdfViewerNextPageInput,
    ScPdfViewerNextSpacer,
    ScPdfViewerNextContent,
    ScPdfViewerNextLoading,
    ScPdfViewerNextCanvas,
    ScInput,
    ScSpinner,
    ScSwitch,
    ScToggleGroup,
    ScToggleGroupItem,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiLoaderCircleIcon,
    ScField,
    ScPdfViewerNextSetting,
  ],
  template: `
    <div
      scPdfViewerNext
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      #viewer="scPdfViewerNext"
    >
      <div scPdfViewerNextContainer class="flex size-full flex-col">
        <div
          scPdfViewerNextToolbar
          aria-label="Reading"
          class="flex-wrap gap-y-1.5 py-1.5"
        >
          <div scPdfViewerNextNav aria-label="History">
            <div scTooltipProvider>
              <button scPdfViewerNextBack scTooltipTrigger>
                <svg siArrowLeftIcon></svg>
                <span class="sr-only">Back</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Back<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider>
              <button scPdfViewerNextForward scTooltipTrigger>
                <svg siArrowRightIcon></svg>
                <span class="sr-only">Forward</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Forward<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <input scInput scPdfViewerNextPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
          </span>
          <div scPdfViewerNextSpacer></div>
          <div
            scToggleGroup
            variant="outline"
            size="sm"
            aria-label="Page colours"
            scPdfViewerNextSetting="pageColors"
          >
            <button scToggleGroupItem value="">Default</button>
            <button scToggleGroupItem value="sepia">Sepia</button>
            <button scToggleGroupItem value="dark">Dark</button>
          </div>
          <label scField orientation="horizontal" class="text-sm">
            Caret browsing
            <input scSwitch scPdfViewerNextSetting="caretBrowsing" />
          </label>
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
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerNextReadingDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
