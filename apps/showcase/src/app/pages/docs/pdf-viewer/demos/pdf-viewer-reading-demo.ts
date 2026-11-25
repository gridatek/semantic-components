import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScField,
  ScInput,
  ScSpinner,
  ScSwitch,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  ScPdfViewer,
  ScPdfViewerBack,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerForward,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerPageInput,
  ScPdfViewerSetting,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/ui/pdf-viewer';
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
  selector: 'app-pdf-viewer-reading-demo',
  imports: [
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerBack,
    ScPdfViewerForward,
    ScPdfViewerPageInput,
    ScPdfViewerSpacer,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScInput,
    ScSpinner,
    ScSwitch,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiLoaderCircleIcon,
    ScField,
    ScPdfViewerSetting,
  ],
  template: `
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="size-full">
        <div scPdfViewerToolbar aria-label="Reading" class="flex-wrap">
          <div scPdfViewerNav aria-label="History">
            <div scTooltipProvider>
              <button scPdfViewerBack scTooltipTrigger>
                <svg siArrowLeftIcon></svg>
                <span class="sr-only">Back</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Back<span scTooltipArrow></span></div>
              </ng-template>
            </div>
            <div scTooltipProvider>
              <button scPdfViewerForward scTooltipTrigger>
                <svg siArrowRightIcon></svg>
                <span class="sr-only">Forward</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Forward<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
          </span>
          <div scPdfViewerSpacer></div>
          <label scField orientation="horizontal">
            Reading colours
            <input scSwitch scPdfViewerSetting="pageColors" />
          </label>
          <label scField orientation="horizontal">
            Caret browsing
            <input scSwitch scPdfViewerSetting="caretBrowsing" />
          </label>
        </div>
        <div scPdfViewerContent>
          <div scPdfViewerLoading>
            <svg scSpinner siLoaderCircleIcon aria-label="Loading"></svg>
            Loading the handbook…
          </div>
          <div scPdfViewerCanvas></div>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerReadingDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
