import { A11yModule } from '@angular/cdk/a11y';
import { Dir } from '@angular/cdk/bidi';
import { NgOptimizedImage } from '@angular/common';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAspectRatio,
  ScDialog,
  ScDialogClose,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScFrame,
} from '@semantic-components/ui';
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
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the photos run from the right, ← goes on to the next, the buttons and their icons mirrored. */
@Component({
  selector: 'app-rtl-lightbox-new-demo',
  imports: [
    A11yModule,
    Dir,
    NgOptimizedImage,
    ScAspectRatio,
    ScDialog,
    ScDialogClose,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScFrame,
    ScCarouselNew,
    ScCarouselNewItem,
    ScCarouselNewNext,
    ScCarouselNewPrevious,
    ScCarouselNewTrack,
    ScCarouselNewViewport,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiXIcon,
  ],
  template: `
    <div scDialogProvider [(open)]="open" dir="rtl" lang="ar">
      <ul class="grid w-full max-w-md grid-cols-3 gap-2" aria-label="أماكن">
        @for (photo of photos; track photo.src; let i = $index) {
          <li>
            <button
              type="button"
              scFrame
              size="sm"
              class="focus-visible:ring-ring/50 block w-full overflow-hidden outline-none focus-visible:ring-[3px]"
              (click)="show(i)"
            >
              <div scAspectRatio [ratio]="1">
                <img
                  [ngSrc]="photo.thumb"
                  fill
                  [priority]="i < 3"
                  sizes="(min-width: 640px) 15vw, 30vw"
                  [alt]="photo.alt"
                  class="object-cover"
                />
              </div>
            </button>
          </li>
        }
      </ul>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-3xl">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">إغلاق</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>أماكن</h2>
          </div>
          <div
            scCarouselNew
            [(page)]="index"
            aria-roledescription="عرض شرائح"
            aria-label="الصور"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack>
                @for (photo of photos; track photo.src) {
                  <div
                    scCarouselNewItem
                    #slide="scCarouselNewItem"
                    aria-roledescription="شريحة"
                    [attr.aria-label]="
                      slide.index() + 1 + ' من ' + slide.count()
                    "
                  >
                    <figure class="space-y-2">
                      <div scAspectRatio scFrame [ratio]="3 / 2">
                        <img
                          [ngSrc]="photo.src"
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          [alt]="photo.alt"
                          class="object-cover"
                        />
                      </div>
                      <figcaption class="text-muted-foreground text-sm">
                        {{ photo.alt }}
                      </figcaption>
                    </figure>
                  </div>
                }
              </div>
            </div>
            <button scCarouselNewPrevious variant="secondary" class="start-2">
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">الصورة السابقة</span>
            </button>
            <button
              scCarouselNewNext
              variant="secondary"
              class="end-2"
              cdkFocusInitial
            >
              <svg siChevronRightIcon></svg>
              <span class="sr-only">الصورة التالية</span>
            </button>
          </div>
          <p
            class="text-muted-foreground text-sm tabular-nums"
            aria-hidden="true"
          >
            {{ index() + 1 }} / {{ photos.length }}
          </p>
          <div
            scCarouselNew
            #strip="scCarouselNew"
            [dragFree]="true"
            [page]="strip.pageOf(index())"
            aria-roledescription="عرض شرائح"
            aria-label="المصغرات"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack class="-ms-2">
                @for (photo of photos; track photo.src; let i = $index) {
                  <div
                    scCarouselNewItem
                    #thumb="scCarouselNewItem"
                    class="basis-1/5 ps-2 sm:basis-1/8"
                    aria-roledescription="شريحة"
                    [attr.aria-label]="
                      thumb.index() + 1 + ' من ' + thumb.count()
                    "
                  >
                    <button
                      type="button"
                      scFrame
                      size="sm"
                      class="focus-visible:ring-ring/50 block w-full overflow-hidden outline-none focus-visible:ring-[3px]"
                      [class.opacity-50]="index() !== i"
                      [attr.aria-current]="index() === i || null"
                      (click)="index.set(i)"
                    >
                      <div scAspectRatio [ratio]="1">
                        <img
                          [ngSrc]="photo.thumb"
                          fill
                          sizes="10vw"
                          alt=""
                          class="object-cover"
                        />
                      </div>
                      <span class="sr-only">{{ photo.alt }}</span>
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLightboxNewDemo {
  private readonly open = signal(false);
  /** The photo shown: the carousel's page. */
  private readonly index = signal(0);
  private readonly photos = [
    ['mountains', 'جبال تحت سماء صافية'],
    ['coast', 'ساحل صخري'],
    ['forest', 'درب في غابة'],
    ['gorge', 'نهر في وادٍ ضيق'],
    ['cafe', 'مقهى في شارع'],
    ['summit', 'قمة مغطاة بالثلج'],
  ].map(([name, alt]) => ({
    src: `/images/gallery/${name}.jpg`,
    thumb: `/images/gallery/${name}-thumb.jpg`,
    alt,
  }));

  private show(index: number): void {
    this.index.set(index);
    this.open.set(true);
  }
}
