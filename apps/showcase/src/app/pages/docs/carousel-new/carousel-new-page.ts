import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlignCarouselNewDemoContainer } from './demos/align-carousel-new-demo-container';
import { AutoplayCarouselNewDemoContainer } from './demos/autoplay-carousel-new-demo-container';
import { CarouselNewUsageDemoContainer } from './demos/carousel-new-usage-demo-container';
import { ControlledCarouselNewDemoContainer } from './demos/controlled-carousel-new-demo-container';
import { DragFreeCarouselNewDemoContainer } from './demos/drag-free-carousel-new-demo-container';
import { IndicatorsCarouselNewDemoContainer } from './demos/indicators-carousel-new-demo-container';
import { LoopCarouselNewDemoContainer } from './demos/loop-carousel-new-demo-container';
import { OrientationCarouselNewDemoContainer } from './demos/orientation-carousel-new-demo-container';
import { PagesCarouselNewDemoContainer } from './demos/pages-carousel-new-demo-container';
import { ProgressCarouselNewDemoContainer } from './demos/progress-carousel-new-demo-container';
import { RtlCarouselNewDemoContainer } from './demos/rtl-carousel-new-demo-container';
import { SizesCarouselNewDemoContainer } from './demos/sizes-carousel-new-demo-container';
import { SpacingCarouselNewDemoContainer } from './demos/spacing-carousel-new-demo-container';
import { ThumbnailsCarouselNewDemoContainer } from './demos/thumbnails-carousel-new-demo-container';

