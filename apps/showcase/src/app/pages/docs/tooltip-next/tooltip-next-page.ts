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
import { ControlledTooltipNextDemoContainer } from './demos/controlled-tooltip-next-demo-container';
import { DisabledTooltipNextDemoContainer } from './demos/disabled-tooltip-next-demo-container';
import { GroupTooltipNextDemoContainer } from './demos/group-tooltip-next-demo-container';
import { KeyboardTooltipNextDemoContainer } from './demos/keyboard-tooltip-next-demo-container';
import { RtlTooltipNextDemoContainer } from './demos/rtl-tooltip-next-demo-container';
import { SidesTooltipNextDemoContainer } from './demos/sides-tooltip-next-demo-container';
import { TooltipNextUsageDemoContainer } from './demos/tooltip-next-usage-demo-container';

@Component({
  selector: 'app-tooltip-next-page',
  imports: [
    Anatomy,
    TooltipNextUsageDemoContainer,
    SidesTooltipNextDemoContainer,
    KeyboardTooltipNextDemoContainer,
    DisabledTooltipNextDemoContainer,
    ControlledTooltipNextDemoContainer,
    GroupTooltipNextDemoContainer,
    RtlTooltipNextDemoContainer,
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
        <h1 scHeading>Tooltip Next</h1>
        <p class="text-muted-foreground">
          A short label shown when the pointer rests on a control or the
          keyboard reaches it. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="tooltip-next" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-tooltip-next-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the trigger, the content
          (text, a kbd…) and the arrow are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A tooltip is a visual aid: name the trigger itself (its text, or
            sr-only text). It is read as the trigger&apos;s description
            (role=&quot;tooltip&quot;, aria-describedby) while open.
          </li>
          <li>
            Keyboard focus opens it at once; Escape, blur or a click closes it.
            The pointer can move onto it without closing it.
          </li>
          <li>
            It doesn&apos;t open on touch: what matters goes in the page, or in
            a Popover.
          </li>
          <li>
            A disabled control to explain: aria-disabled, not disabled — it
            keeps its focus and hover.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sides-tooltip-next-demo-container />
        <app-keyboard-tooltip-next-demo-container />
        <app-disabled-tooltip-next-demo-container />
        <app-controlled-tooltip-next-demo-container />
        <app-group-tooltip-next-demo-container />
        <app-rtl-tooltip-next-demo-container />
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
          aria-label="Tooltip Next parts"
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
export default class TooltipNextPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTooltipNextProvider, ScTooltipNextTrigger, ScTooltipNextPortal,',
      '  ScTooltipNext, ScTooltipNextArrow, ScTooltipNextGroup,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTooltipNextProvider side="…">',
      '  <button scButton scTooltipNextTrigger>…</button>',
      '  <ng-template scTooltipNextPortal>',
      '    <div scTooltipNext>',
      '      …',
      '      <span scTooltipNextArrow></span>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTooltipNextProvider',
      selector: 'div[scTooltipNextProvider]',
      description:
        "[(open)], side ('top', 'bottom', 'left', 'right', 'inline-start', 'inline-end'), align ('start', 'center', 'end'), offset (4), delay (600), closeDelay (0), disabled.",
    },
    {
      name: 'ScTooltipNextTrigger',
      selector: '[scTooltipNextTrigger]',
      description:
        'Your control: hover opens it after the delay, keyboard focus at once; described by the tooltip while open.',
    },
    {
      name: 'ScTooltipNextPortal, ScTooltipNext',
      selector: 'ng-template[…], div[scTooltipNext]',
      description:
        'The content, rendered while open; the tooltip (role="tooltip"), hoverable, animated.',
    },
    {
      name: 'ScTooltipNextArrow',
      selector: 'span[scTooltipNextArrow]',
      description: 'Your arrow, on the side towards the trigger.',
    },
    {
      name: 'ScTooltipNextGroup',
      selector: '[scTooltipNextGroup]',
      description:
        'Tooltips side by side: once one has shown, the next opens at once (timeout, 400).',
    },
  ];
}
