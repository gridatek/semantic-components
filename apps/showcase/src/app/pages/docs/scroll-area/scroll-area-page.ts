import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BothScrollAreaDemoContainer } from './demos/both-scroll-area-demo-container';
import { CustomScrollAreaDemoContainer } from './demos/custom-scroll-area-demo-container';
import { HorizontalScrollAreaDemoContainer } from './demos/horizontal-scroll-area-demo-container';
import { RtlScrollAreaDemoContainer } from './demos/rtl-scroll-area-demo-container';
import { ScrollAreaUsageDemoContainer } from './demos/scroll-area-usage-demo-container';
import { ScrollFadeScrollAreaDemoContainer } from './demos/scroll-fade-scroll-area-demo-container';

@Component({
  selector: 'app-scroll-area-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    ScrollAreaUsageDemoContainer,
    HorizontalScrollAreaDemoContainer,
    BothScrollAreaDemoContainer,
    CustomScrollAreaDemoContainer,
    ScrollFadeScrollAreaDemoContainer,
    RtlScrollAreaDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Scroll Area</h1>
        <p class="text-muted-foreground">
          A native scroll container with custom scrollbars. In the look of the
          app&apos;s style.
        </p>
        <app-component-badges path="scroll-area" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-scroll-area-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element: you write the viewport and
          its content. A vertical scrollbar comes by default; write your own
          scrollbars (and the corner) and they take its place — sideways, both
          ways, or in your look.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The browser scrolls it — the wheel, touch, the keyboard; its own
            scrollbar is hidden, the scroll area draws them.
          </li>
          <li>
            While it overflows, its viewport is in the tab order (with a focus
            ring): the arrow keys, <kbd scKbd>Page Up</kbd>,
            <kbd scKbd>Page Down</kbd>, <kbd scKbd>Home</kbd> and
            <kbd scKbd>End</kbd> scroll it. A box that doesn&apos;t scroll
            isn&apos;t a stop.
          </li>
          <li>
            The scrollbars are for the pointer only: drag a thumb, or press the
            track to jump there.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-horizontal-scroll-area-demo-container />
        <app-both-scroll-area-demo-container />
        <app-custom-scroll-area-demo-container />
        <app-scroll-fade-scroll-area-demo-container />
        <app-rtl-scroll-area-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Scroll Area parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ScrollAreaPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScScrollArea, ScScrollAreaViewport, ScScrollAreaViewportContent,',
      '  ScScrollAreaScrollbar, ScScrollAreaThumb, ScScrollAreaCorner,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scScrollArea>',
      '  <div scScrollAreaViewport>',
      '    <div scScrollAreaViewportContent>…</div>',
      '  </div>',
      '  <!-- Optional: the default is a vertical scrollbar. -->',
      '  <div scScrollAreaScrollbar orientation="…">',
      '    <div scScrollAreaThumb></div>',
      '  </div>',
      '  <div scScrollAreaCorner></div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScScrollArea',
      selector: 'div[scScrollArea]',
      description:
        'The root: a vertical scrollbar by default, replaced by yours (a scrollbar or a corner written inside it); data-has-overflow-x / -y, data-overflow-{x,y}-{start,end}, data-scrolling.',
    },
    {
      name: 'ScScrollAreaViewport',
      selector: 'div[scScrollAreaViewport]',
      description:
        'What scrolls: its own scrollbar hidden, in the tab order while it overflows; --sc-scroll-area-overflow-{x,y}-{start,end}.',
    },
    {
      name: 'ScScrollAreaViewportContent',
      selector: 'div[scScrollAreaViewportContent]',
      description: 'The content: at least as wide as what it holds.',
    },
    {
      name: 'ScScrollAreaScrollbar, ScScrollAreaThumb',
      selector: 'div[…], div[scScrollAreaThumb]',
      description:
        "orientation ('vertical', 'horizontal'); hidden while that axis doesn't overflow; data-hovering, data-scrolling. The thumb in the style's look, dragged to scroll.",
    },
    {
      name: 'ScScrollAreaCorner',
      selector: 'div[scScrollAreaCorner]',
      description: 'Where two scrollbars meet: shown while both overflow.',
    },
  ];
}
