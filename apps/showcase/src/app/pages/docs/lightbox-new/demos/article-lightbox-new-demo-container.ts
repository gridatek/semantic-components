import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ArticleLightboxNewDemo } from './article-lightbox-new-demo';

@Component({
  selector: 'app-article-lightbox-new-demo-container',
  imports: [DemoContainer, ArticleLightboxNewDemo],
  template: `
    <app-demo-container
      title="Article"
      [code]="code"
      demoUrl="/demos/lightbox-new/article-lightbox-new-demo"
    >
      <app-article-lightbox-new-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleLightboxNewDemoContainer {
  private readonly code = `import { A11yModule } from '@angular/cdk/a11y';
import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** Photos in an article: each opens the dialog at its own, and the carousel goes through all of the article’s. */
@Component({
  selector: 'app-article-lightbox-new-demo',
  imports: [
    A11yModule,
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
  template: \`
    <div scDialogProvider [(open)]="open">
      <article class="w-full max-w-prose text-sm leading-relaxed">
        <button
          type="button"
          scFrame
          size="sm"
          class="focus-visible:ring-ring/50 float-end ms-4 mb-2 block w-40 overflow-hidden outline-none focus-visible:ring-[3px]"
          (click)="show(0)"
        >
          <div scAspectRatio [ratio]="3 / 2">
            <img
              [ngSrc]="photos[0].thumb"
              fill
              priority
              sizes="(min-width: 640px) 10vw, 30vw"
              [alt]="photos[0].alt"
              class="object-cover"
            />
          </div>
        </button>
        <p class="mb-3">
          The café opens at eight. By nine the long table fills with people who
          came for one coffee and stay for three. Light comes in from the street
          side, so the best seats are by the window.
        </p>
        <button
          type="button"
          scFrame
          size="sm"
          class="focus-visible:ring-ring/50 float-start me-4 mb-2 block w-40 overflow-hidden outline-none focus-visible:ring-[3px]"
          (click)="show(1)"
        >
          <div scAspectRatio [ratio]="3 / 2">
            <img
              [ngSrc]="photos[1].thumb"
              fill
              sizes="(min-width: 640px) 10vw, 30vw"
              [alt]="photos[1].alt"
              class="object-cover"
            />
          </div>
        </button>
        <p class="mb-3">
          In the afternoon we walked down to the coast, where the rocks run out
          into the water and the wind never quite stops.
        </p>
        <button
          type="button"
          scFrame
          size="sm"
          class="focus-visible:ring-ring/50 float-end ms-4 mb-2 block w-40 overflow-hidden outline-none focus-visible:ring-[3px]"
          (click)="show(2)"
        >
          <div scAspectRatio [ratio]="3 / 2">
            <img
              [ngSrc]="photos[2].thumb"
              fill
              sizes="(min-width: 640px) 10vw, 30vw"
              [alt]="photos[2].alt"
              class="object-cover"
            />
          </div>
        </button>
        <p>
          The way back went through the forest: an hour of shade, a path soft
          with needles, and nobody else on it.
        </p>
      </article>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-3xl">
          <button scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>A day out</h2>
          </div>
          <div
            scCarouselNew
            [(page)]="index"
            aria-roledescription="carousel"
            aria-label="Photos"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack>
                @for (photo of photos; track photo.src) {
                  <div
                    scCarouselNewItem
                    #slide="scCarouselNewItem"
                    aria-roledescription="slide"
                    [attr.aria-label]="
                      slide.index() + 1 + ' of ' + slide.count()
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
              <span class="sr-only">Previous photo</span>
            </button>
            <button
              scCarouselNewNext
              variant="secondary"
              class="end-2"
              cdkFocusInitial
            >
              <svg siChevronRightIcon></svg>
              <span class="sr-only">Next photo</span>
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
            aria-roledescription="carousel"
            aria-label="Thumbnails"
          >
            <div scCarouselNewViewport>
              <div scCarouselNewTrack class="-ms-2">
                @for (photo of photos; track photo.src; let i = $index) {
                  <div
                    scCarouselNewItem
                    #thumb="scCarouselNewItem"
                    class="basis-1/4 ps-2 sm:basis-1/6"
                    aria-roledescription="slide"
                    [attr.aria-label]="
                      thumb.index() + 1 + ' of ' + thumb.count()
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleLightboxNewDemo {
  private readonly open = signal(false);
  /** The photo shown: the carousel's page. */
  private readonly index = signal(0);
  private readonly photos = [
    ['cafe', 'A street cafe'],
    ['coast', 'A rocky coast'],
    ['forest', 'A forest path'],
  ].map(([name, alt]) => ({
    src: \`/images/gallery/\${name}.jpg\`,
    thumb: \`/images/gallery/\${name}-thumb.jpg\`,
    alt,
  }));

  private show(index: number): void {
    this.index.set(index);
    this.open.set(true);
  }
}`;
}