@Component({
  selector: 'app-carousel-new-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    EntryInstall,
    CarouselNewUsageDemoContainer,
    SizesCarouselNewDemoContainer,
    SpacingCarouselNewDemoContainer,
    OrientationCarouselNewDemoContainer,
    LoopCarouselNewDemoContainer,
    AlignCarouselNewDemoContainer,
    PagesCarouselNewDemoContainer,
    IndicatorsCarouselNewDemoContainer,
    ThumbnailsCarouselNewDemoContainer,
    DragFreeCarouselNewDemoContainer,
    AutoplayCarouselNewDemoContainer,
    ProgressCarouselNewDemoContainer,
    ControlledCarouselNewDemoContainer,
    RtlCarouselNewDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Carousel New</h1>
        <p class="text-muted-foreground">
          A slideshow with motion and swipe, built on Embla: pages, indicators,
          autoplay with a play toggle. Being built to replace the Carousel.
        </p>
        <app-component-badges path="carousel-new" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Installation</h2>
        <app-entry-install
          entry="carousel"
          library="embla-carousel"
          href="https://www.embla-carousel.com"
          names="ScCarouselNew, ScCarouselNewViewport, ScCarouselNewTrack, ScCarouselNewItem"
        />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-carousel-new-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A region holding a viewport, its track of slides, Previous and Next;
          indicators and a play toggle if you like. You write the slides, the
          icons and every name.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Pages</h2>
        <p>
          It moves a page at a time: a slide each by default, or
          <code scTypeset>slidesPerPage</code> of them (a number, or
          <code scTypeset>'auto'</code>: as many as show). The last slides that
          can't start a page join the last one. A slide's width is yours, in its
          class (<code scTypeset>basis-1/3</code>…).
          <code scTypeset>[(page)]</code> counts from 0;
          <code scTypeset>pageCount()</code> is known once it has measured, in
          the browser.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Autoplay</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <code scTypeset>[(playing)]</code> moves on every
            <code scTypeset>interval</code> (5000 ms), round to the first page.
            Give a play toggle (WCAG 2.2.2).
          </li>
          <li>
            It pauses while hovered, with a finger down, in a hidden tab or
            scrolled out of view (<code scTypeset>data-paused</code>).
          </li>
          <li>
            It stops when the user moves it (a button, a key, an indicator, a
            swipe) or brings keyboard focus in, until asked again.
          </li>
          <li>It doesn't start by itself under reduced motion.</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The root is a region: name it (aria-label) and give it your word for
            carousel (aria-roledescription).
          </li>
          <li>
            Each slide is a group: your word for slide (aria-roledescription)
            and its place (aria-label, from index() and count(): "2 of 5").
            Slides less than half in view are inert: Tab and screen readers
            reach only what shows.
          </li>
          <li>
            The track is a polite live region while it isn't rotating: a page
            the user brings in is read.
          </li>
          <li>
            Previous and Next stay focusable at either end (aria-disabled, not
            disabled), so focus doesn't drop to the page.
          </li>
          <li>
            The indicators are a tablist, one tab stop; each tab controls its
            page's slides.
          </li>
        </ul>
        <h3 scTypeset appToc>Keyboard</h3>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            With focus inside: <kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> the
            previous and next page (mirrored right to left),
            <kbd scKbd>↑</kbd> and <kbd scKbd>↓</kbd> when vertical;
            <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> the first and last.
            Text fields in slides keep their keys. Focus in a slide that leaves
            moves to the incoming one.
          </li>
          <li>
            In the indicators: <kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> move
            between them and show each one's page; <kbd scKbd>Home</kbd> and
            <kbd scKbd>End</kbd> the first and last.
          </li>
          <li>
            <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd> press Previous,
            Next, an indicator or the play toggle.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-sizes-carousel-new-demo-container />
        <app-spacing-carousel-new-demo-container />
        <app-orientation-carousel-new-demo-container />
        <app-loop-carousel-new-demo-container />
        <app-align-carousel-new-demo-container />
        <app-pages-carousel-new-demo-container />
        <app-indicators-carousel-new-demo-container />
        <app-thumbnails-carousel-new-demo-container />
        <app-drag-free-carousel-new-demo-container />
        <app-autoplay-carousel-new-demo-container />
        <app-progress-carousel-new-demo-container />
        <app-controlled-carousel-new-demo-container />
        <app-rtl-carousel-new-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Carousel New parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CarouselNewPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScCarouselNew, ScCarouselNewViewport, ScCarouselNewTrack, ScCarouselNewItem,',
      '  ScCarouselNewPrevious, ScCarouselNewNext, ScCarouselNewIndicators,',
      '  ScCarouselNewIndicator, ScCarouselNewPlayToggle,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scCarouselNew #carousel="scCarouselNew"',
      '  aria-roledescription="…" aria-label="…">',
      '  <div scCarouselNewViewport>',
      '    <div scCarouselNewTrack>',
      '      <div scCarouselNewItem #slide="scCarouselNewItem"',
      '        aria-roledescription="…" [attr.aria-label]="…">…</div>',
      '    </div>',
      '  </div>',
      '  <button scCarouselNewPrevious>…</button>',
      '  <button scCarouselNewNext>…</button>',
      '  <button scCarouselNewPlayToggle>…</button>',
      '  <div scCarouselNewIndicators aria-label="…">',
      '    @for (page of carousel.pages(); track page) {',
      '      <button scCarouselNewIndicator [page]="page">…</button>',
      '    }',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScCarouselNew',
      selector: 'div[scCarouselNew]',
      description:
        "The region. orientation ('horizontal', 'vertical'), align ('start', 'center', 'end'), slidesPerPage (1, a number or 'auto'), loop, dragFree, skipSnaps, drag (true), plugins (Embla's); [(page)] from 0; [(playing)] and interval (5000). exportAs scCarouselNew: pageCount(), pages(), pageOf(slide), canPrevious(), canNext(), previous(), next(), paused(), api() (Embla's). --sc-carousel-progress (0 to 1), --sc-carousel-interval; data-playing, data-paused.",
    },
    {
      name: 'ScCarouselNewViewport',
      selector: 'div[scCarouselNewViewport]',
      description: "Embla's viewport: the window the slides move in.",
    },
    {
      name: 'ScCarouselNewTrack',
      selector: 'div[scCarouselNewTrack]',
      description:
        'The row of slides (a column, vertical); its negative margin matches the slides’ gap. A polite live region while not rotating.',
    },
    {
      name: 'ScCarouselNewItem',
      selector: 'div[scCarouselNewItem]',
      description:
        'A slide, a group: a full basis by default (basis-1/2… for more in view), its gap as start padding; inert less than half in view. exportAs scCarouselNewItem: index(), count(), active() (in the current page), inView(). data-active, data-in-view.',
    },
    {
      name: 'ScCarouselNewPrevious, ScCarouselNewNext',
      selector: 'button[…]',
      description:
        "The style's button (variant 'outline', size 'icon-sm', the style's corners) outside either end; aria-disabled when it can't move, still focusable; your icon, mirrored right to left.",
    },
    {
      name: 'ScCarouselNewIndicators',
      selector: 'div[scCarouselNewIndicators]',
      description:
        'A tablist (name it), inside the carousel: one tab stop; the arrows, Home and End move between its indicators and show their pages.',
    },
    {
      name: 'ScCarouselNewIndicator',
      selector: 'button[scCarouselNewIndicator]',
      description:
        'A page’s tab (page): a click shows it; the current one is selected and wider. A 24px target that draws its mark, in the style’s corners; controls its page’s slides. Write its name.',
    },
    {
      name: 'ScCarouselNewPlayToggle',
      selector: 'button[scCarouselNewPlayToggle]',
      description:
        "Starts and stops the rotation: the style's button (variant 'outline', size 'icon-sm'), where you put it. Its icon and name are yours, following playing() (Pause, Play). data-playing.",
    },
  ];
}
