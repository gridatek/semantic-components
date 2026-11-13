import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlCarouselDemo } from './rtl-carousel-demo';

@Component({
  selector: 'app-rtl-carousel-demo-container',
  imports: [DemoContainer, RtlCarouselDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/carousel/rtl-carousel-demo"
      [code]="code"
    >
      <app-rtl-carousel-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCarouselDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent } from '@semantic-components/ui';
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
    ScCardContent,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCarouselDemo {
  readonly slides = ['١', '٢', '٣', '٤', '٥'];
}`;
}
