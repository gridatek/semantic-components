import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardBody } from '@semantic-components/ui';
import {
  ScCarouselNew,
  ScCarouselNewItem,
  ScCarouselNewNext,
  ScCarouselNewPrevious,
  ScCarouselNewTrack,
  ScCarouselNewViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the slides run from the right, the buttons and their icons mirrored, ← goes on. */
@Component({
  selector: 'app-rtl-carousel-new-demo',
  imports: [
    Dir,
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div
        scCarouselNew
        aria-roledescription="عرض شرائح"
        aria-label="أرقام"
        class="w-full max-w-[12rem] sm:max-w-xs"
      >
        <div scCarouselNewViewport>
          <div scCarouselNewTrack>
            @for (n of slides; track n) {
              <div
                scCarouselNewItem
                #slide="scCarouselNewItem"
                aria-roledescription="شريحة"
                [attr.aria-label]="slide.index() + 1 + ' من ' + slide.count()"
              >
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardBody
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
        <button scCarouselNewPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">الشريحة السابقة</span>
        </button>
        <button scCarouselNewNext>
          <svg siChevronRightIcon></svg>
          <span class="sr-only">الشريحة التالية</span>
        </button>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCarouselNewDemo {
  private readonly slides = ['١', '٢', '٣', '٤', '٥'];
}
