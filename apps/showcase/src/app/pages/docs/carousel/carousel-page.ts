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
import { PackageManagerInstall } from '../../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ApiCarouselDemoContainer } from './demos/api-carousel-demo-container';
import { CarouselUsageDemoContainer } from './demos/carousel-usage-demo-container';
import { ImagesCarouselDemoContainer } from './demos/images-carousel-demo-container';
import { MultipleCarouselDemoContainer } from './demos/multiple-carousel-demo-container';
import { OrientationCarouselDemoContainer } from './demos/orientation-carousel-demo-container';
import { PluginCarouselDemoContainer } from './demos/plugin-carousel-demo-container';
import { RtlCarouselDemoContainer } from './demos/rtl-carousel-demo-container';
import { SizesCarouselDemoContainer } from './demos/sizes-carousel-demo-container';
import { SpacingCarouselDemoContainer } from './demos/spacing-carousel-demo-container';

@Component({
  selector: 'app-carousel-page',
  imports: [
    Anatomy,
    EntryInstall,
    PackageManagerInstall,
    CarouselUsageDemoContainer,
    SizesCarouselDemoContainer,
    SpacingCarouselDemoContainer,
    OrientationCarouselDemoContainer,
    ApiCarouselDemoContainer,
    PluginCarouselDemoContainer,
    MultipleCarouselDemoContainer,
    ImagesCarouselDemoContainer,
    RtlCarouselDemoContainer,
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
        <h1 scHeading>Carousel</h1>
        <p class="text-muted-foreground">
          A slideshow with motion and swipe, built on Embla.
        </p>
        <app-component-badges path="carousel" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Installation</h2>
        <app-entry-install
          entry="carousel"
          library="embla-carousel"
          href="https://www.embla-carousel.com"
          names="ScCarousel, ScCarouselViewport, ScCarouselTrack, ScCarouselItem"
        />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-carousel-usage-demo-container />
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
        <app-sizes-carousel-demo-container />
        <app-spacing-carousel-demo-container />
        <app-orientation-carousel-demo-container />
        <app-api-carousel-demo-container />
        <div class="space-y-4">
          <p class="text-muted-foreground">
            The Plugin example uses Embla&apos;s autoplay plugin, a package of
            its own: install it where you use it.
          </p>
          <app-package-manager-install packages="embla-carousel-autoplay" />
          <app-plugin-carousel-demo-container />
        </div>
        <app-multiple-carousel-demo-container />
        <app-images-carousel-demo-container />
        <app-rtl-carousel-demo-container />
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
export default class CarouselPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScCarousel, ScCarouselViewport, ScCarouselTrack,',
      '  ScCarouselItem, ScCarouselPrevious, ScCarouselNext,',
      "} from '@semantic-components/ui/carousel';",
    ].join('\n'),
    markup: [
      '<div scCarousel aria-roledescription="…" aria-label="…">',
      '  <div scCarouselViewport>',
      '    <div scCarouselTrack>',
      '      <div scCarouselItem #slide="scCarouselItem"',
      '        aria-roledescription="…" [attr.aria-label]="…">…</div>',
      '    </div>',
      '  </div>',
      '  <button scCarouselPrevious>',
      '    <svg siChevronLeftIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '  <button scCarouselNext>',
      '    <svg siChevronRightIcon></svg><span class="sr-only">…</span>',
      '  </button>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScCarousel',
      selector: 'div[scCarousel]',
      description:
        "The region. orientation ('horizontal', 'vertical'); options and plugins (Embla's: a change starts it again with them; its direction from the page unless given); [(activeIndex)]. exportAs scCarousel: api() (Embla's), count() (positions), canScrollPrev(), canScrollNext(), scrollPrev(), scrollNext().",
    },
    {
      name: 'ScCarouselViewport',
      selector: 'div[scCarouselViewport]',
      description: "Embla's viewport: the window the slides move in.",
    },
    {
      name: 'ScCarouselTrack',
      selector: 'div[scCarouselTrack]',
      description:
        'The row of slides (a column, vertical); its negative margin matches the slides’ gap.',
    },
    {
      name: 'ScCarouselItem',
      selector: 'div[scCarouselItem]',
      description:
        'A slide, a group: a full basis by default (basis-1/2… for more in view), its gap as start padding. exportAs scCarouselItem: index() and count(), for its name.',
    },
    {
      name: 'ScCarouselPrevious, ScCarouselNext',
      selector: 'button[…]',
      description:
        "The preset's button (variant 'outline', size 'icon-sm', the preset's corners) outside either end; disabled when it can't move; your icon, mirrored right to left.",
    },
  ];
}
