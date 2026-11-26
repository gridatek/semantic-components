import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  injectFormatNumber,
} from '@semantic-components/ui';
import {
  ScCarousel,
  ScCarouselItem,
  ScCarouselNext,
  ScCarouselPrevious,
  ScCarouselTrack,
  ScCarouselViewport,
} from '@semantic-components/ui/carousel';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the slides run from the right, the buttons and their icons mirrored, ← goes on. */
@Component({
  selector: 'app-rtl-carousel-demo',
  imports: [
    Dir,
    ScCarousel,
    ScCarouselItem,
    ScCarouselNext,
    ScCarouselPrevious,
    ScCarouselTrack,
    ScCarouselViewport,
    ScCard,
    ScCardBody,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div
        scCarousel
        aria-roledescription="عرض شرائح"
        aria-label="أرقام"
        class="w-full max-w-[12rem] sm:max-w-xs"
      >
        <div scCarouselViewport>
          <div scCarouselTrack>
            @for (n of slides; track n) {
              <div
                scCarouselItem
                #slide="scCarouselItem"
                aria-roledescription="شريحة"
                [attr.aria-label]="
                  formatNumber(slide.index() + 1) +
                  ' من ' +
                  formatNumber(slide.count())
                "
              >
                <div class="p-1">
                  <div scCard>
                    <div
                      scCardBody
                      class="flex aspect-square items-center justify-center p-6"
                    >
                      <span class="text-4xl font-semibold">{{
                        formatNumber(n)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <button scCarouselPrevious>
          <svg siChevronLeftIcon></svg>
          <span class="sr-only">الشريحة السابقة</span>
        </button>
        <button scCarouselNext>
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
export class RtlCarouselDemo {
  private readonly slides = [1, 2, 3, 4, 5];
  // In the user's digits: Latin or Arabic-Indic, whichever they chose.
  private readonly formatNumber = injectFormatNumber();
}
