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
import { BorderMarkerDemoContainer } from './demos/border-marker-demo-container';
import { IconMarkerDemoContainer } from './demos/icon-marker-demo-container';
import { LinksButtonsMarkerDemoContainer } from './demos/links-buttons-marker-demo-container';
import { MarkerUsageDemoContainer } from './demos/marker-usage-demo-container';
import { RtlMarkerDemoContainer } from './demos/rtl-marker-demo-container';
import { SeparatorMarkerDemoContainer } from './demos/separator-marker-demo-container';
import { ShimmerMarkerDemoContainer } from './demos/shimmer-marker-demo-container';
import { StatusMarkerDemoContainer } from './demos/status-marker-demo-container';
import { VariantsMarkerDemoContainer } from './demos/variants-marker-demo-container';

@Component({
  selector: 'app-marker-page',
  imports: [
    Anatomy,
    MarkerUsageDemoContainer,
    VariantsMarkerDemoContainer,
    StatusMarkerDemoContainer,
    ShimmerMarkerDemoContainer,
    SeparatorMarkerDemoContainer,
    BorderMarkerDemoContainer,
    IconMarkerDemoContainer,
    LinksButtonsMarkerDemoContainer,
    RtlMarkerDemoContainer,
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
        <h1 scHeading>Marker</h1>
        <p class="text-muted-foreground">
          A note between messages: a status, a labeled divider, an action. In
          the look of the app&apos;s preset.
        </p>
        <app-component-badges path="marker" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-marker-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element — a div, a link or a button;
          the icon and the words are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A marker is text by default. Streaming or in progress
            (&quot;Thinking…&quot;, a running tool): role=&quot;status&quot;, so
            it is announced as it appears.
          </li>
          <li>
            A labeled divider needs no role: its lines are decorative. Not
            role=&quot;separator&quot; — a separator is named by aria-label, its
            text unread.
          </li>
          <li>
            The icon is hidden: the content says it. A link or a button marker
            is named by its content.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-variants-marker-demo-container />
        <app-status-marker-demo-container />
        <app-shimmer-marker-demo-container />
        <app-separator-marker-demo-container />
        <app-border-marker-demo-container />
        <app-icon-marker-demo-container />
        <app-links-buttons-marker-demo-container />
        <app-rtl-marker-demo-container />
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
          aria-label="Marker parts"
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
export default class MarkerPage {
  protected readonly anatomy = {
    imports: [
      'import { ScMarker, ScMarkerIcon, ScMarkerContent } from',
      "  '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMarker variant="…">',
      '  <span scMarkerIcon>…</span>',
      '  <span scMarkerContent>…</span>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMarker',
      selector: 'div[scMarker], a[scMarker], button[scMarker]',
      description:
        "variant ('default', 'separator', 'border'). On a link or a button (type=\"button\") it does what it says.",
    },
    {
      name: 'ScMarkerIcon',
      selector: 'span[scMarkerIcon]',
      description: 'Your icon, hidden from screen readers.',
    },
    {
      name: 'ScMarkerContent',
      selector: 'span[scMarkerContent]',
      description: 'The words; centered between the lines of a separator.',
    },
  ];
}
