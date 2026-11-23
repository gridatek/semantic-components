import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ArticleLightboxNewDemoContainer } from './demos/article-lightbox-new-demo-container';
import { LightboxNewUsageDemoContainer } from './demos/lightbox-new-usage-demo-container';
import { RtlLightboxNewDemoContainer } from './demos/rtl-lightbox-new-demo-container';

@Component({
  selector: 'app-lightbox-new-page',
  imports: [
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    Anatomy,
    TocHeading,
    LightboxNewUsageDemoContainer,
    ArticleLightboxNewDemoContainer,
    RtlLightboxNewDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Lightbox</h1>
        <p class="text-muted-foreground">
          A recipe: photos opened large — a
          <a scLink routerLink="/docs/components/dialog">Dialog</a>
          holding a
          <a scLink routerLink="/docs/components/carousel-new">Carousel</a>
          of them all. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-lightbox-new-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          Two signals are yours: whether it is open (the Dialog's
          <code scTypeset>[(open)]</code>) and the photo shown (the Carousel's
          <code scTypeset>[(page)]</code>). A thumbnail sets both; the Carousel
          starts on that page when the Dialog opens.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each photo is a slide: an aspect box with its image and a caption.
            Previous and Next sit on the photo (<code scTypeset>start-2</code>,
            <code scTypeset>end-2</code>, variant secondary).
          </li>
          <li>The counter (“3 / 6”) is the page, plus one.</li>
          <li>
            The thumbnails below are a second Carousel, drag free, following the
            photo: <code scTypeset>[page]="strip.pageOf(index())"</code>. Each
            is a button that sets the photo, the current one
            <code scTypeset>aria-current</code>.
          </li>
          <li>
            Swipes, drags and the keys come from the Carousel; Escape, the
            backdrop and focus from the Dialog.
          </li>
        </ul>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The thumbnails are buttons, named by their images’ alt text; the
            Dialog is named by its title.
          </li>
          <li>
            Focus starts on Next (<code scTypeset>cdkFocusInitial</code>), so
            <kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> move between the photos at
            once; <kbd scKbd>Escape</kbd> closes it, and focus goes back to the
            thumbnail.
          </li>
          <li>
            Each slide is named by its place (“3 of 6”) and read as it comes in;
            photos out of view are inert.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-article-lightbox-new-demo-container />
        <app-rtl-lightbox-new-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class LightboxNewPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDialogProvider, ScDialogPortal, ScDialog, ScDialogClose,',
      '  ScDialogHeader, ScDialogTitle,',
      "} from '@semantic-components/ui';",
      'import {',
      '  ScCarouselNew, ScCarouselNewViewport, ScCarouselNewTrack, ScCarouselNewItem,',
      '  ScCarouselNewPrevious, ScCarouselNewNext,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scDialogProvider [(open)]="open">',
      '  <button (click)="show(i)">…thumbnail…</button>',
      '  <ng-template scDialogPortal>',
      '    <div scDialog>',
      '      <button scDialogClose>…</button>',
      '      <div scDialogHeader><h2 scDialogTitle>…</h2></div>',
      '      <div scCarouselNew [(page)]="index" aria-roledescription="…" aria-label="…">',
      '        <div scCarouselNewViewport>',
      '          <div scCarouselNewTrack>',
      '            <div scCarouselNewItem …>…photo and caption…</div>',
      '          </div>',
      '        </div>',
      '        <button scCarouselNewPrevious class="start-2">…</button>',
      '        <button scCarouselNewNext class="end-2" cdkFocusInitial>…</button>',
      '      </div>',
      '      <p>{{ index() + 1 }} / {{ photos.length }}</p>',
      '      <div scCarouselNew #strip="scCarouselNew" [dragFree]="true"',
      '        [page]="strip.pageOf(index())" …>…thumbnails…</div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}
