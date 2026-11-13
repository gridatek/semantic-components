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
import { AlertDialogUsageDemoContainer } from './demos/alert-dialog-usage-demo-container';
import { BasicAlertDialogDemoContainer } from './demos/basic-alert-dialog-demo-container';
import { DestructiveAlertDialogDemoContainer } from './demos/destructive-alert-dialog-demo-container';
import { MediaAlertDialogDemoContainer } from './demos/media-alert-dialog-demo-container';
import { RtlAlertDialogDemoContainer } from './demos/rtl-alert-dialog-demo-container';
import { SmallAlertDialogDemoContainer } from './demos/small-alert-dialog-demo-container';
import { SmallMediaAlertDialogDemoContainer } from './demos/small-media-alert-dialog-demo-container';

@Component({
  selector: 'app-alert-dialog-page',
  imports: [
    Anatomy,
    AlertDialogUsageDemoContainer,
    BasicAlertDialogDemoContainer,
    SmallAlertDialogDemoContainer,
    MediaAlertDialogDemoContainer,
    SmallMediaAlertDialogDemoContainer,
    DestructiveAlertDialogDemoContainer,
    RtlAlertDialogDemoContainer,
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
        <h1 scHeading>Alert Dialog</h1>
        <p class="text-muted-foreground">
          A modal dialog that asks for an answer before going on — to confirm,
          to cancel. In the look of the app&apos;s preset. For a dialog that can
          simply be dismissed, use a Dialog.
        </p>
        <app-component-badges path="alert-dialog" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-alert-dialog-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element. The dialog is in a
          template, rendered while it is open, over a backdrop; it is an
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">alertdialog</code
          >, named by its title and described by its description. Cancel and the
          action close it; do the work on the action&apos;s
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">(click)</code>,
          or follow
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">[(open)]</code>.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Open, focus goes into the dialog — to its first button, Cancel: put
            the least harmful answer first.
          </li>
          <li>Tab and Shift+Tab stay in the dialog.</li>
          <li>
            Escape closes it, as Cancel does. A click outside doesn&apos;t: it
            wants an answer.
          </li>
          <li>Closed, focus goes back to the trigger.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-alert-dialog-demo-container />
        <app-small-alert-dialog-demo-container />
        <app-media-alert-dialog-demo-container />
        <app-small-media-alert-dialog-demo-container />
        <app-destructive-alert-dialog-demo-container />
        <app-rtl-alert-dialog-demo-container />
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
          aria-label="Alert Dialog parts"
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
export default class AlertDialogPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAlertDialogProvider, ScAlertDialogTrigger, ScAlertDialogPortal,',
      '  ScAlertDialog, ScAlertDialogHeader, ScAlertDialogMedia,',
      '  ScAlertDialogTitle, ScAlertDialogDescription,',
      '  ScAlertDialogFooter, ScAlertDialogCancel, ScAlertDialogAction,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAlertDialogProvider [(open)]="open">',
      '  <button scButton scAlertDialogTrigger>…</button>',
      '  <ng-template scAlertDialogPortal>',
      '    <div scAlertDialog>',
      '      <div scAlertDialogHeader>',
      '        <div scAlertDialogMedia><svg></svg></div>',
      '        <h2 scAlertDialogTitle>…</h2>',
      '        <p scAlertDialogDescription>…</p>',
      '      </div>',
      '      <div scAlertDialogFooter>',
      '        <button scAlertDialogCancel>…</button>',
      '        <button scAlertDialogAction>…</button>',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAlertDialogProvider',
      selector: 'div[scAlertDialogProvider], span[scAlertDialogProvider]',
      description:
        'Holds the state: [(open)] (default false). Puts the dialog in an overlay, over a backdrop, while open.',
    },
    {
      name: 'ScAlertDialogTrigger',
      selector: 'button[scAlertDialogTrigger]',
      description:
        'Opens it; behaviour only, on any button (scButton for the look).',
    },
    {
      name: 'ScAlertDialogPortal',
      selector: 'ng-template[scAlertDialogPortal]',
      description: 'The template of the dialog, rendered while open.',
    },
    {
      name: 'ScAlertDialog',
      selector: 'div[scAlertDialog]',
      description:
        "The dialog: role alertdialog, modal, named by its title. Input size: 'default' or 'sm' (narrower, centered, two buttons side by side).",
    },
    {
      name: 'ScAlertDialogHeader',
      selector: 'div[scAlertDialogHeader]',
      description: 'The media, title and description.',
    },
    {
      name: 'ScAlertDialogMedia',
      selector: 'div[scAlertDialogMedia]',
      description: 'An icon, beside the title (above it in a small dialog).',
    },
    {
      name: 'ScAlertDialogTitle, ScAlertDialogDescription',
      selector: 'h2[scAlertDialogTitle], p[scAlertDialogDescription]',
      description: 'Name and describe the dialog.',
    },
    {
      name: 'ScAlertDialogFooter',
      selector: 'div[scAlertDialogFooter]',
      description: 'The buttons: stacked on a phone, in a row beyond.',
    },
    {
      name: 'ScAlertDialogCancel, ScAlertDialogAction',
      selector: 'button[scAlertDialogCancel], button[scAlertDialogAction]',
      description:
        "Close it. Buttons in the preset's look: inputs variant ('outline' and 'default') and size.",
    },
  ];
}
