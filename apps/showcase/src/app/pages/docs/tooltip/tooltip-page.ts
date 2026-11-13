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
import { ControlledTooltipDemoContainer } from './demos/controlled-tooltip-demo-container';
import { DisabledTooltipDemoContainer } from './demos/disabled-tooltip-demo-container';
import { GroupTooltipDemoContainer } from './demos/group-tooltip-demo-container';
import { KeyboardTooltipDemoContainer } from './demos/keyboard-tooltip-demo-container';
import { RtlTooltipDemoContainer } from './demos/rtl-tooltip-demo-container';
import { SidesTooltipDemoContainer } from './demos/sides-tooltip-demo-container';
import { TooltipUsageDemoContainer } from './demos/tooltip-usage-demo-container';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    Anatomy,
    TooltipUsageDemoContainer,
    SidesTooltipDemoContainer,
    KeyboardTooltipDemoContainer,
    DisabledTooltipDemoContainer,
    ControlledTooltipDemoContainer,
    GroupTooltipDemoContainer,
    RtlTooltipDemoContainer,
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
        <h1 scHeading>Tooltip</h1>
        <p class="text-muted-foreground">
          A short label shown when the pointer rests on a control or the
          keyboard reaches it. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="tooltip" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-tooltip-usage-demo-container />
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
            A disabled button to explain: disabled with softDisabled — it keeps
            its focus and hover.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-sides-tooltip-demo-container />
        <app-keyboard-tooltip-demo-container />
        <app-disabled-tooltip-demo-container />
        <app-controlled-tooltip-demo-container />
        <app-group-tooltip-demo-container />
        <app-rtl-tooltip-demo-container />
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
          aria-label="Tooltip parts"
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
export default class TooltipPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScTooltipProvider, ScTooltipTrigger, ScTooltipPortal,',
      '  ScTooltip, ScTooltipArrow, ScTooltipGroup,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scTooltipProvider side="…">',
      '  <button scButton scTooltipTrigger>…</button>',
      '  <ng-template scTooltipPortal>',
      '    <div scTooltip>',
      '      …',
      '      <span scTooltipArrow></span>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScTooltipProvider',
      selector: 'div[scTooltipProvider], span[scTooltipProvider]',
      description:
        "[(open)], side ('top', 'bottom', 'left', 'right', 'inline-start', 'inline-end'), align ('start', 'center', 'end'), offset (4), delay (600), closeDelay (0), disabled.",
    },
    {
      name: 'ScTooltipTrigger',
      selector: '[scTooltipTrigger]',
      description:
        'Your control: hover opens it after the delay, keyboard focus at once; described by the tooltip while open.',
    },
    {
      name: 'ScTooltipPortal, ScTooltip',
      selector: 'ng-template[…], div[scTooltip]',
      description:
        'The content, rendered while open; the tooltip (role="tooltip"), hoverable, animated.',
    },
    {
      name: 'ScTooltipArrow',
      selector: 'span[scTooltipArrow]',
      description: 'Your arrow, on the side towards the trigger.',
    },
    {
      name: 'ScTooltipGroup',
      selector: '[scTooltipGroup]',
      description:
        'Tooltips side by side: once one has shown, the next opens at once (timeout, 400).',
    },
  ];
}
