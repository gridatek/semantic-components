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
import { BothScrollAreaNext2DemoContainer } from './demos/both-scroll-area-next2-demo-container';
import { HorizontalScrollAreaNext2DemoContainer } from './demos/horizontal-scroll-area-next2-demo-container';
import { RtlScrollAreaNext2DemoContainer } from './demos/rtl-scroll-area-next2-demo-container';
import { ScrollAreaNext2UsageDemoContainer } from './demos/scroll-area-next2-usage-demo-container';
import { ScrollFadeScrollAreaNext2DemoContainer } from './demos/scroll-fade-scroll-area-next2-demo-container';

@Component({
  selector: 'app-scroll-area-next2-page',
  imports: [
    Anatomy,
    ScrollAreaNext2UsageDemoContainer,
    HorizontalScrollAreaNext2DemoContainer,
    BothScrollAreaNext2DemoContainer,
    ScrollFadeScrollAreaNext2DemoContainer,
    RtlScrollAreaNext2DemoContainer,
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
        <h1 scHeading>Scroll Area Next2</h1>
        <p class="text-muted-foreground">
          A box that scrolls with the browser&apos;s own scrollbar, in the look
          of the app&apos;s preset.
        </p>
        <app-component-badges path="scroll-area-next2" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-scroll-area-next2-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive on your box: it scrolls, the browser draws its
          scrollbar. Tailwind&apos;s scrollbar-* classes change its look
          (scrollbar-thumb-*, scrollbar-track-*, scrollbar-gutter-stable).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The browser scrolls it — the wheel, touch, the keyboard — with its
            own scrollbar, in the preset&apos;s look.
          </li>
          <li>
            While it overflows, it is in the tab order (with a focus ring): the
            arrow keys, Page Up, Page Down, Home and End scroll it. A box that
            doesn&apos;t scroll isn&apos;t a stop.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-horizontal-scroll-area-next2-demo-container />
        <app-both-scroll-area-next2-demo-container />
        <app-scroll-fade-scroll-area-next2-demo-container />
        <app-rtl-scroll-area-next2-demo-container />
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
          aria-label="Scroll Area Next2 parts"
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
export default class ScrollAreaNext2Page {
  protected readonly anatomy = {
    imports: "import { ScScrollAreaNext2 } from '@semantic-components/ui';",
    markup: '<div scScrollAreaNext2 class="…">…</div>',
  };

  protected readonly parts = [
    {
      name: 'ScScrollAreaNext2',
      selector: 'div[scScrollAreaNext2]',
      description:
        "Scrolls, with the browser's scrollbar in the preset's look; a CdkScrollable (overlays follow its scroll); a tab stop while it overflows; data-has-overflow-x / -y, data-overflow-{x,y}-{start,end}, --scroll-area-overflow-{x,y}-{start,end}.",
    },
  ];
}
