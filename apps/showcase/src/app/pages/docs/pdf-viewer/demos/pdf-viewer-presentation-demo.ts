import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import {
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerLoading,
  ScPdfViewerPageInfo,
  ScPdfViewerRoot,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerViewOptions,
} from '@semantic-components/pdf-viewer';
import {
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSpinner,
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
    ScPdfViewerRoot,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerPageInfo,
    ScPdfViewerSpacer,
    ScPdfViewerViewOptions,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerCanvas,
    ScButton,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
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
      [title]="'handbook'"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div scPdfViewerToolbar class="py-1.5">
          <div scPdfViewerPageInfo></div>
          <div scPopoverProvider side="bottom" align="start">
            <button
              scButton
              scPopoverTrigger
              variant="ghost"
              size="icon"
              aria-label="View options"
              [scTooltipTrigger]="'View options'"
            >
              <svg siBookOpenIcon></svg>
            </button>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto">
                <sc-pdf-viewer-view-options />
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
