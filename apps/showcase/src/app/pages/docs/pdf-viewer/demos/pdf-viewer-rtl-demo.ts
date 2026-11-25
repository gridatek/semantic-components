import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  ScEmpty,
  ScEmptyBody,
  ScEmptyHeader,
  ScEmptyTitle,
  ScInput,
} from '@semantic-components/ui';
import {
  ScPdfViewer,
  ScPdfViewerCanvas,
  ScPdfViewerContainer,
  ScPdfViewerContent,
  ScPdfViewerDownload,
  ScPdfViewerError,
  ScPdfViewerFindInput,
  ScPdfViewerFindNext,
  ScPdfViewerFindPrevious,
  ScPdfViewerFindResultsInfo,
  ScPdfViewerFindToggle,
  ScPdfViewerFindbar,
  ScPdfViewerLoading,
  ScPdfViewerNav,
  ScPdfViewerNextPage,
  ScPdfViewerPageInput,
  ScPdfViewerPrevPage,
  ScPdfViewerRetry,
  ScPdfViewerSpacer,
  ScPdfViewerToolbar,
  ScPdfViewerZoom,
  ScPdfViewerZoomIn,
  ScPdfViewerZoomOut,
} from '@semantic-components/ui/pdf-viewer';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiDownloadIcon,
  SiSearchIcon,
  SiZoomInIcon,
  SiZoomOutIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

/**
 * Right to left: the toolbar and the find bar from the right, in Arabic;
 * the pages stay as the document has them.
 */
@Component({
  selector: 'app-pdf-viewer-rtl-demo',
  imports: [
    Dir,
    ScPdfViewer,
    ScPdfViewerContainer,
    ScPdfViewerToolbar,
    ScPdfViewerNav,
    ScPdfViewerPrevPage,
    ScPdfViewerNextPage,
    ScPdfViewerPageInput,
    ScPdfViewerSpacer,
    ScPdfViewerFindToggle,
    ScPdfViewerFindbar,
    ScPdfViewerFindInput,
    ScPdfViewerFindPrevious,
    ScPdfViewerFindNext,
    ScPdfViewerFindResultsInfo,
    ScPdfViewerZoom,
    ScPdfViewerZoomOut,
    ScPdfViewerZoomIn,
    ScPdfViewerDownload,
    ScPdfViewerContent,
    ScPdfViewerLoading,
    ScPdfViewerError,
    ScPdfViewerRetry,
    ScPdfViewerCanvas,
    ScEmpty,
    ScEmptyHeader,
    ScEmptyTitle,
    ScEmptyBody,
    ScInput,
    SiChevronUpIcon,
    SiChevronDownIcon,
    SiSearchIcon,
    SiZoomOutIcon,
    SiZoomInIcon,
    SiDownloadIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="size-full">
      <div
        scPdfViewer
        class="size-full"
        src="/pdf/handbook.pdf"
        fileName="handbook"
        #viewer="scPdfViewer"
      >
        <div scPdfViewerContainer class="size-full">
          <div scPdfViewerToolbar aria-label="الدليل">
            <div scPdfViewerNav aria-label="الصفحات">
              <button scPdfViewerPrevPage>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">الصفحة السابقة</span>
              </button>
              <button scPdfViewerNextPage>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">الصفحة التالية</span>
              </button>
            </div>
            <input scInput scPdfViewerPageInput aria-label="الصفحة" />
            <span class="text-muted-foreground text-sm">
              ({{ viewer.currentPage() }} من {{ viewer.totalPages() }})
            </span>
            <div scPdfViewerSpacer></div>
            <button scPdfViewerFindToggle>
              <svg siSearchIcon></svg>
              <span class="sr-only">البحث في المستند</span>
            </button>
            <div scPdfViewerZoom aria-label="التكبير">
              <button scPdfViewerZoomOut>
                <svg siZoomOutIcon></svg>
                <span class="sr-only">تصغير</span>
              </button>
              <button scPdfViewerZoomIn>
                <svg siZoomInIcon></svg>
                <span class="sr-only">تكبير</span>
              </button>
            </div>
            <button scPdfViewerDownload>
              <svg siDownloadIcon></svg>
              <span class="sr-only">تنزيل</span>
            </button>
          </div>
          @if (viewer.findOpen()) {
            <div scPdfViewerFindbar>
              <input
                scInput
                scPdfViewerFindInput
                aria-label="البحث في المستند"
                placeholder="البحث في المستند…"
                class="w-56"
              />
              <button scPdfViewerFindPrevious>
                <svg siChevronUpIcon></svg>
                <span class="sr-only">النتيجة السابقة</span>
              </button>
              <button scPdfViewerFindNext>
                <svg siChevronDownIcon></svg>
                <span class="sr-only">النتيجة التالية</span>
              </button>
              <span scPdfViewerFindResultsInfo>
                @switch (viewer.findState()) {
                  @case ('not-found') {
                    لم يتم العثور على العبارة
                  }
                  @case ('pending') {
                    جارٍ البحث…
                  }
                  @default {
                    @if (viewer.findTotalMatches()) {
                      {{ viewer.findCurrentMatchIndex() + 1 }} من
                      {{ viewer.findTotalMatches() }}
                    }
                  }
                }
              </span>
            </div>
          }
          <div scPdfViewerContent>
            <div scPdfViewerLoading>جارٍ تحميل الدليل…</div>
            <div scEmpty scPdfViewerError>
              <div scEmptyHeader>
                <div scEmptyTitle>تعذّر فتح المستند</div>
              </div>
              <div scEmptyBody>
                <button scPdfViewerRetry>إعادة المحاولة</button>
              </div>
            </div>
            <div scPdfViewerCanvas></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class PdfViewerRtlDemo {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly class = computed(() =>
    cn('block h-dvh w-full', this.classInput()),
  );
}
