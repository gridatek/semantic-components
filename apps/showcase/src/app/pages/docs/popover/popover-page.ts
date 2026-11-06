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
import { AlignmentsPopoverDemoContainer } from './demos/alignments-popover-demo-container';
import { BasicPopoverDemoContainer } from './demos/basic-popover-demo-container';
import { ControlledPopoverDemoContainer } from './demos/controlled-popover-demo-container';
import { HoverPopoverDemoContainer } from './demos/hover-popover-demo-container';
import { ModalPopoverDemoContainer } from './demos/modal-popover-demo-container';
import { PopoverUsageDemoContainer } from './demos/popover-usage-demo-container';
import { RtlPopoverDemoContainer } from './demos/rtl-popover-demo-container';
import { SidesPopoverDemoContainer } from './demos/sides-popover-demo-container';

@Component({
  selector: 'app-popover-page',
  imports: [
    Anatomy,
    PopoverUsageDemoContainer,
    BasicPopoverDemoContainer,
    AlignmentsPopoverDemoContainer,
    SidesPopoverDemoContainer,
    HoverPopoverDemoContainer,
    ModalPopoverDemoContainer,
    ControlledPopoverDemoContainer,
    RtlPopoverDemoContainer,
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
        <h1 scHeading>Popover</h1>
        <p class="text-muted-foreground">
          Rich content in a panel beside its trigger: a dialog, modal or not,
          opened by a click or a hover. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="popover" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-popover-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the trigger, the title, the
          content and the close button are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A dialog (role=&quot;dialog&quot;), named by its title and described
            by its description; its trigger says it opens one (aria-haspopup,
            aria-expanded).
          </li>
          <li>
            Opening moves focus into it (its first field, or the one marked
            cdkFocusInitial); closing gives it back to the trigger. Escape or a
            press outside closes it.
          </li>
          <li>
            Not modal (default): Tab out of it closes it and goes on from the
            trigger. trap-focus keeps Tab inside; modal also stops the page
            behind.
          </li>
          <li>
            Open on hover is for extra help (an infotip): a click opens it too,
            so touch and keyboard users reach it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-popover-demo-container />
        <app-alignments-popover-demo-container />
        <app-sides-popover-demo-container />
        <app-hover-popover-demo-container />
        <app-modal-popover-demo-container />
        <app-controlled-popover-demo-container />
        <app-rtl-popover-demo-container />
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
          aria-label="Popover parts"
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
export default class PopoverPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScPopoverProvider, ScPopoverTrigger, ScPopoverPortal,',
      '  ScPopover, ScPopoverHeader, ScPopoverTitle,',
      '  ScPopoverDescription, ScPopoverClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPopoverProvider side="…" align="…">',
      '  <button scButton scPopoverTrigger>…</button>',
      '  <ng-template scPopoverPortal>',
      '    <div scPopover>',
      '      <div scPopoverHeader>',
      '        <h2 scPopoverTitle>…</h2>',
      '        <p scPopoverDescription>…</p>',
      '      </div>',
      '      …',
      '      <button scPopoverClose>…</button>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScPopoverProvider',
      selector: 'div[scPopoverProvider]',
      description:
        "[(open)], modal (false, 'trap-focus', true), side ('bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'), align ('start', 'center', 'end'), offset (4), origin (another anchor).",
    },
    {
      name: 'ScPopoverTrigger',
      selector: 'button[scPopoverTrigger]',
      description:
        'Your button: toggles it (aria-haspopup, aria-expanded); openOnHover, delay (300), closeDelay (0).',
    },
    {
      name: 'ScPopoverPortal, ScPopover',
      selector: 'ng-template[…], div[scPopover]',
      description:
        'The content, rendered while open; the popover (role="dialog"), named and described, animated.',
    },
    {
      name: 'ScPopoverHeader, ScPopoverTitle, ScPopoverDescription',
      selector: 'div[…], [scPopoverTitle], p[…]',
      description:
        'Its title (it names it; the level is yours) and description.',
    },
    {
      name: 'ScPopoverClose',
      selector: 'button[scPopoverClose]',
      description:
        "Closes it: the preset's button, variant and size (ghost, icon-xs). Name it.",
    },
  ];
}
