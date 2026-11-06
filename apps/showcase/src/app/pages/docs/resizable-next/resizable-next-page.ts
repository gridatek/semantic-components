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
import { CollapsibleResizableNextDemoContainer } from './demos/collapsible-resizable-next-demo-container';
import { HandleResizableNextDemoContainer } from './demos/handle-resizable-next-demo-container';
import { RememberedResizableNextDemoContainer } from './demos/remembered-resizable-next-demo-container';
import { ResizableNextUsageDemoContainer } from './demos/resizable-next-usage-demo-container';
import { RtlResizableNextDemoContainer } from './demos/rtl-resizable-next-demo-container';
import { VerticalResizableNextDemoContainer } from './demos/vertical-resizable-next-demo-container';

@Component({
  selector: 'app-resizable-next-page',
  imports: [
    Anatomy,
    ResizableNextUsageDemoContainer,
    HandleResizableNextDemoContainer,
    VerticalResizableNextDemoContainer,
    CollapsibleResizableNextDemoContainer,
    RememberedResizableNextDemoContainer,
    RtlResizableNextDemoContainer,
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
        <h1 scHeading>Resizable Next</h1>
        <p class="text-muted-foreground">
          Panels resized by the handles between them, by pointer or keyboard. In
          the look of the app&apos;s preset.
        </p>
        <app-component-badges path="resizable-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-resizable-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the panels are the
          group&apos;s direct children, a handle between each two; the
          handle&apos;s name and grip are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A handle is a window splitter: a focusable separator whose value is
            the size of the panel before it (aria-valuenow, -min, -max), which
            it controls (aria-controls). Name it (aria-label).
          </li>
          <li>
            The arrow keys along its axis resize by 10% (mirrored right to
            left), Home and End to the limits, Enter shuts or opens a
            collapsible panel.
          </li>
          <li>The grip is only for the eye (aria-hidden).</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-handle-resizable-next-demo-container />
        <app-vertical-resizable-next-demo-container />
        <app-collapsible-resizable-next-demo-container />
        <app-remembered-resizable-next-demo-container />
        <app-rtl-resizable-next-demo-container />
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
          aria-label="Resizable Next parts"
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
export default class ResizableNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScResizablePanelGroupNext, ScResizablePanelNext,',
      '  ScResizableHandleNext, ScResizableHandleNextGrip,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scResizablePanelGroupNext orientation="…">',
      '  <div scResizablePanelNext [defaultSize]="…">…</div>',
      '  <div scResizableHandleNext aria-label="…">',
      '    <div scResizableHandleNextGrip></div>',
      '  </div>',
      '  <div scResizablePanelNext>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScResizablePanelGroupNext',
      selector: 'div[scResizablePanelGroupNext]',
      description:
        "orientation ('horizontal', 'vertical'); [(layout)]: the panels' sizes in %, in order.",
    },
    {
      name: 'ScResizablePanelNext',
      selector: 'div[scResizablePanelNext]',
      description:
        'defaultSize, minSize, maxSize (%); collapsible, collapsedSize; data-collapsed. A direct child of its group.',
    },
    {
      name: 'ScResizableHandleNext',
      selector: 'div[scResizableHandleNext]',
      description:
        'The splitter between two panels: drag, arrows, Home, End, Enter; role="separator" with aria-valuenow / -min / -max, aria-controls. Name it.',
    },
    {
      name: 'ScResizableHandleNextGrip',
      selector: 'div[scResizableHandleNextGrip]',
      description: "The handle's grip, in the preset's look; aria-hidden.",
    },
  ];
}
