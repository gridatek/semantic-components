import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { EntryInstall } from '../../../components/entry-install/entry-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ApiCarouselNextDemoContainer } from './demos/api-carousel-next-demo-container';
import { CarouselNextUsageDemoContainer } from './demos/carousel-next-usage-demo-container';
import { ImagesCarouselNextDemoContainer } from './demos/images-carousel-next-demo-container';
import { MultipleCarouselNextDemoContainer } from './demos/multiple-carousel-next-demo-container';
import { OrientationCarouselNextDemoContainer } from './demos/orientation-carousel-next-demo-container';
import { PluginCarouselNextDemoContainer } from './demos/plugin-carousel-next-demo-container';
import { RtlCarouselNextDemoContainer } from './demos/rtl-carousel-next-demo-container';
import { SizesCarouselNextDemoContainer } from './demos/sizes-carousel-next-demo-container';
import { SpacingCarouselNextDemoContainer } from './demos/spacing-carousel-next-demo-container';

@Component({
  selector: 'app-carousel-next-page',
  imports: [
    Anatomy,
    EntryInstall,
    CarouselNextUsageDemoContainer,
    SizesCarouselNextDemoContainer,
    SpacingCarouselNextDemoContainer,
    OrientationCarouselNextDemoContainer,
    ApiCarouselNextDemoContainer,
    PluginCarouselNextDemoContainer,
    MultipleCarouselNextDemoContainer,
    ImagesCarouselNextDemoContainer,
    RtlCarouselNextDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Carousel Next</h1>
        <p class="text-muted-foreground">
          A slideshow with motion and swipe, built on Embla.
        </p>
        <app-component-badges path="carousel-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="carousel"
          library="embla-carousel"
          href="https://www.embla-carousel.com"
          names="ScCarouselNext, ScCarouselNextViewport, ScCarouselNextTrack, ScCarouselNextItem"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-carousel-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A region holding a viewport, its track of slides, and the previous and
          next buttons. You write the slides, the icons and every name.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The root is a region: name it (aria-label) and give it your word for
            carousel (aria-roledescription).
          </li>
          <li>
            Each slide is a group: your word for slide (aria-roledescription)
            and its place (aria-label, from index() and count(): "2 of 5").
          </li>
          <li>
            With focus inside, the arrow keys move: ← and → (mirrored right to
            left), ↑ and ↓ when vertical.
          </li>
          <li>
            The buttons are disabled at either end (unless it loops); name them
            (a span with sr-only) and write their icons — mirrored right to left
            by the buttons.
          </li>
          <li>
            Moving by itself (autoplay)? Give a pause button, and stop on hover
            and focus (WCAG 2.2.2): the Plugin example.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sizes-carousel-next-demo-container />
        <app-spacing-carousel-next-demo-container />
        <app-orientation-carousel-next-demo-container />
        <app-api-carousel-next-demo-container />
        <app-plugin-carousel-next-demo-container />
        <app-multiple-carousel-next-demo-container />
        <app-images-carousel-next-demo-container />
        <app-rtl-carousel-next-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Carousel parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class CarouselNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCarouselNext, ScCarouselNextViewport, ScCarouselNextTrack,',
      '  ScCarouselNextItem, ScCarouselNextPrevious, ScCarouselNextNext,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scCarouselNext aria-roledescription="…" aria-label="…">',
      '  <div scCarouselNextViewport>',
      '    <div scCarouselNextTrack>',
      '      <div scCarouselNextItem #slide="scCarouselNextItem"',
      '        aria-roledescription="…" [attr.aria-label]="…">…</div>',
      '    </div>',
      '  </div>',
      '  <button scCarouselNextPrevious>',
      '    <svg siChevronLeftIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '  <button scCarouselNextNext>',
      '    <svg siChevronRightIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCarouselNext',
      selector: 'div[scCarouselNext]',
      description:
        "The region. orientation ('horizontal', 'vertical'); options and plugins (Embla's: a change starts it again with them; its direction from the page unless given); [(activeIndex)]. exportAs scCarouselNext: api() (Embla's), count() (positions), canScrollPrev(), canScrollNext(), scrollPrev(), scrollNext().",
    },
    {
      name: 'ScCarouselNextViewport',
      selector: 'div[scCarouselNextViewport]',
      description: "Embla's viewport: the window the slides move in.",
    },
    {
      name: 'ScCarouselNextTrack',
      selector: 'div[scCarouselNextTrack]',
      description:
        'The row of slides (a column, vertical); its negative margin matches the slides’ gap.',
    },
    {
      name: 'ScCarouselNextItem',
      selector: 'div[scCarouselNextItem]',
      description:
        'A slide, a group: a full basis by default (basis-1/2… for more in view), its gap as start padding. exportAs scCarouselNextItem: index() and count(), for its name.',
    },
    {
      name: 'ScCarouselNextPrevious, ScCarouselNextNext',
      selector: 'button[…]',
      description:
        "The preset's button (variant 'outline', size 'icon-sm', the preset's corners) outside either end; disabled when it can't move; your icon, mirrored right to left.",
    },
  ];
}
