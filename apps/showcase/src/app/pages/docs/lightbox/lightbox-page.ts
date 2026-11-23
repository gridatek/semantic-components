import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ArticleLightboxDemoContainer } from './demos/article-lightbox-demo-container';
import { LightboxUsageDemoContainer } from './demos/lightbox-usage-demo-container';
import { RtlLightboxDemoContainer } from './demos/rtl-lightbox-demo-container';

@Component({
  selector: 'app-lightbox-page',
  imports: [
    RouterLink,
    ScKbd,
    ScLink,
    ScTypeset,
    Anatomy,
    TocHeading,
    LightboxUsageDemoContainer,
    ArticleLightboxDemoContainer,
    RtlLightboxDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Lightbox</h1>
        <p class="text-muted-foreground">
          A recipe: photos opened large — a
          <a scLink routerLink="/docs/components/dialog">Dialog</a>
          holding a
          <a scLink routerLink="/docs/components/carousel">Carousel</a>
          of them all. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-lightbox-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          Two signals are yours: whether it is open (the Dialog's
          <code scTypeset>[(open)]</code>) and the photo shown (the Carousel's
          <code scTypeset>[(activeIndex)]</code>). A thumbnail sets both; the
          Carousel starts on that photo when the Dialog opens.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Each photo is a slide. Previous and Next sit on it (<code scTypeset
              >start-2</code
            >, <code scTypeset>end-2</code>, variant secondary), in a positioned
            box around the viewport.
          </li>
          <li>The caption and the counter (“3 / 6”) come from the index.</li>
          <li>
            The thumbnails below are a row of buttons inside the Carousel, so
            the arrow keys still change the photo from there; each sets the
            photo, the current one <code scTypeset>aria-current</code>, and an
            <code scTypeset>afterRenderEffect</code> keeps it in view.
          </li>
          <li>
            Swipes, drags and the keys come from the Carousel (with Embla's
            plugins if you want more); Escape, the backdrop and focus from the
            Dialog.
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
            Focus starts on the photo (the Carousel's viewport,
            <code scTypeset>cdkFocusInitial</code>), so <kbd scKbd>←</kbd> and
            <kbd scKbd>→</kbd> move between the photos at once — from the
            thumbnails too; <kbd scKbd>Escape</kbd> closes it, and focus goes
            back to the thumbnail.
          </li>
          <li>Each slide is named by its place (“3 of 6”).</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-article-lightbox-demo-container />
        <app-rtl-lightbox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class LightboxPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScDialogProvider, ScDialogPortal, ScDialog, ScDialogClose,',
      '  ScDialogHeader, ScDialogTitle,',
      "} from '@semantic-components/ui';",
      'import {',
      '  ScCarousel, ScCarouselViewport, ScCarouselTrack, ScCarouselItem,',
      '  ScCarouselPrevious, ScCarouselNext,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scDialogProvider [(open)]="open">',
      '  <button (click)="show(i)">…thumbnail…</button>',
      '  <ng-template scDialogPortal>',
      '    <div scDialog>',
      '      <button scDialogClose>…</button>',
      '      <div scDialogHeader><h2 scDialogTitle>…</h2></div>',
      '      <div scCarousel [(activeIndex)]="index" aria-roledescription="…" aria-label="…">',
      '        <div class="relative">',
      '          <div scCarouselViewport cdkFocusInitial>',
      '            <div scCarouselTrack>',
      '              <div scCarouselItem …>…photo…</div>',
      '            </div>',
      '          </div>',
      '          <button scCarouselPrevious class="start-2">…</button>',
      '          <button scCarouselNext class="end-2">…</button>',
      '        </div>',
      '        <p>…caption… {{ index() + 1 }} / {{ photos.length }}</p>',
      '        <div role="group" aria-label="…">…thumbnail buttons…</div>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}
