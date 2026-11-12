import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent } from '@semantic-components/ui';
import {
  ScCarouselNext,
  ScCarouselNextItem,
  ScCarouselNextNext,
  ScCarouselNextPrevious,
  ScCarouselNextTrack,
  ScCarouselNextViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the slides run from the right, the buttons and their icons mirrored, ← goes on. */
@Component({
  selector: 'app-rtl-carousel-next-demo',
  imports: [
    ScCarouselNext,
    ScCarouselNextItem,
    ScCarouselNextNext,
    ScCarouselNextPrevious,
    ScCarouselNextTrack,
    ScCarouselNextViewport,
    ScCard,
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div
        scCarouselNext
        aria-roledescription="عرض شرائح"
        aria-label="أرقام"
        class="w-full max-w-[12rem] sm:max-w-xs"
      >
        <div scCarouselNextViewport>
          <div scCarouselNextTrack>
            @for (n of slides; track n) {
              <div
                scCarouselNextItem
                #slide="scCarouselNextItem"
                aria-roledescription="شريحة"
                [attr.aria-label]="slide.index() + 1 + ' من ' + slide.count()"
              >
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardContent
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <span class="text-4xl font-semibold">{{ n }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <button scCarouselNextPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">الشريحة السابقة</span>
        </button>
        <button scCarouselNextNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">الشريحة التالية</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCarouselNextDemo {
  readonly slides = ['١', '٢', '٣', '٤', '٥'];
}
