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
import { TocHeading } from '../../../components/toc/toc-heading';
import { BothScrollAreaNextDemoContainer } from './demos/both-scroll-area-next-demo-container';
import { HorizontalScrollAreaNextDemoContainer } from './demos/horizontal-scroll-area-next-demo-container';
import { RtlScrollAreaNextDemoContainer } from './demos/rtl-scroll-area-next-demo-container';
import { ScrollAreaNextUsageDemoContainer } from './demos/scroll-area-next-usage-demo-container';
import { ScrollFadeScrollAreaNextDemoContainer } from './demos/scroll-fade-scroll-area-next-demo-container';

@Component({
  selector: 'app-scroll-area-next-page',
  imports: [
    Anatomy,
    ScrollAreaNextUsageDemoContainer,
    HorizontalScrollAreaNextDemoContainer,
    BothScrollAreaNextDemoContainer,
    ScrollFadeScrollAreaNextDemoContainer,
    RtlScrollAreaNextDemoContainer,
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
        <h1 scHeading>Scroll Area Next</h1>
        <p class="text-muted-foreground">
          A native scroll container with custom scrollbars. In the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="scroll-area-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-scroll-area-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element: you write the viewport, the
          content and each scrollbar you want.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The browser scrolls it — the wheel, touch, the keyboard; its own
            scrollbar is hidden, the scroll area draws them.
          </li>
          <li>
            While it overflows, its viewport is in the tab order (with a focus
            ring): the arrow keys, Page Up, Page Down, Home and End scroll it. A
            box that doesn&apos;t scroll isn&apos;t a stop.
          </li>
          <li>
            The scrollbars are for the pointer only: drag a thumb, or press the
            track to jump there.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-horizontal-scroll-area-next-demo-container />
        <app-both-scroll-area-next-demo-container />
        <app-scroll-fade-scroll-area-next-demo-container />
        <app-rtl-scroll-area-next-demo-container />
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
          aria-label="Scroll Area Next parts"
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
export default class ScrollAreaNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScScrollAreaNext, ScScrollAreaNextViewport, ScScrollAreaNextViewportContent,',
      '  ScScrollAreaNextScrollbar, ScScrollAreaNextThumb, ScScrollAreaNextCorner,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scScrollAreaNext>',
      '  <div scScrollAreaNextViewport>',
      '    <div scScrollAreaNextViewportContent>…</div>',
      '  </div>',
      '  <div scScrollAreaNextScrollbar orientation="…">',
      '    <div scScrollAreaNextThumb></div>',
      '  </div>',
      '  <div scScrollAreaNextCorner></div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScScrollAreaNext',
      selector: 'div[scScrollAreaNext]',
      description:
        'The root: data-has-overflow-x / -y, data-overflow-{x,y}-{start,end}, data-scrolling.',
    },
    {
      name: 'ScScrollAreaNextViewport',
      selector: 'div[scScrollAreaNextViewport]',
      description:
        'What scrolls: its own scrollbar hidden, in the tab order while it overflows; --scroll-area-overflow-{x,y}-{start,end}.',
    },
    {
      name: 'ScScrollAreaNextViewportContent',
      selector: 'div[scScrollAreaNextViewportContent]',
      description: 'The content: at least as wide as what it holds.',
    },
    {
      name: 'ScScrollAreaNextScrollbar, ScScrollAreaNextThumb',
      selector: 'div[…], div[scScrollAreaNextThumb]',
      description:
        "orientation ('vertical', 'horizontal'); hidden while that axis doesn't overflow; data-hovering, data-scrolling. The thumb in the preset's look, dragged to scroll.",
    },
    {
      name: 'ScScrollAreaNextCorner',
      selector: 'div[scScrollAreaNextCorner]',
      description: 'Where two scrollbars meet: shown while both overflow.',
    },
  ];
}
