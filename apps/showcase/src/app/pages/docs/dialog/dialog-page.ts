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
import { CloseButtonDialogDemoContainer } from './demos/close-button-dialog-demo-container';
import { DialogUsageDemoContainer } from './demos/dialog-usage-demo-container';
import { NoCloseButtonDialogDemoContainer } from './demos/no-close-button-dialog-demo-container';
import { RtlDialogDemoContainer } from './demos/rtl-dialog-demo-container';
import { ScrollableContentDialogDemoContainer } from './demos/scrollable-content-dialog-demo-container';
import { StickyFooterDialogDemoContainer } from './demos/sticky-footer-dialog-demo-container';

@Component({
  selector: 'app-dialog-page',
  imports: [
    Anatomy,
    DialogUsageDemoContainer,
    CloseButtonDialogDemoContainer,
    NoCloseButtonDialogDemoContainer,
    StickyFooterDialogDemoContainer,
    ScrollableContentDialogDemoContainer,
    RtlDialogDemoContainer,
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
        <h1 scHeading>Dialog</h1>
        <p class="text-muted-foreground">
          A window over the page, which waits until it is closed: the page
          behind it can&apos;t be reached. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="dialog" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-dialog-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the text, the buttons and
          their names are yours. The dialog is in a template, rendered while it
          is open.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Closing</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            scDialogClose closes it, on any button — the ✕ straight in the
            dialog (in its corner), Cancel or Done in the footer. It is the
            preset&apos;s button: ghost and icon-sized for the ✕,
            variant=&quot;outline&quot; size=&quot;default&quot; for Cancel — no
            scButton.
          </li>
          <li>
            When your code runs first — Save checks and sends the form — the
            button is yours, and closes the dialog through [(open)] when it is
            done (or keeps it open, to show what is wrong).
          </li>
          <li>
            Escape and a click outside close it too. Focus stays in it while it
            is open, and goes back to what opened it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-close-button-dialog-demo-container />
        <app-no-close-button-dialog-demo-container />
        <app-sticky-footer-dialog-demo-container />
        <app-scrollable-content-dialog-demo-container />
        <app-rtl-dialog-demo-container />
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
          aria-label="Dialog parts"
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
export default class DialogPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScDialogProvider, ScDialogTrigger, ScDialogPortal, ScDialog,',
      '  ScDialogClose, ScDialogHeader, ScDialogTitle, ScDialogDescription,',
      '  ScDialogFooter,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scDialogProvider [(open)]="open">',
      '  <button scButton scDialogTrigger>…</button>',
      '  <ng-template scDialogPortal>',
      '    <div scDialog>',
      '      <button scDialogClose>…</button>',
      '      <div scDialogHeader>',
      '        <h2 scDialogTitle>…</h2>',
      '        <p scDialogDescription>…</p>',
      '      </div>',
      '      …',
      '      <div scDialogFooter>',
      '        <button scDialogClose variant="outline" size="default">Cancel</button>',
      '        <button scButton (click)="save()">…</button>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScDialogProvider',
      selector: 'div[scDialogProvider], span[scDialogProvider]',
      description:
        '[(open)]. Renders the dialog over the page, centred, over the backdrop; Escape and a click outside close it.',
    },
    {
      name: 'ScDialogTrigger',
      selector: 'button[scDialogTrigger]',
      description: 'Opens it; behaviour only, on any button.',
    },
    {
      name: 'ScDialogPortal, ScDialog',
      selector: 'ng-template[scDialogPortal], div[scDialog]',
      description:
        'The dialog (role dialog, modal), rendered while open; named by its title, described by its description. It takes the direction and language of where it is opened.',
    },
    {
      name: 'ScDialogClose',
      selector: 'button[scDialogClose]',
      description:
        'Closes it: the preset’s button, variant and size (ghost, icon-sm: the ✕). Straight in the dialog: in its corner.',
    },
    {
      name: 'ScDialogHeader, ScDialogFooter',
      selector: 'div[scDialogHeader], div[scDialogFooter]',
      description: 'The title and description; the buttons.',
    },
    {
      name: 'ScDialogTitle, ScDialogDescription',
      selector: 'h2[scDialogTitle], p[scDialogDescription]',
      description: 'Its name and its description.',
    },
  ];
}
