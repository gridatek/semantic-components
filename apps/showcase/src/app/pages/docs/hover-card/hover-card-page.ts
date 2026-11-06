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
import { HoverCardUsageDemoContainer } from './demos/hover-card-usage-demo-container';
import { InTextHoverCardDemoContainer } from './demos/in-text-hover-card-demo-container';
import { LogicalSidesHoverCardDemoContainer } from './demos/logical-sides-hover-card-demo-container';
import { RtlHoverCardDemoContainer } from './demos/rtl-hover-card-demo-container';
import { SidesHoverCardDemoContainer } from './demos/sides-hover-card-demo-container';

@Component({
  selector: 'app-hover-card-page',
  imports: [
    Anatomy,
    HoverCardUsageDemoContainer,
    InTextHoverCardDemoContainer,
    SidesHoverCardDemoContainer,
    LogicalSidesHoverCardDemoContainer,
    RtlHoverCardDemoContainer,
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
        <h1 scHeading>Hover Card</h1>
        <p class="text-muted-foreground">
          A preview of a link&apos;s destination, shown on hover or keyboard
          focus. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="hover-card" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-hover-card-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the link and the
          card&apos;s content are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A visual preview, for sighted mouse and keyboard users: the link is
            the only thing to reach. The card has no role, isn&apos;t linked to
            its trigger, and takes no focus — so a screen reader isn&apos;t led
            through it at every link.
          </li>
          <li>
            Keep it supplementary: what it shows must be at the link&apos;s
            destination too.
          </li>
          <li>
            Hover opens it after the trigger&apos;s delay; keyboard focus at
            once. Leaving, blur, Escape or a press outside close it. A touch
            only follows the link.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-in-text-hover-card-demo-container />
        <app-sides-hover-card-demo-container />
        <app-logical-sides-hover-card-demo-container />
        <app-rtl-hover-card-demo-container />
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
          aria-label="Hover Card parts"
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
export default class HoverCardPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScHoverCardProvider, ScHoverCardTrigger,',
      '  ScHoverCardPortal, ScHoverCard,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scHoverCardProvider side="…">',
      '  <a href="…" scHoverCardTrigger>…</a>',
      '  <ng-template scHoverCardPortal>',
      '    <div scHoverCard>…</div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScHoverCardProvider',
      selector: 'div[scHoverCardProvider]',
      description:
        "[(open)], side ('bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'), align, offset, origin.",
    },
    {
      name: 'ScHoverCardTrigger',
      selector: 'a[scHoverCardTrigger], button[scHoverCardTrigger]',
      description:
        'Your link (or button): delay (600) and closeDelay (300); data-popup-open while open.',
    },
    {
      name: 'ScHoverCardPortal, ScHoverCard',
      selector: 'ng-template[…], div[scHoverCard]',
      description:
        "The content, rendered while open; the card in the preset's look, data-side as placed, animating in and out.",
    },
  ];
}
