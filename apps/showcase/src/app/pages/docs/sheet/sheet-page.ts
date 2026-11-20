import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { InlineSideSheetDemoContainer } from './demos/inline-side-sheet-demo-container';
import { NoCloseButtonSheetDemoContainer } from './demos/no-close-button-sheet-demo-container';
import { RtlSheetDemoContainer } from './demos/rtl-sheet-demo-container';
import { SheetUsageDemoContainer } from './demos/sheet-usage-demo-container';
import { SideSheetDemoContainer } from './demos/side-sheet-demo-container';

@Component({
  selector: 'app-sheet-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    SheetUsageDemoContainer,
    SideSheetDemoContainer,
    InlineSideSheetDemoContainer,
    NoCloseButtonSheetDemoContainer,
    RtlSheetDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Sheet</h1>
        <p class="text-muted-foreground">
          A dialog at the edge of the screen, sliding in from its side. In the
          look of the app&apos;s style.
        </p>
        <app-component-badges path="sheet" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-sheet-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the trigger, the title, the
          content and the close buttons are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A modal dialog (role=&quot;dialog&quot;, aria-modal), named by its
            title and described by its description.
          </li>
          <li>
            Focus moves into it and stays there; closing gives it back to the
            trigger. <kbd scKbd>Escape</kbd> or a press on the backdrop closes
            it.
          </li>
          <li>Name the ✕: it is an icon — sr-only text.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-side-sheet-demo-container />
        <app-inline-side-sheet-demo-container />
        <app-no-close-button-sheet-demo-container />
        <app-rtl-sheet-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Sheet parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SheetPage {
  private readonly anatomy = {
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

  private readonly parts = [
    {
      name: 'ScSheetProvider',
      selector: 'div[scSheetProvider], span[scSheetProvider]',
      description:
        "[(open)], side ('inline-end' by default — the reading end: the right, the left in RTL; 'inline-start', 'top', 'bottom', 'left', 'right').",
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
        "Closes it: the style's button (ghost, icon-sm); straight in the panel, in its corner. In the footer: variant and size of your choice.",
    },
  ];
}
