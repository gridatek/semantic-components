import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PdfViewerReadingDemo } from './pdf-viewer-reading-demo';

@Component({
  selector: 'app-pdf-viewer-reading-demo-container',
  imports: [DemoContainer, PdfViewerReadingDemo],
  template: `
    <app-demo-container
      title="Read the handbook"
      demoUrl="/demos/pdf-viewer/pdf-viewer-reading-demo"
      [code]="code"
    >
      <app-pdf-viewer-reading-demo class="h-[600px]" />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerReadingDemoContainer {
  readonly code = `import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  ScInput,
  ScSpinner,
  ScSwitch,
  ScSwitchField,
  ScToggleGroup,
  ScToggleGroupItem,
  ScTooltipTrigger,
  cn,
} from '@semantic-components/ui';
import {
  type ScPdfPageColors,
  ScPdfViewer,
  ScPdfViewerBack,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerForward,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerPageInput,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
} from '@semantic-components/ui/pdf-viewer';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/** Your reading modes: the pages' text and lines, on a background. */
const READING_MODES: Record<string, ScPdfPageColors | null> = {
  default: null,
  sepia: { foreground: '#5b4636', background: '#f4ecd8' },
  dark: { foreground: '#e4e4e7', background: '#18181b' },
};

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
    ScSwitchField,
    ScToggleGroup,
    ScToggleGroupItem,
    ScTooltipTrigger,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scPdfViewer
      class="size-full"
      src="/pdf/handbook.pdf"
      fileName="handbook"
      [pageColors]="pageColors()"
      [caretBrowsing]="caretBrowsing()"
      #viewer="scPdfViewer"
    >
      <div scPdfViewerContainer class="flex size-full flex-col">
        <div
          scPdfViewerToolbar
          aria-label="Reading"
          class="flex-wrap gap-y-1.5 py-1.5"
        >
          <div scPdfViewerNav aria-label="History">
            <button scPdfViewerBack [scTooltipTrigger]="'Back'">
              <svg siArrowLeftIcon></svg>
              <span class="sr-only">Back</span>
            </button>
            <button scPdfViewerForward [scTooltipTrigger]="'Forward'">
              <svg siArrowRightIcon></svg>
              <span class="sr-only">Forward</span>
            </button>
          </div>
          <input scInput scPdfViewerPageInput aria-label="Page" />
          <span class="text-muted-foreground text-sm">
            ({{ viewer.currentPage() }} of {{ viewer.totalPages() }})
          </span>
          <div scPdfViewerSpacer></div>
          <div
            scToggleGroup
            type="single"
            variant="outline"
            size="sm"
            aria-label="Page colours"
            [value]="readingMode()"
            (valueChange)="setReadingMode($event)"
          >
            <button scToggleGroupItem value="default">Default</button>
            <button scToggleGroupItem value="sepia">Sepia</button>
            <button scToggleGroupItem value="dark">Dark</button>
          </div>
          <label scSwitchField class="text-sm">
            Caret browsing
            <input
              type="checkbox"
              scSwitch
              [checked]="caretBrowsing()"
              (change)="setCaretBrowsing($event)"
            />
          </label>
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
export class PdfViewerReadingDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );

  protected readonly readingMode = signal('default');
  protected readonly pageColors = computed(
    () => READING_MODES[this.readingMode()] ?? null,
  );
  /** Turn on with the browser's caret browsing (F7). */
  protected readonly caretBrowsing = signal(false);

  protected setReadingMode(value: unknown): void {
    const [mode] = Array.isArray(value) ? value : [value];
    if (typeof mode === 'string' && mode in READING_MODES) {
      this.readingMode.set(mode);
    }
  }

  protected setCaretBrowsing(event: Event): void {
    this.caretBrowsing.set((event.target as HTMLInputElement).checked);
  }
}`;
}
