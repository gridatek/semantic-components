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
import { InlineSideSheetDemoContainer } from './demos/inline-side-sheet-demo-container';
import { NoCloseButtonSheetDemoContainer } from './demos/no-close-button-sheet-demo-container';
import { RtlSheetDemoContainer } from './demos/rtl-sheet-demo-container';
import { SheetUsageDemoContainer } from './demos/sheet-usage-demo-container';
import { SideSheetDemoContainer } from './demos/side-sheet-demo-container';

@Component({
  selector: 'app-sheet-page',
  imports: [
    Anatomy,
    SheetUsageDemoContainer,
    SideSheetDemoContainer,
    InlineSideSheetDemoContainer,
    NoCloseButtonSheetDemoContainer,
    RtlSheetDemoContainer,
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
        <h1 scHeading>Sheet</h1>
        <p class="text-muted-foreground">
          A dialog at the edge of the screen, sliding in from its side. In the
          look of the app&apos;s preset.
        </p>
        <app-component-badges path="sheet" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-sheet-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the trigger, the title, the
          content and the close buttons are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A modal dialog (role=&quot;dialog&quot;, aria-modal), named by its
            title and described by its description.
          </li>
          <li>
            Focus moves into it and stays there; closing gives it back to the
            trigger. Escape or a press on the backdrop closes it.
          </li>
          <li>Name the ✕: it is an icon — sr-only text.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-side-sheet-demo-container />
        <app-inline-side-sheet-demo-container />
        <app-no-close-button-sheet-demo-container />
        <app-rtl-sheet-demo-container />
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
          aria-label="Sheet parts"
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
export default class SheetPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScSheetProvider, ScSheetTrigger, ScSheetPortal, ScSheet,',
      '  ScSheetHeader, ScSheetTitle, ScSheetDescription,',
      '  ScSheetFooter, ScSheetClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scSheetProvider side="…">',
      '  <button scButton scSheetTrigger>…</button>',
      '  <ng-template scSheetPortal>',
      '    <div scSheet>',
      '      <div scSheetHeader>',
      '        <h2 scSheetTitle>…</h2>',
      '        <p scSheetDescription>…</p>',
      '      </div>',
      '      …',
      '      <div scSheetFooter>…</div>',
      '      <button scSheetClose>…</button>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScSheetProvider',
      selector: 'div[scSheetProvider]',
      description:
        "[(open)], side ('right', 'left', 'top', 'bottom', 'inline-start', 'inline-end').",
    },
    {
      name: 'ScSheetTrigger',
      selector: 'button[scSheetTrigger]',
      description: 'Opens it, on any button (aria-haspopup, aria-expanded).',
    },
    {
      name: 'ScSheetPortal, ScSheet',
      selector: 'ng-template[…], div[scSheet]',
      description:
        'The content, rendered while open; the panel (role="dialog", aria-modal), named and described, sliding from its side.',
    },
    {
      name: 'ScSheetHeader, ScSheetTitle, ScSheetDescription, ScSheetFooter',
      selector: 'div[…], h2[…], p[…], div[…]',
      description:
        'Its title and description at the top; its actions at the bottom.',
    },
    {
      name: 'ScSheetClose',
      selector: 'button[scSheetClose]',
      description:
        "Closes it: the preset's button (ghost, icon-sm); straight in the panel, in its corner. In the footer: variant and size of your choice.",
    },
  ];
}
